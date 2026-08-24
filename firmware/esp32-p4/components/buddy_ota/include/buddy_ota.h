#pragma once

#include <cstddef>
#include <cstdint>
#include <mutex>
#include <string>

#include "esp_err.h"

namespace buddy::ota {

enum class State {
    kIdle = 0,
    kAvailable,
    kBlocked,
    kDownloading,
    kVerifying,
    kRebootReady,
    kError,
};

struct Manifest {
    std::string hardware_profile;
    std::string version;
    std::string minimum_version;
    std::string url;
    std::string sha256;
    std::string release_notes;
    size_t size = 0;
    bool mandatory = false;
};

struct Snapshot {
    State state = State::kIdle;
    Manifest manifest;
    size_t downloaded = 0;
    std::string message;
    uint32_t revision = 0;
};

class Service {
  public:
    explicit Service(std::string hardware_profile);
    esp_err_t start();
    void set_manifest(const Manifest &manifest);
    void set_install_blockers(bool timed_session, bool unsaved_session, bool stable_power);
    esp_err_t request_install();
    esp_err_t confirm_running_image_healthy(bool all_health_checks_passed = true);
    Snapshot snapshot() const;

  private:
    static void task_entry(void *context);
    void task_loop();
    bool install();
    void publish(State state, const std::string &message = {}, size_t downloaded = 0);

    std::string hardware_profile_;
    mutable std::recursive_mutex mutex_;
    Snapshot snapshot_;
    void *commands_ = nullptr;
    bool timed_session_ = false;
    bool unsaved_session_ = false;
    bool stable_power_ = false;
    bool started_ = false;
};

} // namespace buddy::ota
