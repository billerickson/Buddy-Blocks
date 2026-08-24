#include "buddy_storage.h"

#include <algorithm>
#include <cerrno>
#include <cstdio>
#include <cstring>
#include <dirent.h>
#include <fcntl.h>
#include <sys/stat.h>
#ifdef ESP_PLATFORM
#include "esp_littlefs.h"
#else
#include <sys/statvfs.h>
#endif
#include <unistd.h>

namespace buddy::storage {

namespace {

struct RecordHeader {
    uint32_t magic;
    uint16_t schema_version;
    uint16_t reserved;
    uint32_t payload_length;
    uint32_t payload_checksum;
    uint32_t header_checksum;
};

uint32_t crc32(const void *data, size_t length)
{
    const auto *bytes = static_cast<const uint8_t *>(data);
    uint32_t value = 0xffffffffU;
    for (size_t index = 0; index < length; ++index) {
        value ^= bytes[index];
        for (int bit = 0; bit < 8; ++bit) {
            value = (value >> 1) ^ (0xedb88320U &
                                     static_cast<uint32_t>(-static_cast<int32_t>(value & 1U)));
        }
    }
    return ~value;
}

bool ensure_directory(const std::string &path)
{
    if (mkdir(path.c_str(), 0755) == 0 || errno == EEXIST) {
        struct stat info {};
        return stat(path.c_str(), &info) == 0 && S_ISDIR(info.st_mode);
    }
    return false;
}

void sync_parent_best_effort(const std::string &path)
{
    const size_t separator = path.find_last_of('/');
    if (separator == std::string::npos) {
        return;
    }
    const std::string parent = separator == 0 ? "/" : path.substr(0, separator);
    const int descriptor = open(parent.c_str(), O_RDONLY);
    if (descriptor >= 0) {
        (void)fsync(descriptor);
        close(descriptor);
    }
}

Result inspect_directory(const std::string &path, size_t &count, size_t &bytes,
                         std::vector<std::string> *names)
{
    DIR *directory = opendir(path.c_str());
    if (directory == nullptr) {
        return errno == ENOENT ? Result::kNotFound : Result::kIoError;
    }
    count = 0;
    bytes = 0;
    while (dirent *entry = readdir(directory)) {
        const std::string name = entry->d_name;
        if (name == "." || name == ".." || name.size() < 6 ||
            name.substr(name.size() - 5) != ".json") {
            continue;
        }
        struct stat info {};
        const std::string item_path = path + "/" + name;
        if (stat(item_path.c_str(), &info) != 0 || !S_ISREG(info.st_mode)) {
            continue;
        }
        ++count;
        bytes += static_cast<size_t>(info.st_size);
        if (names != nullptr) {
            names->push_back(name.substr(0, name.size() - 5));
        }
    }
    closedir(directory);
    if (names != nullptr) {
        std::sort(names->begin(), names->end());
    }
    return Result::kOk;
}

} // namespace

Store::Store(std::string root_path) : root_path_(std::move(root_path))
{
    while (root_path_.size() > 1 && root_path_.back() == '/') {
        root_path_.pop_back();
    }
}

Result Store::initialize()
{
    const std::lock_guard<std::recursive_mutex> guard(mutex_);
    if (root_path_.empty() || !ensure_directory(root_path_)) {
        return Result::kIoError;
    }
    for (const char *directory : {"content", "outbox", "outbox/quarantine", "sessions",
                                  "diagnostics"}) {
        if (ensure_parent_directories(std::string(directory) + "/placeholder") != Result::kOk ||
            !ensure_directory(absolute(directory))) {
            return Result::kIoError;
        }
    }
    return Result::kOk;
}

bool Store::valid_relative_path(const std::string &relative_path) const
{
    return !relative_path.empty() && relative_path.front() != '/' &&
           relative_path.find("..") == std::string::npos &&
           relative_path.find('\\') == std::string::npos;
}

bool Store::valid_stable_id(const std::string &stable_event_id) const
{
    if (stable_event_id.empty() || stable_event_id.size() > 96) {
        return false;
    }
    return std::all_of(stable_event_id.begin(), stable_event_id.end(), [](unsigned char value) {
        return (value >= 'a' && value <= 'z') || (value >= 'A' && value <= 'Z') ||
               (value >= '0' && value <= '9') || value == '-' || value == '_';
    });
}

std::string Store::absolute(const std::string &relative_path) const
{
    return root_path_ + "/" + relative_path;
}

Result Store::ensure_parent_directories(const std::string &relative_path) const
{
    if (!valid_relative_path(relative_path)) {
        return Result::kInvalidPath;
    }
    size_t separator = 0;
    while ((separator = relative_path.find('/', separator)) != std::string::npos) {
        if (!ensure_directory(absolute(relative_path.substr(0, separator)))) {
            return Result::kIoError;
        }
        ++separator;
    }
    return Result::kOk;
}

Result Store::write_atomic(const std::string &relative_path, uint16_t schema_version,
                           const std::vector<uint8_t> &payload)
{
    const std::lock_guard<std::recursive_mutex> guard(mutex_);
    if (!valid_relative_path(relative_path)) {
        return Result::kInvalidPath;
    }
    if (payload.size() > kMaxContentBytes || payload.size() > UINT32_MAX) {
        return Result::kTooLarge;
    }
    Capacity current{};
    if (capacity(current) == Result::kOk && current.free_bytes < payload.size() + kMinimumFreeBytes) {
        return Result::kNoSpace;
    }
    const Result parent_result = ensure_parent_directories(relative_path);
    if (parent_result != Result::kOk) {
        return parent_result;
    }

    RecordHeader header{kRecordMagic, schema_version, 0, static_cast<uint32_t>(payload.size()),
                        crc32(payload.data(), payload.size()), 0};
    header.header_checksum = crc32(&header, sizeof(header));
    const std::string final_path = absolute(relative_path);
    const std::string next_path = final_path + ".next";
    FILE *file = std::fopen(next_path.c_str(), "wb");
    if (file == nullptr) {
        return Result::kIoError;
    }
    const bool header_written = std::fwrite(&header, 1, sizeof(header), file) == sizeof(header);
    const bool payload_written =
        payload.empty() || std::fwrite(payload.data(), 1, payload.size(), file) == payload.size();
    const bool flushed = std::fflush(file) == 0;
    const bool synced = flushed && fsync(fileno(file)) == 0;
    const bool closed = std::fclose(file) == 0;
    if (!header_written || !payload_written || !flushed || !synced || !closed) {
        (void)std::remove(next_path.c_str());
        return Result::kIoError;
    }

    Record verification{};
    const std::string next_relative = relative_path + ".next";
    if (read(next_relative, schema_version, verification) != Result::kOk ||
        verification.schema_version != schema_version || verification.payload != payload) {
        (void)std::remove(next_path.c_str());
        return Result::kCorrupt;
    }
    if (std::rename(next_path.c_str(), final_path.c_str()) != 0) {
        return Result::kIoError;
    }
    sync_parent_best_effort(final_path);
    return Result::kOk;
}

Result Store::read(const std::string &relative_path, uint16_t maximum_schema, Record &record) const
{
    const std::lock_guard<std::recursive_mutex> guard(mutex_);
    if (!valid_relative_path(relative_path)) {
        return Result::kInvalidPath;
    }
    FILE *file = std::fopen(absolute(relative_path).c_str(), "rb");
    if (file == nullptr) {
        return errno == ENOENT ? Result::kNotFound : Result::kIoError;
    }
    RecordHeader header{};
    const bool header_read = std::fread(&header, 1, sizeof(header), file) == sizeof(header);
    const uint32_t expected_header_checksum = header.header_checksum;
    header.header_checksum = 0;
    if (!header_read || header.magic != kRecordMagic || header.payload_length > kMaxContentBytes ||
        crc32(&header, sizeof(header)) != expected_header_checksum) {
        std::fclose(file);
        return Result::kCorrupt;
    }
    if (header.schema_version > maximum_schema) {
        std::fclose(file);
        return Result::kSchemaUnsupported;
    }
    std::vector<uint8_t> payload(header.payload_length);
    const bool payload_read = payload.empty() ||
                              std::fread(payload.data(), 1, payload.size(), file) == payload.size();
    const int trailing = std::fgetc(file);
    std::fclose(file);
    if (!payload_read || trailing != EOF || crc32(payload.data(), payload.size()) != header.payload_checksum) {
        return Result::kCorrupt;
    }
    record.schema_version = header.schema_version;
    record.payload = std::move(payload);
    return Result::kOk;
}

Result Store::remove(const std::string &relative_path)
{
    const std::lock_guard<std::recursive_mutex> guard(mutex_);
    if (!valid_relative_path(relative_path)) {
        return Result::kInvalidPath;
    }
    if (std::remove(absolute(relative_path).c_str()) == 0) {
        return Result::kOk;
    }
    return errno == ENOENT ? Result::kNotFound : Result::kIoError;
}

Result Store::recover(const std::string &relative_path, uint16_t maximum_schema)
{
    const std::lock_guard<std::recursive_mutex> guard(mutex_);
    Record final_record{};
    const Result final_result = read(relative_path, maximum_schema, final_record);
    Record next_record{};
    const Result next_result = read(relative_path + ".next", maximum_schema, next_record);
    if (final_result == Result::kOk) {
        if (next_result == Result::kOk || next_result == Result::kCorrupt) {
            (void)remove(relative_path + ".next");
        }
        return Result::kOk;
    }
    if (next_result == Result::kOk) {
        const std::string next_path = absolute(relative_path + ".next");
        const std::string final_path = absolute(relative_path);
        if (std::rename(next_path.c_str(), final_path.c_str()) != 0) {
            return Result::kIoError;
        }
        sync_parent_best_effort(final_path);
        return Result::kOk;
    }
    if (next_result == Result::kCorrupt) {
        (void)remove(relative_path + ".next");
    }
    return final_result;
}

Result Store::enqueue(const std::string &stable_event_id, const std::vector<uint8_t> &payload)
{
    const std::lock_guard<std::recursive_mutex> guard(mutex_);
    if (!valid_stable_id(stable_event_id)) {
        return Result::kInvalidPath;
    }
    Capacity current{};
    const Result capacity_result = capacity(current);
    if (capacity_result != Result::kOk) {
        return capacity_result;
    }
    if (current.outbox_events >= kMaxOutboxEvents ||
        current.outbox_bytes + payload.size() + sizeof(RecordHeader) > kMaxOutboxBytes) {
        return Result::kOutboxFull;
    }
    const std::string path = "outbox/" + stable_event_id + ".json";
    Record existing{};
    const Result existing_result = read(path, 1, existing);
    if (existing_result == Result::kOk) {
        return existing.payload == payload ? Result::kOk : Result::kCorrupt;
    }
    return write_atomic(path, 1, payload);
}

Result Store::list_outbox(std::vector<std::string> &stable_event_ids) const
{
    const std::lock_guard<std::recursive_mutex> guard(mutex_);
    stable_event_ids.clear();
    size_t count = 0;
    size_t bytes = 0;
    const Result result = inspect_directory(absolute("outbox"), count, bytes, &stable_event_ids);
    return result == Result::kNotFound ? Result::kOk : result;
}

Result Store::acknowledge(const std::string &stable_event_id)
{
    const std::lock_guard<std::recursive_mutex> guard(mutex_);
    return valid_stable_id(stable_event_id)
               ? remove("outbox/" + stable_event_id + ".json")
               : Result::kInvalidPath;
}

Result Store::quarantine(const std::string &stable_event_id)
{
    const std::lock_guard<std::recursive_mutex> guard(mutex_);
    if (!valid_stable_id(stable_event_id)) {
        return Result::kInvalidPath;
    }
    const std::string source = absolute("outbox/" + stable_event_id + ".json");
    const std::string destination = absolute("outbox/quarantine/" + stable_event_id + ".json");
    return std::rename(source.c_str(), destination.c_str()) == 0 ? Result::kOk : Result::kIoError;
}

Result Store::capacity(Capacity &capacity) const
{
    const std::lock_guard<std::recursive_mutex> guard(mutex_);
#ifdef ESP_PLATFORM
    size_t total_bytes = 0;
    size_t used_bytes = 0;
    if (esp_littlefs_info("littlefs", &total_bytes, &used_bytes) != ESP_OK ||
        used_bytes > total_bytes) {
        return Result::kIoError;
    }
    capacity.total_bytes = total_bytes;
    capacity.free_bytes = total_bytes - used_bytes;
#else
    struct statvfs filesystem {};
    if (statvfs(root_path_.c_str(), &filesystem) != 0) {
        return Result::kIoError;
    }
    capacity.total_bytes = static_cast<size_t>(filesystem.f_blocks) * filesystem.f_frsize;
    capacity.free_bytes = static_cast<size_t>(filesystem.f_bavail) * filesystem.f_frsize;
#endif
    const Result outbox_result =
        inspect_directory(absolute("outbox"), capacity.outbox_events, capacity.outbox_bytes, nullptr);
    return outbox_result == Result::kNotFound ? Result::kOk : outbox_result;
}

const std::string &Store::root_path() const { return root_path_; }

const char *result_name(Result result)
{
    switch (result) {
    case Result::kOk: return "ok";
    case Result::kNotFound: return "not_found";
    case Result::kInvalidPath: return "invalid_path";
    case Result::kTooLarge: return "too_large";
    case Result::kNoSpace: return "no_space";
    case Result::kIoError: return "io_error";
    case Result::kCorrupt: return "corrupt";
    case Result::kSchemaUnsupported: return "schema_unsupported";
    case Result::kOutboxFull: return "outbox_full";
    }
    return "unknown";
}

} // namespace buddy::storage
