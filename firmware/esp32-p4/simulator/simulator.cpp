#include "buddy_ui.h"
#include "buddy_domain.h"

#include <array>
#include <cstdint>
#include <cstdio>
#include <cstring>
#include <fstream>
#include <string>
#include <unordered_map>
#include <utility>
#include <vector>

namespace {

constexpr uint32_t kWidth = 800;
constexpr uint32_t kHeight = 480;
size_t s_filesystem_free = size_t{8} * 1024 * 1024;
std::unordered_map<std::string, std::string> s_outbox;
size_t s_removed_records = 0;

void append_u32(std::vector<uint8_t> &output, uint32_t value)
{
    output.push_back(static_cast<uint8_t>(value >> 24));
    output.push_back(static_cast<uint8_t>(value >> 16));
    output.push_back(static_cast<uint8_t>(value >> 8));
    output.push_back(static_cast<uint8_t>(value));
}

uint32_t crc32(const uint8_t *data, size_t size)
{
    uint32_t crc = 0xffffffffU;
    for (size_t index = 0; index < size; ++index) {
        crc ^= data[index];
        for (int bit = 0; bit < 8; ++bit) {
            crc = (crc >> 1) ^ (0xedb88320U & (0U - (crc & 1U)));
        }
    }
    return ~crc;
}

uint32_t adler32(const std::vector<uint8_t> &data)
{
    uint32_t a = 1;
    uint32_t b = 0;
    for (uint8_t value : data) {
        a = (a + value) % 65521U;
        b = (b + a) % 65521U;
    }
    return (b << 16) | a;
}

void append_chunk(std::vector<uint8_t> &png, const std::array<uint8_t, 4> &type,
                  const std::vector<uint8_t> &data)
{
    append_u32(png, static_cast<uint32_t>(data.size()));
    const size_t crc_start = png.size();
    png.insert(png.end(), type.begin(), type.end());
    png.insert(png.end(), data.begin(), data.end());
    append_u32(png, crc32(png.data() + crc_start, type.size() + data.size()));
}

std::vector<uint8_t> stored_deflate(const std::vector<uint8_t> &raw)
{
    std::vector<uint8_t> compressed;
    compressed.reserve(raw.size() + raw.size() / 65535U * 5U + 16U);
    compressed.push_back(0x78);
    compressed.push_back(0x01);
    size_t offset = 0;
    while (offset < raw.size()) {
        const size_t remaining = raw.size() - offset;
        const uint16_t block_size = static_cast<uint16_t>(remaining > 65535U ? 65535U : remaining);
        compressed.push_back(remaining <= 65535U ? 0x01 : 0x00);
        compressed.push_back(static_cast<uint8_t>(block_size));
        compressed.push_back(static_cast<uint8_t>(block_size >> 8));
        const uint16_t inverse = static_cast<uint16_t>(~block_size);
        compressed.push_back(static_cast<uint8_t>(inverse));
        compressed.push_back(static_cast<uint8_t>(inverse >> 8));
        compressed.insert(compressed.end(), raw.begin() + static_cast<std::ptrdiff_t>(offset),
                          raw.begin() + static_cast<std::ptrdiff_t>(offset + block_size));
        offset += block_size;
    }
    append_u32(compressed, adler32(raw));
    return compressed;
}

bool write_png(const std::string &path, const std::vector<uint16_t> &frame)
{
    std::vector<uint8_t> raw;
    raw.reserve((static_cast<size_t>(kWidth) * 3U + 1U) * kHeight);
    for (uint32_t y = 0; y < kHeight; ++y) {
        raw.push_back(0);
        for (uint32_t x = 0; x < kWidth; ++x) {
            const uint16_t pixel = frame[y * kWidth + x];
            const uint8_t red5 = static_cast<uint8_t>((pixel >> 11) & 0x1fU);
            const uint8_t green6 = static_cast<uint8_t>((pixel >> 5) & 0x3fU);
            const uint8_t blue5 = static_cast<uint8_t>(pixel & 0x1fU);
            raw.push_back(static_cast<uint8_t>((red5 << 3) | (red5 >> 2)));
            raw.push_back(static_cast<uint8_t>((green6 << 2) | (green6 >> 4)));
            raw.push_back(static_cast<uint8_t>((blue5 << 3) | (blue5 >> 2)));
        }
    }

    std::vector<uint8_t> png{0x89, 'P', 'N', 'G', '\r', '\n', 0x1a, '\n'};
    std::vector<uint8_t> header;
    append_u32(header, kWidth);
    append_u32(header, kHeight);
    header.insert(header.end(), {8, 2, 0, 0, 0});
    append_chunk(png, {'I', 'H', 'D', 'R'}, header);
    append_chunk(png, {'I', 'D', 'A', 'T'}, stored_deflate(raw));
    append_chunk(png, {'I', 'E', 'N', 'D'}, {});

    std::ofstream output(path, std::ios::binary | std::ios::trunc);
    output.write(reinterpret_cast<const char *>(png.data()),
                 static_cast<std::streamsize>(png.size()));
    return output.good();
}

void flush(lv_display_t *display, const lv_area_t *, uint8_t *)
{
    lv_display_flush_ready(display);
}

uint32_t deterministic_tick()
{
    return 1000;
}

constexpr std::array<buddy_ui_wifi_network_t, 3> kWifiNetworks{{
    {{'H', 'o', 'm', 'e', ' ', 'N', 'e', 't', 'w', 'o', 'r', 'k', '\0'}, -48, 2, true, true},
    {{'G', 'u', 'e', 's', 't', '\0'}, -62, 1, false, false},
    {{'L', 'i', 'b', 'r', 'a', 'r', 'y', '\0'}, -78, 1, false, false},
}};

bool simulator_wifi_scan(void *)
{
    return true;
}
size_t simulator_wifi_count(void *)
{
    return kWifiNetworks.size();
}
bool simulator_wifi_network(void *, size_t index, buddy_ui_wifi_network_t *network)
{
    if (network == nullptr || index >= kWifiNetworks.size())
        return false;
    *network = kWifiNetworks[index];
    return true;
}
bool simulator_wifi_connect(void *, const char *, const char *, bool, bool)
{
    return true;
}
bool simulator_wifi_forget(void *, const char *)
{
    return true;
}
bool simulator_request(void *)
{
    return true;
}
bool simulator_write_record(void *, const char *, unsigned, const char *, size_t)
{
    return true;
}
bool simulator_remove_record(void *, const char *)
{
    ++s_removed_records;
    return true;
}
bool simulator_enqueue_event(void *, const char *stable_event_id, const char *payload,
                             size_t payload_size)
{
    if (stable_event_id == nullptr || payload == nullptr)
        return false;
    const std::string body(payload, payload_size);
    const auto existing = s_outbox.find(stable_event_id);
    if (existing != s_outbox.end())
        return existing->second == body;
    s_outbox.emplace(stable_event_id, body);
    return true;
}
size_t simulator_queued_event_count(void *)
{
    return s_outbox.size();
}
size_t simulator_flash_section_count(void *)
{
    return 4;
}
bool simulator_flash_section(void *, size_t index, buddy_ui_flash_section_t *section)
{
    if (section == nullptr || index >= simulator_flash_section_count(nullptr))
        return false;
    std::snprintf(section->id, sizeof(section->id), "sim_section_%u", static_cast<unsigned>(index));
    std::snprintf(section->title, sizeof(section->title), "%s",
                  index == 0 ? "Week 1 Words" : "Study Set");
    std::snprintf(section->source, sizeof(section->source), "Simulator");
    section->card_count = 5;
    section->pinned = index == 0;
    return true;
}
bool simulator_flash_card(void *, size_t section_index, size_t card_index,
                          buddy_ui_flash_card_t *card)
{
    if (card == nullptr || section_index >= simulator_flash_section_count(nullptr) ||
        card_index >= 5) {
        return false;
    }
    std::snprintf(card->id, sizeof(card->id), "sim_card_%u_%u",
                  static_cast<unsigned>(section_index), static_cast<unsigned>(card_index));
    std::snprintf(card->front, sizeof(card->front), "Card %u",
                  static_cast<unsigned>(card_index + 1));
    std::snprintf(card->back, sizeof(card->back), "Answer %u",
                  static_cast<unsigned>(card_index + 1));
    std::snprintf(card->clue, sizeof(card->clue), "Simulator recovery card");
    return true;
}
bool simulator_mastery(void *, int factor, int multiplier, buddy_ui_mastery_t *mastery)
{
    if (mastery == nullptr || factor < 1 || factor > 12 || multiplier < 1 || multiplier > 12) {
        return false;
    }
    if (factor == 2 || (factor == 7 && multiplier <= 4)) {
        mastery->attempts = 8;
        mastery->correct = 7;
        mastery->correct_streak = 4;
        mastery->best_keyboard_response_ms = 3200 + static_cast<uint32_t>(multiplier * 50);
        mastery->has_best_keyboard_response = true;
    } else if (factor == 7 && multiplier <= 8) {
        mastery->attempts = 5;
        mastery->correct = 3;
        mastery->correct_streak = 1;
        mastery->best_keyboard_response_ms = 6100;
        mastery->has_best_keyboard_response = true;
    }
    return true;
}

bool simulator_diagnostics(void *, buddy_ui_diagnostics_t *diagnostics)
{
    if (diagnostics == nullptr)
        return false;
    diagnostics->free_internal_heap = size_t{512} * 1024;
    diagnostics->minimum_internal_heap = size_t{384} * 1024;
    diagnostics->free_psram = size_t{24} * 1024 * 1024;
    diagnostics->minimum_psram = size_t{20} * 1024 * 1024;
    diagnostics->filesystem_free = s_filesystem_free;
    diagnostics->filesystem_low = s_filesystem_free < size_t{2} * 1024 * 1024;
    return true;
}

} // namespace

