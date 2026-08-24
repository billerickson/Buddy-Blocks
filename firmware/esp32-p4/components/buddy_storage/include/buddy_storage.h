#pragma once

#include <cstddef>
#include <cstdint>
#include <mutex>
#include <string>
#include <vector>

namespace buddy::storage {

constexpr uint32_t kRecordMagic = 0x42524231; // BRB1
constexpr size_t kMaxContentBytes = 1024 * 1024;
constexpr size_t kMaxOutboxEvents = 1000;
constexpr size_t kMaxOutboxBytes = 8 * 1024 * 1024;
constexpr size_t kMinimumFreeBytes = 1024 * 1024;
constexpr size_t kWarningFreeBytes = 2 * 1024 * 1024;

enum class Result {
    kOk,
    kNotFound,
    kInvalidPath,
    kTooLarge,
    kNoSpace,
    kIoError,
    kCorrupt,
    kSchemaUnsupported,
    kOutboxFull,
};

struct Record {
    uint16_t schema_version = 0;
    std::vector<uint8_t> payload;
};

struct Capacity {
    size_t total_bytes = 0;
    size_t free_bytes = 0;
    size_t outbox_events = 0;
    size_t outbox_bytes = 0;
};

class Store {
  public:
    explicit Store(std::string root_path);

    Result initialize();
    Result write_atomic(const std::string &relative_path, uint16_t schema_version,
                        const std::vector<uint8_t> &payload);
    Result read(const std::string &relative_path, uint16_t maximum_schema, Record &record) const;
    Result remove(const std::string &relative_path);
    Result recover(const std::string &relative_path, uint16_t maximum_schema);

    Result enqueue(const std::string &stable_event_id, const std::vector<uint8_t> &payload);
    Result list_outbox(std::vector<std::string> &stable_event_ids) const;
    Result acknowledge(const std::string &stable_event_id);
    Result quarantine(const std::string &stable_event_id);
    Result capacity(Capacity &capacity) const;

    const std::string &root_path() const;

  private:
    bool valid_relative_path(const std::string &relative_path) const;
    bool valid_stable_id(const std::string &stable_event_id) const;
    std::string absolute(const std::string &relative_path) const;
    Result ensure_parent_directories(const std::string &relative_path) const;

    std::string root_path_;
    mutable std::recursive_mutex mutex_;
};

const char *result_name(Result result);

} // namespace buddy::storage
