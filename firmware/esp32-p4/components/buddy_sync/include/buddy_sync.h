#pragma once

#include <cstddef>
#include <cstdint>
#include <mutex>
#include <optional>
#include <string>

#include "buddy_storage.h"
#include "esp_err.h"

namespace buddy::sync {

enum class State {
    kUnpaired = 0,
    kPairing,
    kPairedOffline,
    kSyncing,
    kReady,
    kRetrying,
    kPairingRequired,
    kMandatoryUpdate,
    kError,
};

struct Config {
    std::string base_url;
    std::string hardware_revision;
    std::string firmware_version;
};

struct Snapshot {
    State state = State::kUnpaired;
    bool online = false;
    bool paired = false;
    std::string pairing_code;
    std::string claim_url;
    std::string child_name;
    std::string child_slug;
    std::string device_name;
    std::string device_id_suffix;
    std::string last_error;
    uint32_t content_revision = 0;
    size_t queued_events = 0;
    int64_t last_successful_sync_unix = 0;
    bool firmware_update_available = false;
    bool firmware_mandatory = false;
    std::string firmware_hardware_profile;
    std::string firmware_version;
    std::string firmware_minimum_version;
    std::string firmware_url;
    std::string firmware_sha256;
    std::string firmware_release_notes;
    size_t firmware_size = 0;
    uint32_t revision = 0;
};

class Service {
  public:
    struct HttpResponse;

    Service(storage::Store &store, Config config);
    esp_err_t start();
    void set_online(bool online);
    esp_err_t request_pairing();
    esp_err_t request_sync();
    esp_err_t request_firmware_check();
    Snapshot snapshot() const;

  private:
    enum class Command : uint8_t { kPair, kSync, kFirmware, kNetworkChanged };
    struct Credentials;

    static void task_entry(void *context);
    void task_loop();
    bool load_credentials();
    bool save_credentials();
    bool ensure_device_identity(bool rotate_token);
    bool create_pairing();
    bool poll_pairing();
    bool synchronize();
    bool flush_outbox();
    bool pull_bootstrap(uint32_t &server_revision);
    bool pull_flash_cards(uint32_t server_revision);
    bool pull_firmware_policy();
    void capture_trustworthy_time(std::optional<int64_t> server_time_ms = std::nullopt);
    void purge_child_state(const std::string &reason);
    HttpResponse request(const std::string &path, const char *method, const std::string &body = {},
                         const std::string &authorization = {}, const std::string &etag = {},
                         size_t maximum_body = 1024 * 1024);
    void publish(State state, const std::string &error = {});
    void refresh_queue_count();
    esp_err_t enqueue(Command command);

    storage::Store &store_;
    Config config_;
    Credentials *credentials_;
    void *commands_ = nullptr;
    mutable std::recursive_mutex mutex_;
    Snapshot snapshot_;
    bool started_ = false;
    int64_t last_firmware_check_ms_ = -(24LL * 60 * 60 * 1000);
};

} // namespace buddy::sync
