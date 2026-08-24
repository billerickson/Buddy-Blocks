#include "buddy_storage.h"

#include <cstdio>
#include <cstdlib>
#include <filesystem>
#include <fstream>
#include <iostream>
#include <string>
#include <unistd.h>
#include <vector>

namespace {

void require(bool condition, const std::string &message)
{
    if (!condition) {
        std::cerr << "FAIL: " << message << '\n';
        std::exit(1);
    }
}

std::vector<uint8_t> bytes(const std::string &value)
{
    return {value.begin(), value.end()};
}

} // namespace

int main()
{
    using namespace buddy::storage;
    char path[] = "/tmp/buddy-storage-test.XXXXXX";
    require(mkdtemp(path) != nullptr, "temporary storage root created");
    Store store(path);
    require(store.initialize() == Result::kOk, "directory layout initialized");

    const auto first = bytes("{\"revision\":1}");
    require(store.write_atomic("content/flash-cards.json", 1, first) == Result::kOk,
            "atomic content write");
    Record record{};
    require(store.read("content/flash-cards.json", 1, record) == Result::kOk &&
                record.schema_version == 1 && record.payload == first,
            "record header and payload verify");

    {
        std::ofstream corrupt(std::string(path) + "/content/flash-cards.json",
                              std::ios::binary | std::ios::trunc);
        corrupt << "corrupt";
    }
    require(store.read("content/flash-cards.json", 1, record) == Result::kCorrupt,
            "corrupt record rejected");

    const auto recoverable = bytes("{\"revision\":2}");
    require(store.write_atomic("content/recovery-source.json", 1, recoverable) == Result::kOk,
            "recovery source written");
    std::filesystem::rename(std::string(path) + "/content/recovery-source.json",
                            std::string(path) + "/content/recovered.json.next");
    require(store.recover("content/recovered.json", 1) == Result::kOk &&
                store.read("content/recovered.json", 1, record) == Result::kOk &&
                record.payload == recoverable,
            "valid next record is promoted after interrupted rename");

    const auto staged_event = bytes("{\"clientAttemptId\":\"recoverable\"}");
    require(store.enqueue("esp32p4_recoverable_event", staged_event) == Result::kOk,
            "recoverable outbox event is written");
    std::filesystem::rename(std::string(path) + "/outbox/esp32p4_recoverable_event.json",
                            std::string(path) + "/outbox/esp32p4_recoverable_event.json.next");
    Store rebooted(path);
    std::vector<std::string> rebooted_events;
    require(rebooted.initialize() == Result::kOk &&
                rebooted.list_outbox(rebooted_events) == Result::kOk &&
                rebooted_events == std::vector<std::string>({"esp32p4_recoverable_event"}),
            "boot promotes a fully written outbox event after interrupted rename");
    require(rebooted.quarantine("esp32p4_recoverable_event") == Result::kOk &&
                rebooted.purge_outbox() == Result::kOk &&
                rebooted.list_outbox(rebooted_events) == Result::kOk && rebooted_events.empty() &&
                !std::filesystem::exists(std::string(path) +
                                         "/outbox/quarantine/esp32p4_recoverable_event.json"),
            "revocation purge removes queued and quarantined outbox data");

    const auto future = bytes("{\"revision\":200}");
    require(store.write_atomic("content/future.json", 2, future) == Result::kOk &&
                store.write_atomic("content/old-source.json", 1, recoverable) == Result::kOk,
            "future and older staged schemas are written");
    std::filesystem::rename(std::string(path) + "/content/old-source.json",
                            std::string(path) + "/content/future.json.next");
    require(store.recover("content/future.json", 1) == Result::kSchemaUnsupported &&
                store.read("content/future.json", 2, record) == Result::kOk &&
                record.payload == future,
            "newer schema remains intact and is rejected safely");

    const auto queued = bytes("{\"clientAttemptId\":\"attempt_a\"}");
    require(store.enqueue("attempt_a", queued) == Result::kOk &&
                store.enqueue("attempt_a", queued) == Result::kOk,
            "outbox enqueue is immutable and idempotent");
    require(store.enqueue("../escape", queued) == Result::kInvalidPath,
            "outbox path traversal rejected");
    std::vector<std::string> events;
    require(store.list_outbox(events) == Result::kOk &&
                events == std::vector<std::string>({"attempt_a"}),
            "outbox listing is deterministic");
    require(store.quarantine("attempt_a") == Result::kOk, "permanent failure quarantined");
    events.clear();
    require(store.list_outbox(events) == Result::kOk && events.empty(),
            "quarantined item leaves active queue");

    std::error_code cleanup_error;
    std::filesystem::remove_all(path, cleanup_error);
    require(!cleanup_error, "temporary storage root removed");
    std::cout << "buddy_storage_tests: PASS\n";
    return 0;
}