int main(int argc, char **argv)
{
    if (argc != 3 && !(argc == 2 && std::strcmp(argv[1], "--self-test") == 0)) {
        std::fprintf(stderr, "usage: %s <scenario> <output.png> | --self-test\n", argv[0]);
        return 2;
    }

    lv_init();
    lv_tick_set_cb(deterministic_tick);
    std::vector<uint16_t> frame(static_cast<size_t>(kWidth) * kHeight, 0);
    lv_display_t *display = lv_display_create(kWidth, kHeight);
    if (display == nullptr) {
        std::fprintf(stderr, "could not create LVGL display\n");
        return 1;
    }
    lv_display_set_color_format(display, LV_COLOR_FORMAT_RGB565);
    lv_display_set_buffers(display, frame.data(), nullptr, frame.size() * sizeof(uint16_t),
                           LV_DISPLAY_RENDER_MODE_DIRECT);
    lv_display_set_flush_cb(display, flush);

    if (argc == 3 && std::strcmp(argv[1], "home-storage-low") == 0) {
        s_filesystem_free = size_t{1536} * 1024;
    }

    std::string multiplication_recovery;
    std::string flash_recovery;
    if (argc == 3 && std::strcmp(argv[1], "multiplication-completed-recovery") == 0) {
        buddy::domain::MultiplicationSessionState state;
        state.client_attempt_id = "esp32p4_simulator_completed_multiplication";
        state.selected_factors = {2};
        state.seed = 42;
        state.elapsed_ms = 5000;
        state.deck = {{2, 4}};
        state.attempts = {{{2, 4}, 8, 1200}};
        state.score_correct = 1;
        state.feedback_visible = true;
        state.last_correct = true;
        state.completed = true;
        multiplication_recovery = buddy::domain::encode_multiplication_session(state);
        s_outbox.emplace(state.client_attempt_id,
                         buddy::domain::multiplication_submission_json(state));
    }
    if (argc == 3 && std::strcmp(argv[1], "flash-completed-recovery") == 0) {
        buddy::domain::FlashSessionState state;
        state.client_attempt_id = "esp32p4_simulator_completed_flash";
        state.practice_set_id = "sim_section_0";
        state.content_revision = 12;
        state.seed = 42;
        state.elapsed_ms = 4567;
        std::vector<buddy::domain::FlashCard> cards;
        for (size_t index = 0; index < 5; ++index) {
            cards.push_back({"sim_card_0_" + std::to_string(index), "", "", ""});
        }
        buddy::domain::FlashRound round(std::move(cards), state.seed);
        state.reviews.push_back({round.current()->id, true, 1200});
        state.completed = true;
        flash_recovery = buddy::domain::encode_flash_session(state);
        s_outbox.emplace(
            state.client_attempt_id,
            "{\"eventType\":\"flash_card_session\",\"body\":{\"clientAttemptId\":\"" +
                state.client_attempt_id + "\",\"practiceSetId\":\"" + state.practice_set_id +
                "\",\"contentRevision\":12,\"durationSeconds\":4,\"uniqueCards\":1," +
                "\"firstPassGotIt\":1,\"totalReviews\":1,\"reviews\":[{\"cardId\":\"" +
                state.reviews.front().card_id + "\",\"cardFingerprint\":\"" + std::string(64, '0') +
                "\",\"rating\":\"got_it\",\"shownCount\":1,\"responseMs\":1200}]}}");
    }

    const buddy_ui_bootstrap_t bootstrap{
        .child_name = "Avery",
        .device_name = "Kitchen Buddy Board",
        .flash_authoring_url = "https://buddyblocks.net/kid/avery/flash-cards/",
        .paired = true,
        .online = false,
        .queued_events = 0,
        .flash_section_count = 4,
        .fluent_facts = 37,
        .multiplication_xp_total = 420,
        .best_60_seconds = 35,
        .best_120_seconds = 72,
        .last_sync_text = "Yesterday",
        .device_id_suffix = "simulator",
        .multiplication_session_json =
            multiplication_recovery.empty() ? nullptr : multiplication_recovery.c_str(),
        .flash_session_json = flash_recovery.empty() ? nullptr : flash_recovery.c_str(),
        .flash_content_revision = 12,
        .firmware_version = "0.1.0",
        .hardware_profile = "waveshare-p4-lcd43-rev3",
        .brightness_percent = 80,
        .screen_timeout_minutes = 5,
        .reduced_motion = true,
    };
    buddy_ui_services_t services{};
    services.write_record = simulator_write_record;
    services.remove_record = simulator_remove_record;
    services.enqueue_event = simulator_enqueue_event;
    services.queued_event_count = simulator_queued_event_count;
    services.wifi_scan = simulator_wifi_scan;
    services.wifi_network_count = simulator_wifi_count;
    services.wifi_network = simulator_wifi_network;
    services.wifi_connect = simulator_wifi_connect;
    services.wifi_forget = simulator_wifi_forget;
    services.request_sync = simulator_request;
    services.request_firmware_check = simulator_request;
    services.flash_section_count = simulator_flash_section_count;
    services.flash_section = simulator_flash_section;
    services.flash_card = simulator_flash_card;
    services.mastery = simulator_mastery;
    services.diagnostics = simulator_diagnostics;
    buddy_ui_set_services(&services);
    buddy_ui_update_connectivity(4, "Home Network", "192.0.2.24", -48, 1);
    if (!buddy_ui_start(display, &bootstrap)) {
        std::fprintf(stderr, "could not start Buddy Blocks UI\n");
        return 2;
    }
    if (!multiplication_recovery.empty() &&
        (s_outbox.size() != 1 || s_removed_records == 0 ||
         std::strcmp(buddy_ui_current_screen_name(), "multiplication-summary") != 0)) {
        std::fprintf(stderr, "completed multiplication recovery did not reach the outbox\n");
        return 1;
    }
    if (!flash_recovery.empty() &&
        (s_outbox.size() != 1 || s_removed_records == 0 ||
         std::strcmp(buddy_ui_current_screen_name(), "flash-summary") != 0)) {
        std::fprintf(stderr, "completed flash recovery did not reach the outbox\n");
        return 1;
    }
    if (argc == 2) {
        if (!buddy_ui_run_interaction_self_test()) {
            std::fprintf(stderr, "interaction self-test failed\n");
            return 1;
        }
        std::puts("buddy_ui_interaction_self_test: PASS");
        return 0;
    }
    if (!buddy_ui_render_scenario(argv[1])) {
        std::fprintf(stderr, "unknown or invalid scenario: %s\n", argv[1]);
        return 2;
    }
    lv_refr_now(display);
    if (!write_png(argv[2], frame)) {
        std::fprintf(stderr, "could not write %s\n", argv[2]);
        return 1;
    }
    return 0;
}
