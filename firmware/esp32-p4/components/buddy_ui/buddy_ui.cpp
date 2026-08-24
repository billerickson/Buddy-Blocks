#include "buddy_ui.h"

#include <algorithm>
#include <array>
#include <cinttypes>
#include <cstdlib>
#include <cstdio>
#include <memory>
#include <sstream>
#include <string>
#include <unordered_map>
#include <vector>

#include "buddy_domain.h"
#include "src/libs/qrcode/lv_qrcode.h"

namespace {

using buddy::domain::Attempt;
using buddy::domain::FlashCard;
using buddy::domain::FlashRound;
using buddy::domain::FlashSessionReview;
using buddy::domain::FlashSessionState;
using buddy::domain::MultiplicationFact;
using buddy::domain::MultiplicationSessionState;

constexpr int kWidth = 800;
constexpr int kHeight = 480;
constexpr int kTopHeight = 56;
constexpr int kConfirmTop = 400;
lv_color_t color(uint32_t value) { return lv_color_hex(value); }

constexpr uint32_t kInk = 0x242134;
constexpr uint32_t kMuted = 0x645D79;
constexpr uint32_t kBerry = 0xE63E80;
constexpr uint32_t kBerryDark = 0xA91F55;
constexpr uint32_t kReward = 0xFFD84D;
constexpr uint32_t kTeal = 0x18BCA4;
constexpr uint32_t kBlue = 0x5B79FF;
constexpr uint32_t kOrange = 0xFF7F45;
constexpr uint32_t kWash = 0xFFF1F7;
constexpr uint32_t kMint = 0xF0FFF9;
constexpr uint32_t kPaper = 0xFFFFFF;
constexpr uint32_t kDisabled = 0xD9D5E3;

enum class Screen {
    kHome,
    kMultiplicationSetup,
    kMultiplicationQuestion,
    kMultiplicationSummary,
    kMasteryOverview,
    kMasteryDetail,
    kFlashLibrary,
    kFlashStudy,
    kFlashSummary,
    kSettings,
    kWifi,
    kWifiNetwork,
    kWifiForget,
    kPairing,
    kUpdate,
    kPreferences,
    kFactoryReset,
    kDiagnostics,
    kHardwareProof,
    kOptionGallery,
    kChoiceGallery,
    kLongOptionGallery,
    kTextBoundaryGallery,
};

struct AppState {
    lv_display_t *display = nullptr;
    buddy_ui_bootstrap_t bootstrap{};
    std::string child_name = "Demo Learner";
    std::string device_name = "Buddy Board";
    std::string flash_authoring_url;
    std::string last_sync = "Never";
    std::string firmware_version = "0.1.0";
    std::string hardware_profile = "waveshare-p4-lcd43-rev3";
    std::string device_id_suffix = "unpaired";
    Screen current = Screen::kHome;
    Screen pending = Screen::kHome;
    std::array<bool, 12> selected_factors{};
    bool timed = false;
    int duration_seconds = 60;
    std::vector<MultiplicationFact> deck;
    size_t deck_index = 0;
    std::string answer;
    std::vector<Attempt> attempts;
    int score_correct = 0;
    int selected_mastery_factor = 1;
    bool feedback_visible = false;
    bool last_correct = false;
    uint64_t session_seed = 0x42554444594ULL;
    uint64_t active_session_seed = 0;
    uint64_t session_started_ms = 0;
    uint64_t session_elapsed_offset_ms = 0;
    uint64_t question_started_ms = 0;
    std::string client_attempt_id;
    bool session_saved = false;
    bool storage_warning = false;
    lv_timer_t *timed_timer = nullptr;
    lv_obj_t *timer_label = nullptr;
    std::unique_ptr<FlashRound> flash_round;
    std::vector<buddy_ui_flash_section_t> flash_sections;
    std::vector<FlashCard> flash_cards;
    std::vector<FlashSessionReview> flash_reviews;
    int selected_flash_index = -1;
    std::string flash_section_id;
    std::string flash_section_title;
    std::string flash_client_attempt_id;
    uint64_t flash_seed = 0;
    uint64_t flash_started_ms = 0;
    uint64_t flash_elapsed_offset_ms = 0;
    uint64_t flash_card_started_ms = 0;
    uint32_t flash_content_revision = 0;
    bool flash_session_saved = false;
    size_t touch_grid_taps = 0;
    int wifi_state = 1;
    uint32_t wifi_revision = 0;
    std::string wifi_ssid;
    std::string wifi_ipv4;
    int wifi_rssi = 0;
    std::vector<buddy_ui_wifi_network_t> wifi_networks;
    int selected_wifi_index = -1;
    bool hidden_wifi = false;
    lv_obj_t *wifi_ssid_input = nullptr;
    lv_obj_t *wifi_password_input = nullptr;
    lv_obj_t *wifi_keyboard = nullptr;
    lv_obj_t *wifi_active_input = nullptr;
    std::array<lv_obj_t *, 26> wifi_key_buttons{};
    bool wifi_shift = false;
    bool wifi_symbols = false;
    bool navigation_pending = false;
    bool click_seen = false;
    uint64_t last_click_ms = 0;
    int device_state = 0;
    uint32_t device_revision = 0;
    uint32_t content_revision = 0;
    std::string pairing_code;
    std::string claim_url;
    std::string device_error;
    int ota_state = 0;
    uint32_t ota_revision = 0;
    std::string ota_version;
    std::string ota_minimum_version;
    std::string ota_release_notes;
    std::string ota_message;
    size_t ota_downloaded = 0;
    size_t ota_size = 0;
    bool ota_mandatory = false;
    bool firmware_checking = false;
    uint32_t mastery_revision = 0;
    uint8_t brightness_percent = 80;
    uint8_t screen_timeout_minutes = 5;
    bool reduced_motion = true;
    lv_obj_t *factory_reset_input = nullptr;
    std::string factory_reset_error;
    int gallery_choice_count = 4;
};

AppState s_app;
buddy_ui_services_t s_services{};
size_t empty_flash_section_count(void *) { return 0; }

constexpr const char *kMultiplicationSessionPath = "sessions/multiplication-active.json";
constexpr const char *kFlashSessionPath = "sessions/flash-card-active.json";

std::vector<int> selected_factors();
void finish_multiplication(lv_event_t *);
bool restore_flash_session(const char *json);
void finish_flash_round(lv_event_t *);
void sync_action(lv_event_t *);
void home_sync_action(lv_event_t *);
void firmware_check_action(lv_event_t *);

void notify_activity_state()
{
    if (s_services.activity_state == nullptr) return;
    const bool multiplication_active = !s_app.client_attempt_id.empty() && !s_app.session_saved;
    const bool flash_active = s_app.flash_round != nullptr && !s_app.flash_session_saved;
    s_services.activity_state(s_services.context,
                              multiplication_active && s_app.timed,
                              multiplication_active || flash_active);
}

std::vector<buddy::domain::MasteryStats> mastery_snapshot()
{
    std::vector<buddy::domain::MasteryStats> mastery(144);
    if (s_services.mastery == nullptr) return mastery;
    for (int factor = 1; factor <= 12; ++factor) {
        for (int multiplier = 1; multiplier <= 12; ++multiplier) {
            buddy_ui_mastery_t value{};
            if (!s_services.mastery(s_services.context, factor, multiplier, &value)) continue;
            auto &stats = mastery[static_cast<size_t>((factor - 1) * 12 + multiplier - 1)];
            stats.attempts = value.attempts;
            stats.correct = value.correct;
            stats.correct_streak = value.correct_streak;
            if (value.has_best_keyboard_response) {
                stats.best_keyboard_response_ms = value.best_keyboard_response_ms;
            }
        }
    }
    return mastery;
}

uint64_t now_ms()
{
    return s_services.monotonic_ms != nullptr
               ? s_services.monotonic_ms(s_services.context)
               : static_cast<uint64_t>(lv_tick_get());
}

MultiplicationSessionState multiplication_state()
{
    MultiplicationSessionState state;
    state.client_attempt_id = s_app.client_attempt_id;
    state.timed = s_app.timed;
    state.duration_seconds = s_app.duration_seconds;
    state.selected_factors = selected_factors();
    state.seed = s_app.active_session_seed;
    const uint64_t current = now_ms();
    state.elapsed_ms = s_app.session_elapsed_offset_ms +
                       (current >= s_app.session_started_ms ? current - s_app.session_started_ms : 0);
    state.deck = s_app.deck;
    state.deck_index = s_app.deck_index;
    state.attempts = s_app.attempts;
    state.score_correct = s_app.score_correct;
    state.feedback_visible = s_app.feedback_visible;
    state.last_correct = s_app.last_correct;
    return state;
}

bool persist_multiplication()
{
    if (s_services.write_record == nullptr || s_app.client_attempt_id.empty()) {
        return true;
    }
    const std::string payload = buddy::domain::encode_multiplication_session(multiplication_state());
    const bool saved = s_services.write_record(s_services.context, kMultiplicationSessionPath, 1,
                                                payload.data(), payload.size());
    s_app.storage_warning = !saved;
    return saved;
}

void remove_multiplication_record()
{
    if (s_services.remove_record != nullptr) {
        (void)s_services.remove_record(s_services.context, kMultiplicationSessionPath);
    }
}

void render(Screen screen);

void deferred_render(void *)
{
    s_app.navigation_pending = false;
    render(s_app.pending);
}

void navigate(Screen screen)
{
    s_app.pending = screen;
    s_app.navigation_pending = true;
    lv_async_call(deferred_render, nullptr);
}

void guard_click(lv_event_t *event)
{
    const uint64_t current = now_ms();
    if (s_app.navigation_pending ||
        (s_app.click_seen && current >= s_app.last_click_ms && current - s_app.last_click_ms < 120)) {
        lv_event_stop_processing(event);
        return;
    }
    s_app.click_seen = true;
    s_app.last_click_ms = current;
}

void style_text(lv_obj_t *object, uint32_t text_color, const lv_font_t *font)
{
    lv_obj_set_style_text_color(object, color(text_color), LV_PART_MAIN);
    lv_obj_set_style_text_font(object, font, LV_PART_MAIN);
}

lv_obj_t *label(lv_obj_t *parent, const char *text, int x, int y, int width,
                const lv_font_t *font, uint32_t text_color, lv_text_align_t align = LV_TEXT_ALIGN_LEFT)
{
    lv_obj_t *value = lv_label_create(parent);
    lv_label_set_text(value, text);
    lv_label_set_long_mode(value, LV_LABEL_LONG_WRAP);
    lv_obj_set_pos(value, x, y);
    lv_obj_set_width(value, width);
    lv_obj_set_style_text_align(value, align, LV_PART_MAIN);
    style_text(value, text_color, font);
    return value;
}

lv_obj_t *button(lv_obj_t *parent, const char *text, int x, int y, int width, int height,
                 uint32_t background, lv_event_cb_t callback, intptr_t stable_value = 0,
                 bool enabled = true)
{
    lv_obj_t *object = lv_button_create(parent);
    lv_obj_set_pos(object, x, y);
    lv_obj_set_size(object, width, height);
    lv_obj_set_style_radius(object, 14, LV_PART_MAIN);
    lv_obj_set_style_bg_color(object, color(enabled ? background : kDisabled), LV_PART_MAIN);
    lv_obj_set_style_bg_color(object, color(kBerryDark), LV_PART_MAIN | LV_STATE_PRESSED);
    lv_obj_set_style_border_color(object, color(kInk), LV_PART_MAIN);
    lv_obj_set_style_border_width(object, 2, LV_PART_MAIN);
    lv_obj_set_style_shadow_width(object, 0, LV_PART_MAIN);
    if (!enabled) {
        lv_obj_add_state(object, LV_STATE_DISABLED);
    }
    if (callback != nullptr) {
        // LVGL reports CLICKED only for a valid press/release on the target. The
        // guard additionally prevents a double tap or carried release from
        // invoking a callback while the deferred screen transition is pending.
        lv_obj_add_event_cb(object, guard_click, LV_EVENT_CLICKED, nullptr);
        lv_obj_add_event_cb(object, callback, LV_EVENT_CLICKED,
                            reinterpret_cast<void *>(stable_value));
    }
    lv_obj_t *text_label = lv_label_create(object);
    lv_label_set_text(text_label, text);
    lv_label_set_long_mode(text_label, LV_LABEL_LONG_WRAP);
    lv_obj_set_width(text_label, width - 24);
    lv_obj_set_style_text_align(text_label, LV_TEXT_ALIGN_CENTER, LV_PART_MAIN);
    style_text(text_label, enabled ? kInk : kMuted, &lv_font_montserrat_20);
    lv_obj_center(text_label);
    return object;
}

lv_obj_t *option_tile(lv_obj_t *parent, const char *text, int x, int y, int width, int height,
                      bool selected, lv_event_cb_t callback, intptr_t stable_value,
                      bool enabled = true)
{
    lv_obj_t *object = button(parent, text, x, y, width, height,
                              selected ? kReward : kPaper, callback, stable_value, enabled);
    lv_obj_set_style_border_color(object, color(selected ? kBlue : kInk), LV_PART_MAIN);
    lv_obj_set_style_border_width(object, selected ? 4 : 2, LV_PART_MAIN);
    if (selected) {
        lv_obj_t *mark = lv_label_create(object);
        lv_label_set_text(mark, LV_SYMBOL_OK);
        lv_obj_align(mark, LV_ALIGN_TOP_RIGHT, -8, 6);
        style_text(mark, kBlue, &lv_font_montserrat_16);
    }
    return object;
}

lv_obj_t *top_nav(const char *title, bool show_back)
{
    lv_obj_t *screen = lv_screen_active();
    lv_obj_t *top = lv_obj_create(screen);
    lv_obj_set_pos(top, 0, 0);
    lv_obj_set_size(top, kWidth, kTopHeight);
    lv_obj_set_style_bg_color(top, color(kInk), LV_PART_MAIN);
    lv_obj_set_style_border_width(top, 0, LV_PART_MAIN);
    lv_obj_set_style_radius(top, 0, LV_PART_MAIN);
    lv_obj_remove_flag(top, LV_OBJ_FLAG_SCROLLABLE);
    lv_obj_add_flag(top, LV_OBJ_FLAG_FLOATING);
    if (show_back) {
        button(top, LV_SYMBOL_LEFT " Back", 8, 4, 116, 48, kPaper,
               [](lv_event_t *event) {
                   switch (s_app.current) {
                   case Screen::kMultiplicationQuestion:
                       finish_multiplication(event);
                       break;
                   case Screen::kMasteryDetail:
                       navigate(Screen::kMasteryOverview);
                       break;
                   case Screen::kMasteryOverview:
                       navigate(Screen::kMultiplicationSetup);
                       break;
                   case Screen::kWifi:
                   case Screen::kWifiNetwork:
                   case Screen::kWifiForget:
                   case Screen::kPairing:
                   case Screen::kUpdate:
                   case Screen::kPreferences:
                   case Screen::kFactoryReset:
                   case Screen::kDiagnostics:
                   case Screen::kHardwareProof:
                       navigate(s_app.current == Screen::kWifiNetwork ||
                                        s_app.current == Screen::kWifiForget
                                    ? Screen::kWifi
                                    : Screen::kSettings);
                       break;
                   case Screen::kFlashStudy:
                       finish_flash_round(event);
                       break;
                   case Screen::kFlashSummary:
                       navigate(Screen::kFlashLibrary);
                       break;
                   default:
                       navigate(Screen::kHome);
                       break;
                   }
               });
    } else {
        label(top, "BUDDY BLOCKS", 18, 17, 190, &lv_font_montserrat_16, kReward);
    }
    label(top, title, show_back ? 140 : 220, 13, show_back ? 500 : 390,
          &lv_font_montserrat_24, kPaper, LV_TEXT_ALIGN_CENTER);
    button(top, LV_SYMBOL_SETTINGS, 734, 4, 58, 48, kPaper,
           [](lv_event_t *) { navigate(Screen::kSettings); });
    return top;
}

lv_obj_t *confirm_bar(const char *primary, bool enabled, lv_event_cb_t primary_callback,
                      const char *secondary = nullptr, lv_event_cb_t secondary_callback = nullptr,
                      uint32_t primary_color = kBerry)
{
    lv_obj_t *screen = lv_screen_active();
    lv_obj_t *bar = lv_obj_create(screen);
    lv_obj_set_pos(bar, 0, kConfirmTop);
    lv_obj_set_size(bar, kWidth, 80);
    lv_obj_set_style_bg_color(bar, color(kMint), LV_PART_MAIN);
    lv_obj_set_style_border_width(bar, 0, LV_PART_MAIN);
    lv_obj_set_style_radius(bar, 0, LV_PART_MAIN);
    lv_obj_remove_flag(bar, LV_OBJ_FLAG_SCROLLABLE);
    lv_obj_add_flag(bar, LV_OBJ_FLAG_FLOATING);
    if (secondary != nullptr) {
        button(bar, secondary, 16, 10, 250, 60, kPaper, secondary_callback);
        button(bar, primary, 282, 10, 502, 60, primary_color, primary_callback, 0, enabled);
    } else {
        button(bar, primary, 16, 10, 768, 60, primary_color, primary_callback, 0, enabled);
    }
    return bar;
}

void prepare_screen(uint32_t background)
{
    lv_obj_t *screen = lv_screen_active();
    lv_obj_clean(screen);
    lv_obj_remove_flag(screen, LV_OBJ_FLAG_SCROLLABLE);
    lv_obj_set_style_bg_color(screen, color(background), LV_PART_MAIN);
    lv_obj_set_style_pad_all(screen, 0, LV_PART_MAIN);
}

void home_event(lv_event_t *event)
{
    const intptr_t value = reinterpret_cast<intptr_t>(lv_event_get_user_data(event));
    navigate(value == 1 ? Screen::kMultiplicationSetup : Screen::kFlashLibrary);
}

void render_home()
{
    top_nav(s_app.child_name.c_str(), false);
    label(lv_screen_active(), s_app.bootstrap.paired ? "Ready to learn" : "Offline Demo",
          24, 72, 300, &lv_font_montserrat_24, kInk);
    const bool syncing = s_app.device_state == 3;
    const char *status = syncing ? LV_SYMBOL_REFRESH " Syncing"
                         : s_app.bootstrap.online ? LV_SYMBOL_WIFI " Online"
                                                  : LV_SYMBOL_WARNING " Offline";
    lv_obj_t *pill = button(lv_screen_active(), status, 610, 65, 166, 52,
                            syncing ? kReward : s_app.bootstrap.online ? kTeal : kOrange, nullptr);
    lv_obj_set_style_border_width(pill, 0, LV_PART_MAIN);

    lv_obj_t *facts = button(lv_screen_active(), "", 24, 132, 364, 218,
                             kBlue, home_event, 1);
    label(facts, "Multiplication Facts", 24, 30, 316,
          &lv_font_montserrat_24, kInk, LV_TEXT_ALIGN_CENTER);
    char mastery_text[120];
    std::snprintf(mastery_text, sizeof(mastery_text),
                  "Practice 1s-12s\n%u/144 fluent • %d XP\nBest: 60s %d • 120s %d",
                  static_cast<unsigned>(s_app.bootstrap.fluent_facts),
                  s_app.bootstrap.multiplication_xp_total,
                  s_app.bootstrap.best_60_seconds,
                  s_app.bootstrap.best_120_seconds);
    label(facts, mastery_text, 24, 104, 316,
          &lv_font_montserrat_20, kInk, LV_TEXT_ALIGN_CENTER);
    lv_obj_t *cards = button(lv_screen_active(), "", 412, 132, 364, 218,
                             kBerry, home_event, 2);
    label(cards, "My Flash Cards", 24, 30, 316,
          &lv_font_montserrat_24, kInk, LV_TEXT_ALIGN_CENTER);
    size_t flash_section_count = s_app.bootstrap.flash_section_count;
    buddy_ui_flash_section_t first_section{};
    if (s_app.bootstrap.paired && s_services.flash_section_count != nullptr) {
        flash_section_count = s_services.flash_section_count(s_services.context);
        s_app.bootstrap.flash_section_count = flash_section_count;
    }
    const bool has_pinned = flash_section_count > 0 && s_services.flash_section != nullptr &&
                            s_services.flash_section(s_services.context, 0, &first_section) &&
                            first_section.pinned;
    char flash_text[220];
    if (has_pinned) {
        std::snprintf(flash_text, sizeof(flash_text),
                      "%u active section%s\nPinned: %s",
                      static_cast<unsigned>(flash_section_count),
                      flash_section_count == 1 ? "" : "s", first_section.title);
    } else {
        std::snprintf(flash_text, sizeof(flash_text),
                      "Study downloaded sections\n%u active section%s • Again & Got it",
                      static_cast<unsigned>(flash_section_count),
                      flash_section_count == 1 ? "" : "s");
    }
    label(cards, flash_text, 24, 104, 316, &lv_font_montserrat_20, kInk,
          LV_TEXT_ALIGN_CENTER);

    char footer[160];
    std::snprintf(footer, sizeof(footer), "Last synced: %s  |  Queued: %u",
                  s_app.last_sync.c_str(), static_cast<unsigned>(s_app.bootstrap.queued_events));
    label(lv_screen_active(), footer, 24, 367, 550, &lv_font_montserrat_16, kMuted);
    button(lv_screen_active(), "Sync now", 620, 356, 156, 52,
           s_app.bootstrap.online ? kTeal : kPaper,
           home_sync_action);
}

void table_event(lv_event_t *event)
{
    const int factor = static_cast<int>(reinterpret_cast<intptr_t>(lv_event_get_user_data(event)));
    if (factor >= 1 && factor <= 12) {
        s_app.selected_factors[static_cast<size_t>(factor - 1)] =
            !s_app.selected_factors[static_cast<size_t>(factor - 1)];
    }
    navigate(Screen::kMultiplicationSetup);
}

void mode_event(lv_event_t *event)
{
    const int value = static_cast<int>(reinterpret_cast<intptr_t>(lv_event_get_user_data(event)));
    s_app.timed = value != 0;
    if (value == 60 || value == 120) {
        s_app.duration_seconds = value;
    }
    navigate(Screen::kMultiplicationSetup);
}

std::vector<int> selected_factors()
{
    std::vector<int> selected;
    for (size_t index = 0; index < s_app.selected_factors.size(); ++index) {
        if (s_app.selected_factors[index]) {
            selected.push_back(static_cast<int>(index + 1));
        }
    }
    return selected;
}

void timed_timer_tick(lv_timer_t *)
{
    if (!s_app.timed || s_app.current != Screen::kMultiplicationQuestion) return;
    const uint64_t current = now_ms();
    const uint64_t elapsed = s_app.session_elapsed_offset_ms +
                             (current >= s_app.session_started_ms
                                  ? current - s_app.session_started_ms
                                  : 0);
    const uint64_t duration = static_cast<uint64_t>(s_app.duration_seconds) * 1000ULL;
    if (elapsed >= duration) {
        finish_multiplication(nullptr);
        return;
    }
    if (s_app.timer_label != nullptr) {
        char remaining[32];
        std::snprintf(remaining, sizeof(remaining), "Time: %llu",
                      static_cast<unsigned long long>((duration - elapsed + 999) / 1000));
        lv_label_set_text(s_app.timer_label, remaining);
    }
}

void ensure_timed_timer()
{
    if (s_app.timed && s_app.timed_timer == nullptr) {
        s_app.timed_timer = lv_timer_create(timed_timer_tick, 250, nullptr);
    }
}

void start_multiplication(lv_event_t *)
{
    const auto factors = selected_factors();
    const auto mastery = mastery_snapshot();
    s_app.active_session_seed = s_app.session_seed++;
    s_app.deck = buddy::domain::build_deck(factors, mastery, !s_app.timed, std::nullopt,
                                           s_app.active_session_seed);
    s_app.deck_index = 0;
    s_app.answer.clear();
    s_app.attempts.clear();
    s_app.score_correct = 0;
    s_app.feedback_visible = false;
    s_app.last_correct = false;
    s_app.session_saved = false;
    s_app.storage_warning = false;
    s_app.session_started_ms = now_ms();
    s_app.session_elapsed_offset_ms = 0;
    s_app.question_started_ms = s_app.session_started_ms;
    char event_id[129]{};
    if (s_services.new_event_id == nullptr ||
        !s_services.new_event_id(s_services.context, "multiplication", event_id,
                                 sizeof(event_id))) {
        std::snprintf(event_id, sizeof(event_id), "esp32p4_demo_%026llx",
                      static_cast<unsigned long long>(s_app.active_session_seed));
    }
    s_app.client_attempt_id = event_id;
    ensure_timed_timer();
    (void)persist_multiplication();
    notify_activity_state();
    navigate(Screen::kMultiplicationQuestion);
}

void needs_practice(lv_event_t *)
{
    const auto mastery = mastery_snapshot();
    s_app.selected_factors.fill(false);
    bool selected_any = false;
    for (int factor = 1; factor <= 12; ++factor) {
        bool needs_practice = false;
        for (int multiplier = 1; multiplier <= 12; ++multiplier) {
            const size_t index = static_cast<size_t>((factor - 1) * 12 + multiplier - 1);
            if (buddy::domain::mastery_level(&mastery[index]) !=
                buddy::domain::MasteryLevel::kFluent) {
                needs_practice = true;
                break;
            }
        }
        s_app.selected_factors[static_cast<size_t>(factor - 1)] = needs_practice;
        selected_any = selected_any || needs_practice;
    }
    if (!selected_any) s_app.selected_factors.fill(true);
    navigate(Screen::kMultiplicationSetup);
}

void open_mastery_overview(lv_event_t *) { navigate(Screen::kMasteryOverview); }

void open_mastery_detail(lv_event_t *event)
{
    const int factor = static_cast<int>(reinterpret_cast<intptr_t>(lv_event_get_user_data(event)));
    if (factor < 1 || factor > 12) return;
    s_app.selected_mastery_factor = factor;
    navigate(Screen::kMasteryDetail);
}

void render_mastery_overview()
{
    top_nav("Mastery Overview", true);
    const auto mastery = mastery_snapshot();
    for (int factor = 1; factor <= 12; ++factor) {
        int fluent = 0;
        int learning = 0;
        for (int multiplier = 1; multiplier <= 12; ++multiplier) {
            const size_t index = static_cast<size_t>((factor - 1) * 12 + multiplier - 1);
            const auto level = buddy::domain::mastery_level(&mastery[index]);
            if (level == buddy::domain::MasteryLevel::kFluent) {
                ++fluent;
            } else if (mastery[index].attempts > 0) {
                ++learning;
            }
        }
        char text[48];
        std::snprintf(text, sizeof(text), "%ds\n%d fluent • %d learning", factor, fluent,
                      learning);
        const int column = (factor - 1) % 4;
        const int row = (factor - 1) / 4;
        option_tile(lv_screen_active(), text, 20 + column * 194, 70 + row * 104, 174, 88,
                    fluent == 12, open_mastery_detail, factor);
    }
    confirm_bar("Choose tables", true,
                [](lv_event_t *) { navigate(Screen::kMultiplicationSetup); });
}

void render_mastery_detail()
{
    char title[48];
    std::snprintf(title, sizeof(title), "%ds Mastery Details", s_app.selected_mastery_factor);
    top_nav(title, true);
    const auto mastery = mastery_snapshot();
    for (int multiplier = 1; multiplier <= 12; ++multiplier) {
        const size_t index = static_cast<size_t>((s_app.selected_mastery_factor - 1) * 12 +
                                                 multiplier - 1);
        const auto &stats = mastery[index];
        const auto level = buddy::domain::mastery_level(&stats);
        const bool fluent = level == buddy::domain::MasteryLevel::kFluent;
        const bool attempted = stats.attempts > 0;
        const int accuracy = attempted ? stats.correct * 100 / stats.attempts : 0;
        char text[80];
        if (!attempted) {
            std::snprintf(text, sizeof(text), "%d x %d\nNew", s_app.selected_mastery_factor,
                          multiplier);
        } else if (stats.best_keyboard_response_ms.has_value()) {
            std::snprintf(text, sizeof(text), "%d x %d\n%s • %d%% • %.1fs",
                          s_app.selected_mastery_factor, multiplier,
                          fluent ? "Fluent" : "Learning", accuracy,
                          stats.best_keyboard_response_ms.value() / 1000.0);
        } else {
            std::snprintf(text, sizeof(text), "%d x %d\n%s • %d%%",
                          s_app.selected_mastery_factor, multiplier,
                          fluent ? "Fluent" : "Learning", accuracy);
        }
        const int column = (multiplier - 1) % 4;
        const int row = (multiplier - 1) / 4;
        lv_obj_t *tile = option_tile(lv_screen_active(), text, 20 + column * 194,
                                     70 + row * 104, 174, 88, fluent, nullptr, multiplier);
        if (attempted && !fluent) {
            lv_obj_set_style_bg_color(tile, color(kWash), LV_PART_MAIN);
        }
    }
    confirm_bar("Back to overview", true,
                [](lv_event_t *) { navigate(Screen::kMasteryOverview); });
}

void render_multiplication_setup()
{
    top_nav("Multiplication Facts", true);
    label(lv_screen_active(), "Choose tables", 20, 68, 210, &lv_font_montserrat_20, kInk);
    const auto mastery = mastery_snapshot();
    for (int factor = 1; factor <= 12; ++factor) {
        const int column = (factor - 1) % 4;
        const int row = (factor - 1) / 4;
        int fluent = 0;
        for (int multiplier = 1; multiplier <= 12; ++multiplier) {
            const size_t index = static_cast<size_t>((factor - 1) * 12 + multiplier - 1);
            if (buddy::domain::mastery_level(&mastery[index]) ==
                buddy::domain::MasteryLevel::kFluent) {
                ++fluent;
            }
        }
        char text[24];
        std::snprintf(text, sizeof(text), "%ds\n%d/12", factor, fluent);
        option_tile(lv_screen_active(), text, 20 + column * 112, 100 + row * 86, 98, 72,
                    s_app.selected_factors[static_cast<size_t>(factor - 1)], table_event, factor);
    }
    label(lv_screen_active(), "Mode", 482, 68, 140, &lv_font_montserrat_20, kInk);
    option_tile(lv_screen_active(), "Practice", 482, 100, 294, 66, !s_app.timed, mode_event, 0);
    option_tile(lv_screen_active(), "60 seconds", 482, 176, 140, 66,
                s_app.timed && s_app.duration_seconds == 60, mode_event, 60);
    option_tile(lv_screen_active(), "120 seconds", 636, 176, 140, 66,
                s_app.timed && s_app.duration_seconds == 120, mode_event, 120);
    button(lv_screen_active(), "Needs Practice", 482, 256, 140, 62, kPaper, needs_practice);
    button(lv_screen_active(), "Mastery", 636, 256, 140, 62, kPaper,
           open_mastery_overview);
    const bool any = std::any_of(s_app.selected_factors.begin(), s_app.selected_factors.end(),
                                 [](bool selected) { return selected; });
    confirm_bar("Start", any, start_multiplication);
}

void keypad_event(lv_event_t *event)
{
    const int value = static_cast<int>(reinterpret_cast<intptr_t>(lv_event_get_user_data(event)));
    if (s_app.feedback_visible || s_app.deck_index >= s_app.deck.size()) {
        return;
    }
    if (value >= 0 && value <= 9) {
        if (s_app.answer.size() < 3) {
            s_app.answer.push_back(static_cast<char>('0' + value));
        }
    } else if (value == -2 && !s_app.answer.empty()) {
        s_app.answer.pop_back();
    } else if (value == -1 && !s_app.answer.empty()) {
        const MultiplicationFact fact = s_app.deck[s_app.deck_index];
        const int answer = std::atoi(s_app.answer.c_str());
        const uint64_t current = now_ms();
        const uint64_t response = current >= s_app.question_started_ms
                                      ? current - s_app.question_started_ms
                                      : 0;
        Attempt attempt{fact, answer,
                        static_cast<uint32_t>(std::min<uint64_t>(response, 600000))};
        s_app.last_correct = buddy::domain::score_attempt(selected_factors(), attempt);
        s_app.attempts.push_back(attempt);
        if (s_app.last_correct) {
            ++s_app.score_correct;
        } else {
            std::vector<MultiplicationFact> remaining(
                s_app.deck.begin() + static_cast<std::ptrdiff_t>(s_app.deck_index + 1),
                s_app.deck.end());
            buddy::domain::requeue_missed(remaining, fact, 3);
            s_app.deck.erase(s_app.deck.begin() + static_cast<std::ptrdiff_t>(s_app.deck_index + 1),
                             s_app.deck.end());
            s_app.deck.insert(s_app.deck.end(), remaining.begin(), remaining.end());
        }
        s_app.feedback_visible = true;
        (void)persist_multiplication();
    }
    navigate(Screen::kMultiplicationQuestion);
}

void next_fact(lv_event_t *)
{
    const MultiplicationFact previous = s_app.deck[s_app.deck_index];
    ++s_app.deck_index;
    s_app.answer.clear();
    s_app.feedback_visible = false;
    if (s_app.deck_index >= s_app.deck.size()) {
        const auto mastery = mastery_snapshot();
        s_app.deck = buddy::domain::build_deck(selected_factors(), mastery, !s_app.timed,
                                               previous, s_app.active_session_seed +
                                                             s_app.attempts.size());
        s_app.deck_index = 0;
    }
    s_app.question_started_ms = now_ms();
    (void)persist_multiplication();
    navigate(Screen::kMultiplicationQuestion);
}

void finish_multiplication(lv_event_t *)
{
    if (s_app.session_saved) {
        navigate(Screen::kMultiplicationSummary);
        return;
    }
    if (s_app.timed_timer != nullptr) {
        lv_timer_delete(s_app.timed_timer);
        s_app.timed_timer = nullptr;
    }
    s_app.timer_label = nullptr;
    const MultiplicationSessionState state = multiplication_state();
    (void)persist_multiplication();
    bool retained = true;
    if (s_app.bootstrap.paired && s_services.enqueue_event != nullptr && !state.attempts.empty()) {
        const std::string payload = buddy::domain::multiplication_submission_json(state);
        retained = s_services.enqueue_event(s_services.context, state.client_attempt_id.c_str(),
                                            payload.data(), payload.size());
        if (retained) {
            ++s_app.bootstrap.queued_events;
        }
    }
    if (!s_app.bootstrap.paired || state.attempts.empty() || retained) {
        remove_multiplication_record();
        s_app.session_saved = true;
        s_app.storage_warning = false;
    } else {
        s_app.storage_warning = true;
    }
    notify_activity_state();
    navigate(Screen::kMultiplicationSummary);
}

void render_multiplication_question()
{
    top_nav(s_app.timed ? "Time Test" : "Practice", true);
    if (s_app.deck.empty() || s_app.deck_index >= s_app.deck.size()) {
        navigate(Screen::kMultiplicationSummary);
        return;
    }
    const MultiplicationFact fact = s_app.deck[s_app.deck_index];
    char progress[80];
    std::snprintf(progress, sizeof(progress), "Question %u  •  Correct %d",
                  static_cast<unsigned>(s_app.attempts.size() + 1), s_app.score_correct);
    label(lv_screen_active(), progress, 28, 74, 380, &lv_font_montserrat_16, kMuted);
    if (s_app.timed) {
        s_app.timer_label = label(lv_screen_active(), "Time", 258, 74, 150,
                                  &lv_font_montserrat_16, kBerryDark, LV_TEXT_ALIGN_RIGHT);
    } else {
        s_app.timer_label = nullptr;
    }
    char question[40];
    std::snprintf(question, sizeof(question), "%d x %d =", fact.factor, fact.multiplier);
    label(lv_screen_active(), question, 28, 128, 380, &lv_font_montserrat_28, kInk,
          LV_TEXT_ALIGN_CENTER);
    label(lv_screen_active(), s_app.answer.empty() ? "-" : s_app.answer.c_str(), 28, 190, 380,
          &lv_font_montserrat_28, kBlue, LV_TEXT_ALIGN_CENTER);
    if (s_app.feedback_visible) {
        char feedback[80];
        std::snprintf(feedback, sizeof(feedback), s_app.last_correct ? "Correct!" : "Try this fact again - %d",
                      fact.factor * fact.multiplier);
        label(lv_screen_active(), feedback, 28, 254, 380, &lv_font_montserrat_20,
              s_app.last_correct ? kTeal : kBerryDark, LV_TEXT_ALIGN_CENTER);
    }

    const int values[12] = {1, 2, 3, 4, 5, 6, 7, 8, 9, -2, 0, -1};
    const char *texts[12] = {"1", "2", "3", "4", "5", "6", "7", "8", "9",
                             LV_SYMBOL_BACKSPACE, "0", "Enter"};
    for (int index = 0; index < 12; ++index) {
        const int column = index % 3;
        const int row = index / 3;
        const bool enter_enabled = values[index] != -1 || !s_app.answer.empty();
        button(lv_screen_active(), texts[index], 438 + column * 116, 72 + row * 78, 102, 66,
               values[index] == -1 ? kBerry : kPaper, keypad_event, values[index],
               !s_app.feedback_visible && enter_enabled);
    }
    confirm_bar(s_app.feedback_visible ? "Next" : "Finish session", true,
                s_app.feedback_visible ? next_fact : finish_multiplication);
}

void render_multiplication_summary()
{
    top_nav("Session Summary", true);
    const int total = static_cast<int>(s_app.attempts.size());
    const int xp = buddy::domain::calculate_xp(s_app.score_correct, total);
    char headline[80];
    std::snprintf(headline, sizeof(headline), "%d of %d correct", s_app.score_correct, total);
    label(lv_screen_active(), headline, 60, 104, 680, &lv_font_montserrat_28, kInk,
          LV_TEXT_ALIGN_CENTER);
    char detail[140];
    const char *retention = !s_app.bootstrap.paired
                                ? "Demo result stays on this device only."
                                : s_app.storage_warning
                                      ? "Storage is full; this session remains recoverable. Sync to free space."
                                      : "Saved safely and waiting for exactly-once sync.";
    std::snprintf(detail, sizeof(detail), "Accuracy %d%%  •  XP pending sync: %d\n%s",
                  total == 0 ? 0 : s_app.score_correct * 100 / total, xp, retention);
    label(lv_screen_active(), detail, 100, 180, 600, &lv_font_montserrat_20, kMuted,
          LV_TEXT_ALIGN_CENTER);
    if (s_app.storage_warning) {
        confirm_bar("Retry save", true, finish_multiplication,
                    "Home", [](lv_event_t *) { navigate(Screen::kHome); }, kOrange);
    } else {
        confirm_bar("Practice again", true,
                    [](lv_event_t *) { navigate(Screen::kMultiplicationSetup); },
                    "Home", [](lv_event_t *) { navigate(Screen::kHome); });
    }
}

void load_flash_sections()
{
    s_app.flash_sections.clear();
    if (!s_app.bootstrap.paired || s_services.flash_section_count == nullptr ||
        s_services.flash_section == nullptr) {
        buddy_ui_flash_section_t demo{};
        std::snprintf(demo.id, sizeof(demo.id), "demo_week_1");
        std::snprintf(demo.title, sizeof(demo.title), "Week 1 Words");
        std::snprintf(demo.source, sizeof(demo.source), "Bundled demo");
        demo.card_count = 5;
        demo.pinned = true;
        s_app.flash_sections.push_back(demo);
        return;
    }
    const size_t count = std::min<size_t>(s_services.flash_section_count(s_services.context), 50);
    for (size_t index = 0; index < count; ++index) {
        buddy_ui_flash_section_t section{};
        if (s_services.flash_section(s_services.context, index, &section) &&
            section.card_count > 0 && section.card_count <= 100) {
            s_app.flash_sections.push_back(section);
        }
    }
}

bool load_flash_cards(size_t section_index)
{
    s_app.flash_cards.clear();
    if (section_index >= s_app.flash_sections.size()) return false;
    const buddy_ui_flash_section_t &section = s_app.flash_sections[section_index];
    if (!s_app.bootstrap.paired || s_services.flash_card == nullptr) {
        s_app.flash_cards = {
            {"demo_1", "vast", "very large", "The desert is vast."},
            {"demo_2", "benevolent", "kind and generous", "A benevolent neighbor helps."},
            {"demo_3", "orbit", "a path around an object", "Earth follows an orbit."},
            {"demo_4", "7 x 8", "56", "Seven groups of eight."},
            {"demo_5", "photosynthesis", "plants using light to make food", "photo = light"},
        };
        return true;
    }
    for (size_t index = 0; index < section.card_count; ++index) {
        buddy_ui_flash_card_t card{};
        if (!s_services.flash_card(s_services.context, section_index, index, &card)) return false;
        s_app.flash_cards.push_back({card.id, card.front, card.back, card.clue});
    }
    return !s_app.flash_cards.empty();
}

FlashSessionState current_flash_state()
{
    FlashSessionState state;
    state.client_attempt_id = s_app.flash_client_attempt_id;
    state.practice_set_id = s_app.flash_section_id;
    state.content_revision = s_app.flash_content_revision;
    state.seed = s_app.flash_seed;
    const uint64_t current = now_ms();
    state.elapsed_ms = s_app.flash_elapsed_offset_ms +
                       (current >= s_app.flash_started_ms ? current - s_app.flash_started_ms : 0);
    state.revealed = s_app.flash_round != nullptr && s_app.flash_round->revealed();
    state.reviews = s_app.flash_reviews;
    return state;
}

bool persist_flash_session()
{
    if (!s_app.bootstrap.paired || s_services.write_record == nullptr ||
        s_app.flash_client_attempt_id.empty()) {
        return true;
    }
    const std::string payload = buddy::domain::encode_flash_session(current_flash_state());
    const bool saved = s_services.write_record(s_services.context, kFlashSessionPath, 1,
                                                payload.data(), payload.size());
    s_app.storage_warning = !saved;
    return saved;
}

void remove_flash_session()
{
    if (s_services.remove_record != nullptr) {
        (void)s_services.remove_record(s_services.context, kFlashSessionPath);
    }
}

bool begin_flash_round(size_t section_index)
{
    if (section_index >= s_app.flash_sections.size() || !load_flash_cards(section_index)) return false;
    s_app.selected_flash_index = static_cast<int>(section_index);
    s_app.flash_section_id = s_app.flash_sections[section_index].id;
    s_app.flash_section_title = s_app.flash_sections[section_index].title;
    s_app.flash_content_revision = s_app.content_revision > 0
                                       ? s_app.content_revision
                                       : s_app.bootstrap.flash_content_revision;
    s_app.flash_seed = s_app.session_seed++;
    s_app.flash_reviews.clear();
    s_app.flash_elapsed_offset_ms = 0;
    s_app.flash_started_ms = now_ms();
    s_app.flash_card_started_ms = s_app.flash_started_ms;
    s_app.flash_session_saved = false;
    s_app.storage_warning = false;
    s_app.flash_client_attempt_id.clear();
    if (s_app.bootstrap.paired && s_services.new_event_id != nullptr) {
        char identifier[129]{};
        if (!s_services.new_event_id(s_services.context, "flash", identifier, sizeof(identifier))) {
            return false;
        }
        s_app.flash_client_attempt_id = identifier;
    }
    s_app.flash_round = std::make_unique<FlashRound>(s_app.flash_cards, s_app.flash_seed);
    (void)persist_flash_session();
    notify_activity_state();
    return true;
}

void start_flash_round(lv_event_t *event)
{
    const intptr_t raw = event == nullptr ? s_app.selected_flash_index
                                          : reinterpret_cast<intptr_t>(lv_event_get_user_data(event));
    if (raw >= 0 && begin_flash_round(static_cast<size_t>(raw))) navigate(Screen::kFlashStudy);
}

void render_empty_flash_library()
{
    const char *authoring_url = s_app.flash_authoring_url.empty()
                                   ? "https://buddyblocks.net/kid/"
                                   : s_app.flash_authoring_url.c_str();
    label(lv_screen_active(), "No downloaded flash cards yet", 70, 72, 660,
          &lv_font_montserrat_24, kInk, LV_TEXT_ALIGN_CENTER);
    lv_obj_t *qr = lv_qrcode_create(lv_screen_active());
    lv_qrcode_set_size(qr, 190);
    lv_qrcode_set_dark_color(qr, color(kInk));
    lv_qrcode_set_light_color(qr, color(kPaper));
    lv_qrcode_set_quiet_zone(qr, true);
    lv_qrcode_set_data(qr, authoring_url);
    lv_obj_set_pos(qr, 305, 112);
    label(lv_screen_active(), "Open My Flash Cards on the website, create a section, then sync.",
          80, 315, 640, &lv_font_montserrat_16, kMuted, LV_TEXT_ALIGN_CENTER);
    confirm_bar("Sync now", s_app.bootstrap.online, sync_action,
                "Continue offline", [](lv_event_t *) { navigate(Screen::kHome); }, kTeal);
}

void render_flash_library()
{
    top_nav("My Flash Cards", true);
    load_flash_sections();
    if (s_app.bootstrap.paired && s_app.flash_sections.empty()) {
        render_empty_flash_library();
        return;
    }
    label(lv_screen_active(), s_app.bootstrap.paired ? "Downloaded and ready offline" : "Demo library",
          24, 68, 500, &lv_font_montserrat_20, kInk);
    lv_obj_t *list = lv_obj_create(lv_screen_active());
    lv_obj_set_pos(list, 16, 104);
    lv_obj_set_size(list, 768, 286);
    lv_obj_set_style_bg_opa(list, LV_OPA_TRANSP, LV_PART_MAIN);
    lv_obj_set_style_border_width(list, 0, LV_PART_MAIN);
    lv_obj_set_style_pad_all(list, 0, LV_PART_MAIN);
    lv_obj_set_scroll_dir(list, LV_DIR_VER);
    for (size_t index = 0; index < s_app.flash_sections.size(); ++index) {
        const auto &section = s_app.flash_sections[index];
        std::string title = section.pinned ? LV_SYMBOL_OK "  " : "";
        title += section.title;
        lv_obj_t *row = button(list, title.c_str(), 4, static_cast<int>(index) * 92, 744, 84,
                               kPaper, start_flash_round, static_cast<intptr_t>(index));
        char detail[260];
        std::snprintf(detail, sizeof(detail), "%u cards  •  %s  •  Ready offline",
                      static_cast<unsigned>(section.card_count),
                      section.source[0] == '\0' ? "My Flash Cards" : section.source);
        label(row, detail, 20, 52, 700, &lv_font_montserrat_16, kMuted);
    }
    confirm_bar("Choose a section above", false, nullptr,
                "Home", [](lv_event_t *) { navigate(Screen::kHome); });
}

const FlashCard *flash_card_by_id(const std::string &id)
{
    const auto found = std::find_if(s_app.flash_cards.begin(), s_app.flash_cards.end(),
                                    [&](const FlashCard &card) { return card.id == id; });
    return found == s_app.flash_cards.end() ? nullptr : &*found;
}

std::string flash_card_fingerprint(const FlashCard &card)
{
    const std::string input = card.id + "\n" + card.front + "\n" + card.back + "\n" + card.clue;
    char digest[65]{};
    if (s_services.sha256_hex != nullptr &&
        s_services.sha256_hex(s_services.context, input.data(), input.size(), digest)) {
        return digest;
    }
    return std::string(64, '0');
}

void finish_flash_round(lv_event_t *)
{
    if (!s_app.flash_round || s_app.flash_session_saved) {
        navigate(Screen::kFlashSummary);
        return;
    }
    bool retained = true;
    if (s_app.bootstrap.paired && !s_app.flash_client_attempt_id.empty() &&
        s_services.enqueue_event != nullptr) {
        const auto summary = s_app.flash_round->summary();
        const FlashSessionState state = current_flash_state();
        std::unordered_map<std::string, unsigned> shown;
        std::ostringstream json;
        json << "{\"eventType\":\"flash_card_session\",\"body\":{"
             << "\"clientAttemptId\":\"" << s_app.flash_client_attempt_id << "\","
             << "\"practiceSetId\":\"" << s_app.flash_section_id << "\","
             << "\"contentRevision\":" << s_app.flash_content_revision << ','
             << "\"durationSeconds\":" << std::min<uint64_t>(state.elapsed_ms / 1000, 86400)
             << ",\"uniqueCards\":" << summary.unique_studied
             << ",\"firstPassGotIt\":" << summary.first_pass_got_it
             << ",\"totalReviews\":" << summary.total_reviews << ",\"reviews\":[";
        bool first = true;
        for (const FlashSessionReview &review : s_app.flash_reviews) {
            const FlashCard *card = flash_card_by_id(review.card_id);
            if (card == nullptr) continue;
            const unsigned shown_count = ++shown[review.card_id];
            if (!first) json << ',';
            first = false;
            json << "{\"cardId\":\"" << review.card_id << "\","
                 << "\"cardFingerprint\":\"" << flash_card_fingerprint(*card) << "\","
                 << "\"rating\":\"" << (review.got_it ? "got_it" : "again") << "\","
                 << "\"shownCount\":" << shown_count << ",\"responseMs\":"
                 << std::min<uint32_t>(review.response_ms, 600000) << '}';
        }
        json << "]}}";
        const std::string payload = json.str();
        retained = s_services.enqueue_event(s_services.context,
                                             s_app.flash_client_attempt_id.c_str(),
                                             payload.data(), payload.size());
    }
    if (retained) {
        s_app.flash_session_saved = true;
        s_app.storage_warning = false;
        if (s_app.bootstrap.paired && !s_app.flash_client_attempt_id.empty()) {
            ++s_app.bootstrap.queued_events;
        }
        remove_flash_session();
    } else {
        s_app.storage_warning = true;
        (void)persist_flash_session();
    }
    notify_activity_state();
    navigate(Screen::kFlashSummary);
}

bool restore_flash_session(const char *json)
{
    if (json == nullptr) return false;
    const auto restored = buddy::domain::decode_flash_session(json);
    if (!restored.has_value()) return false;
    load_flash_sections();
    const auto section = std::find_if(
        s_app.flash_sections.begin(), s_app.flash_sections.end(),
        [&](const buddy_ui_flash_section_t &candidate) {
            return restored->practice_set_id == candidate.id;
        });
    if (section == s_app.flash_sections.end()) return false;
    const size_t section_index = static_cast<size_t>(section - s_app.flash_sections.begin());
    if (!load_flash_cards(section_index)) return false;
    s_app.selected_flash_index = static_cast<int>(section_index);
    s_app.flash_section_id = restored->practice_set_id;
    s_app.flash_section_title = section->title;
    s_app.flash_client_attempt_id = restored->client_attempt_id;
    s_app.flash_content_revision = restored->content_revision;
    s_app.flash_seed = restored->seed;
    s_app.session_seed = std::max(s_app.session_seed, restored->seed + 1);
    s_app.flash_reviews.clear();
    s_app.flash_round = std::make_unique<FlashRound>(s_app.flash_cards, restored->seed);
    for (const FlashSessionReview &review : restored->reviews) {
        const FlashCard *current = s_app.flash_round->current();
        if (current == nullptr || current->id != review.card_id) return false;
        s_app.flash_round->reveal();
        if (!s_app.flash_round->rate(review.got_it)) return false;
        s_app.flash_reviews.push_back(review);
    }
    if (restored->revealed && s_app.flash_round->current() != nullptr) {
        s_app.flash_round->reveal();
    }
    s_app.flash_elapsed_offset_ms = restored->elapsed_ms;
    s_app.flash_started_ms = now_ms();
    s_app.flash_card_started_ms = s_app.flash_started_ms;
    s_app.flash_session_saved = false;
    return true;
}

void flash_action(lv_event_t *event)
{
    if (!s_app.flash_round) {
        return;
    }
    const int value = static_cast<int>(reinterpret_cast<intptr_t>(lv_event_get_user_data(event)));
    if (value == 0) {
        s_app.flash_round->reveal();
        (void)persist_flash_session();
    } else {
        const FlashCard *current = s_app.flash_round->current();
        const uint64_t current_ms = now_ms();
        if (current == nullptr || !s_app.flash_round->rate(value > 0)) return;
        s_app.flash_reviews.push_back(
            {current->id, value > 0,
             static_cast<uint32_t>(std::min<uint64_t>(
                 current_ms >= s_app.flash_card_started_ms
                     ? current_ms - s_app.flash_card_started_ms
                     : 0,
                 600000))});
        s_app.flash_card_started_ms = current_ms;
        (void)persist_flash_session();
        if (s_app.flash_round->finished() || s_app.flash_round->current() == nullptr) {
            finish_flash_round(nullptr);
            return;
        }
    }
    navigate(Screen::kFlashStudy);
}

void render_flash_study()
{
    lv_obj_t *top = top_nav(s_app.flash_section_title.empty() ? "Study Round"
                                                              : s_app.flash_section_title.c_str(),
                            true);
    button(top, "Finish", 634, 4, 92, 48, kReward, finish_flash_round);
    if (!s_app.flash_round || s_app.flash_round->current() == nullptr) {
        navigate(Screen::kFlashSummary);
        return;
    }
    const FlashCard *card = s_app.flash_round->current();
    lv_obj_t *panel = lv_obj_create(lv_screen_active());
    lv_obj_set_pos(panel, 64, 78);
    lv_obj_set_size(panel, 672, 292);
    lv_obj_set_style_radius(panel, 22, LV_PART_MAIN);
    lv_obj_set_style_bg_color(panel, color(kPaper), LV_PART_MAIN);
    lv_obj_set_style_border_color(panel, color(kBlue), LV_PART_MAIN);
    lv_obj_set_style_border_width(panel, 3, LV_PART_MAIN);
    lv_obj_remove_flag(panel, LV_OBJ_FLAG_SCROLLABLE);
    label(panel, card->front.c_str(), 30, 32, 612, &lv_font_montserrat_28, kInk,
          LV_TEXT_ALIGN_CENTER);
    if (s_app.flash_round->revealed()) {
        label(panel, card->back.c_str(), 34, 118, 604, &lv_font_montserrat_24, kBerryDark,
              LV_TEXT_ALIGN_CENTER);
        if (!card->clue.empty()) {
            label(panel, card->clue.c_str(), 34, 200, 604, &lv_font_montserrat_20, kMuted,
                  LV_TEXT_ALIGN_CENTER);
        }
        confirm_bar("Got it", true, nullptr, "Again", nullptr, kTeal);
        lv_obj_t *bar = lv_obj_get_child(lv_screen_active(), -1);
        lv_obj_t *again = lv_obj_get_child(bar, 0);
        lv_obj_t *got_it = lv_obj_get_child(bar, 1);
        lv_obj_add_event_cb(again, flash_action, LV_EVENT_CLICKED,
                            reinterpret_cast<void *>(static_cast<intptr_t>(-1)));
        lv_obj_add_event_cb(got_it, flash_action, LV_EVENT_CLICKED, reinterpret_cast<void *>(1));
    } else {
        confirm_bar("Reveal", true, flash_action);
    }
}

void render_flash_summary()
{
    top_nav("Round Complete", true);
    const auto summary = s_app.flash_round ? s_app.flash_round->summary()
                                           : buddy::domain::FlashRoundSummary{};
    char value[220];
    const uint64_t elapsed = current_flash_state().elapsed_ms / 1000;
    std::snprintf(value, sizeof(value),
                  "%u unique cards studied\n%u first-pass Got it\n%u total reviews  •  %" PRIu64 " sec",
                  static_cast<unsigned>(summary.unique_studied),
                  static_cast<unsigned>(summary.first_pass_got_it),
                  static_cast<unsigned>(summary.total_reviews), elapsed);
    label(lv_screen_active(), value, 100, 115, 600, &lv_font_montserrat_24, kInk,
          LV_TEXT_ALIGN_CENTER);
    if (s_app.storage_warning) {
        label(lv_screen_active(),
              "Storage is full; this round remains recoverable until sync frees space.",
              80, 310, 640, &lv_font_montserrat_16, kOrange, LV_TEXT_ALIGN_CENTER);
    }
    if (s_app.storage_warning) {
        confirm_bar("Retry save", true, finish_flash_round,
                    "Library", [](lv_event_t *) { navigate(Screen::kFlashLibrary); }, kOrange);
    } else {
        confirm_bar("Study again", true,
                    [](lv_event_t *) {
                        if (s_app.selected_flash_index >= 0 &&
                            begin_flash_round(static_cast<size_t>(s_app.selected_flash_index))) {
                            navigate(Screen::kFlashStudy);
                        }
                    },
                    "Library", [](lv_event_t *) { navigate(Screen::kFlashLibrary); });
    }
}

void settings_event(lv_event_t *event)
{
    const intptr_t value = reinterpret_cast<intptr_t>(lv_event_get_user_data(event));
    if (value == 1) navigate(Screen::kWifi);
    if (value == 2) home_sync_action(event);
    if (value == 3) navigate(Screen::kPreferences);
    if (value == 4) navigate(Screen::kPairing);
    if (value == 5) {
        firmware_check_action(event);
    }
    if (value == 6) navigate(Screen::kDiagnostics);
    if (value == 7) navigate(Screen::kHardwareProof);
    if (value == 8) navigate(Screen::kFactoryReset);
}

const char *wifi_state_text()
{
    switch (s_app.wifi_state) {
    case 2: return "Scanning...";
    case 3: return "Connecting...";
    case 4: return "Connected";
    case 5: return "Wrong password - try again";
    case 6: return "Connected to Wi-Fi, but no internet";
    case 7: return "Captive portal detected (not supported)";
    case 8: return "Could not connect";
    default: return "Offline";
    }
}

const char *wifi_security_text(int security)
{
    switch (security) {
    case 0: return "Open";
    case 2: return "WPA3";
    case 3: return "Unsupported security";
    default: return "WPA2/WPA3";
    }
}

const char *wifi_signal_text(int signal)
{
    if (signal >= -55) return "Excellent";
    if (signal >= -67) return "Good";
    if (signal >= -75) return "Fair";
    return "Weak";
}

void load_wifi_networks()
{
    s_app.wifi_networks.clear();
    if (s_services.wifi_network_count == nullptr || s_services.wifi_network == nullptr) return;
    const size_t count = std::min<size_t>(s_services.wifi_network_count(s_services.context), 20);
    for (size_t index = 0; index < count; ++index) {
        buddy_ui_wifi_network_t network{};
        if (s_services.wifi_network(s_services.context, index, &network)) {
            s_app.wifi_networks.push_back(network);
        }
    }
}

void wifi_row_event(lv_event_t *event)
{
    const intptr_t index = reinterpret_cast<intptr_t>(lv_event_get_user_data(event));
    if (index < 0 || static_cast<size_t>(index) >= s_app.wifi_networks.size()) return;
    s_app.selected_wifi_index = static_cast<int>(index);
    s_app.hidden_wifi = false;
    navigate(Screen::kWifiNetwork);
}

void hidden_wifi_event(lv_event_t *)
{
    s_app.selected_wifi_index = -1;
    s_app.hidden_wifi = true;
    navigate(Screen::kWifiNetwork);
}

void refresh_wifi(lv_event_t *)
{
    if (s_services.wifi_scan != nullptr) (void)s_services.wifi_scan(s_services.context);
}

void wifi_focus_event(lv_event_t *event)
{
    s_app.wifi_active_input = static_cast<lv_obj_t *>(lv_event_get_target(event));
}

const char *wifi_key_text(size_t index)
{
    static constexpr std::array<const char *, 26> lower{
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d",
        "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"};
    static constexpr std::array<const char *, 26> upper{
        "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D",
        "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"};
    static constexpr std::array<const char *, 26> symbols{
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "@", "#", "$",
        "%", "&", "*", "+", "-", "_", ".", ",", "!", "?", "/", ":", ";"};
    return s_app.wifi_symbols ? symbols[index]
                              : s_app.wifi_shift ? upper[index] : lower[index];
}

void update_wifi_keyboard_labels()
{
    for (size_t index = 0; index < s_app.wifi_key_buttons.size(); ++index) {
        if (s_app.wifi_key_buttons[index] != nullptr) {
            lv_obj_t *text = lv_obj_get_child(s_app.wifi_key_buttons[index], 0);
            lv_label_set_text(text, wifi_key_text(index));
        }
    }
}

void wifi_keyboard_event(lv_event_t *event)
{
    if (s_app.wifi_active_input == nullptr) return;
    const intptr_t key = reinterpret_cast<intptr_t>(lv_event_get_user_data(event));
    if (key >= 0 && key < 26) {
        lv_textarea_add_text(s_app.wifi_active_input, wifi_key_text(static_cast<size_t>(key)));
    } else if (key == 100) {
        s_app.wifi_shift = !s_app.wifi_shift;
        s_app.wifi_symbols = false;
        update_wifi_keyboard_labels();
    } else if (key == 101) {
        lv_textarea_delete_char(s_app.wifi_active_input);
    } else if (key == 102) {
        lv_textarea_add_text(s_app.wifi_active_input, " ");
    } else if (key == 103) {
        s_app.wifi_symbols = !s_app.wifi_symbols;
        s_app.wifi_shift = false;
        update_wifi_keyboard_labels();
    }
}

void build_wifi_keyboard(int top)
{
    s_app.wifi_key_buttons.fill(nullptr);
    s_app.wifi_keyboard = lv_obj_create(lv_screen_active());
    lv_obj_set_pos(s_app.wifi_keyboard, 8, top);
    lv_obj_set_size(s_app.wifi_keyboard, 784, kConfirmTop - top - 4);
    lv_obj_set_style_bg_opa(s_app.wifi_keyboard, LV_OPA_TRANSP, LV_PART_MAIN);
    lv_obj_set_style_border_width(s_app.wifi_keyboard, 0, LV_PART_MAIN);
    lv_obj_set_style_pad_all(s_app.wifi_keyboard, 0, LV_PART_MAIN);
    lv_obj_remove_flag(s_app.wifi_keyboard, LV_OBJ_FLAG_SCROLLABLE);
    constexpr int key_height = 48;
    for (int index = 0; index < 10; ++index) {
        s_app.wifi_key_buttons[static_cast<size_t>(index)] =
            button(s_app.wifi_keyboard, wifi_key_text(static_cast<size_t>(index)),
                   8 + index * 76, 0, 70, key_height, kPaper, wifi_keyboard_event, index);
    }
    for (int index = 0; index < 9; ++index) {
        const int key = index + 10;
        s_app.wifi_key_buttons[static_cast<size_t>(key)] =
            button(s_app.wifi_keyboard, wifi_key_text(static_cast<size_t>(key)),
                   37 + index * 78, 52, 72, key_height, kPaper, wifi_keyboard_event, key);
    }
    button(s_app.wifi_keyboard, "Shift", 8, 104, 88, key_height, kReward,
           wifi_keyboard_event, 100);
    for (int index = 0; index < 7; ++index) {
        const int key = index + 19;
        s_app.wifi_key_buttons[static_cast<size_t>(key)] =
            button(s_app.wifi_keyboard, wifi_key_text(static_cast<size_t>(key)),
                   103 + index * 76, 104, 70, key_height, kPaper, wifi_keyboard_event, key);
    }
    button(s_app.wifi_keyboard, LV_SYMBOL_BACKSPACE, 641, 104, 119, key_height, kReward,
           wifi_keyboard_event, 101);
    button(s_app.wifi_keyboard, "123 / ABC", 8, 156, 150, key_height, kPaper,
           wifi_keyboard_event, 103);
    button(s_app.wifi_keyboard, "Space", 166, 156, 594, key_height, kPaper,
           wifi_keyboard_event, 102);
}

void wifi_reveal_event(lv_event_t *event)
{
    if (s_app.wifi_password_input == nullptr) return;
    const lv_obj_t *checkbox = static_cast<lv_obj_t *>(lv_event_get_target(event));
    lv_textarea_set_password_mode(s_app.wifi_password_input,
                                  !lv_obj_has_state(checkbox, LV_STATE_CHECKED));
}

void connect_wifi(lv_event_t *)
{
    if (s_services.wifi_connect == nullptr || s_app.wifi_password_input == nullptr) return;
    const char *ssid = nullptr;
    if (s_app.hidden_wifi) {
        if (s_app.wifi_ssid_input == nullptr) return;
        ssid = lv_textarea_get_text(s_app.wifi_ssid_input);
    } else if (s_app.selected_wifi_index >= 0 &&
               static_cast<size_t>(s_app.selected_wifi_index) < s_app.wifi_networks.size()) {
        ssid = s_app.wifi_networks[static_cast<size_t>(s_app.selected_wifi_index)].ssid;
    }
    const char *password = lv_textarea_get_text(s_app.wifi_password_input);
    if (ssid == nullptr || ssid[0] == '\0') return;
    if (s_services.wifi_connect(s_services.context, ssid, password, true, s_app.hidden_wifi)) {
        navigate(Screen::kWifi);
    }
}

void forget_wifi(lv_event_t *)
{
    if (s_services.wifi_forget == nullptr || s_app.selected_wifi_index < 0 ||
        static_cast<size_t>(s_app.selected_wifi_index) >= s_app.wifi_networks.size()) {
        return;
    }
    (void)s_services.wifi_forget(
        s_services.context, s_app.wifi_networks[static_cast<size_t>(s_app.selected_wifi_index)].ssid);
    navigate(Screen::kWifi);
}

void confirm_forget_wifi(lv_event_t *) { navigate(Screen::kWifiForget); }

void render_wifi_forget()
{
    top_nav("Forget Wi-Fi Network", true);
    const buddy_ui_wifi_network_t *network =
        s_app.selected_wifi_index >= 0 &&
                static_cast<size_t>(s_app.selected_wifi_index) < s_app.wifi_networks.size()
            ? &s_app.wifi_networks[static_cast<size_t>(s_app.selected_wifi_index)]
            : nullptr;
    const char *ssid = network == nullptr ? "this saved network" : network->ssid;
    label(lv_screen_active(), "Forget saved network?", 70, 105, 660,
          &lv_font_montserrat_28, kInk, LV_TEXT_ALIGN_CENTER);
    std::string explanation = "The saved password for " + std::string(ssid) +
                              " will be erased. You can add it again later.";
    label(lv_screen_active(), explanation.c_str(), 100, 185, 600,
          &lv_font_montserrat_20, kMuted, LV_TEXT_ALIGN_CENTER);
    confirm_bar("Forget network", network != nullptr && network->saved, forget_wifi,
                "Cancel", [](lv_event_t *) { navigate(Screen::kWifi); }, kOrange);
}

void render_settings()
{
    top_nav("Settings", true);
    const char *items[] = {LV_SYMBOL_WIFI "  Wi-Fi", LV_SYMBOL_REFRESH "  Sync now",
                           LV_SYMBOL_SETTINGS "  Display",
                           LV_SYMBOL_HOME "  Device & pairing",
                           LV_SYMBOL_DOWNLOAD "  Software update",
                           LV_SYMBOL_LIST "  Diagnostics",
                           LV_SYMBOL_EYE_OPEN "  Hardware proof",
                           LV_SYMBOL_TRASH "  Factory reset"};
    for (int index = 0; index < 8; ++index) {
        option_tile(lv_screen_active(), items[index], 24 + (index % 2) * 388,
                    66 + (index / 2) * 80, 364, 68, false, settings_event, index + 1);
    }
}

void preference_event(lv_event_t *event)
{
    const intptr_t value = reinterpret_cast<intptr_t>(lv_event_get_user_data(event));
    if (value >= 40 && value <= 100) {
        if (s_services.set_brightness == nullptr ||
            s_services.set_brightness(s_services.context, static_cast<uint8_t>(value))) {
            s_app.brightness_percent = static_cast<uint8_t>(value);
        }
    } else if (value >= 200 && value <= 210) {
        const uint8_t minutes = static_cast<uint8_t>(value - 200);
        if (s_services.set_screen_timeout == nullptr ||
            s_services.set_screen_timeout(s_services.context, minutes)) {
            s_app.screen_timeout_minutes = minutes;
        }
    } else if (value == 300) {
        const bool next = !s_app.reduced_motion;
        if (s_services.set_reduced_motion == nullptr ||
            s_services.set_reduced_motion(s_services.context, next)) {
            s_app.reduced_motion = next;
        }
    }
    navigate(Screen::kPreferences);
}

void render_preferences()
{
    top_nav("Display", true);
    label(lv_screen_active(), "Brightness", 24, 70, 752, &lv_font_montserrat_20, kInk);
    constexpr std::array<int, 4> brightness{40, 60, 80, 100};
    for (size_t index = 0; index < brightness.size(); ++index) {
        char text[12];
        std::snprintf(text, sizeof(text), "%d%%", brightness[index]);
        option_tile(lv_screen_active(), text, 24 + static_cast<int>(index) * 194, 104, 170, 66,
                    s_app.brightness_percent == brightness[index], preference_event,
                    brightness[index]);
    }
    label(lv_screen_active(), "Turn screen off after inactivity", 24, 196, 752,
          &lv_font_montserrat_20, kInk);
    constexpr std::array<int, 4> timeouts{0, 2, 5, 10};
    constexpr std::array<const char *, 4> timeout_names{"Never", "2 min", "5 min", "10 min"};
    for (size_t index = 0; index < timeouts.size(); ++index) {
        option_tile(lv_screen_active(), timeout_names[index], 24 + static_cast<int>(index) * 194,
                    230, 170, 66, s_app.screen_timeout_minutes == timeouts[index],
                    preference_event, 200 + timeouts[index]);
    }
    option_tile(lv_screen_active(), "Reduced motion", 24, 326, 752, 62,
                s_app.reduced_motion, preference_event, 300);
    confirm_bar("Done", true, [](lv_event_t *) { navigate(Screen::kSettings); });
}

void factory_reset_action(lv_event_t *)
{
    if (s_app.factory_reset_input == nullptr ||
        std::string(lv_textarea_get_text(s_app.factory_reset_input)) != "RESET") {
        s_app.factory_reset_error = "Type RESET exactly to continue.";
        navigate(Screen::kFactoryReset);
        return;
    }
    if (s_services.factory_reset == nullptr ||
        !s_services.factory_reset(s_services.context)) {
        s_app.factory_reset_error = "Reset could not start. Please restart and try again.";
        navigate(Screen::kFactoryReset);
    }
}

void render_factory_reset()
{
    top_nav("Factory Reset", true);
    label(lv_screen_active(),
          "This erases Wi-Fi, pairing, child content, queued activity, saved sessions, and diagnostics.\nIt does not change Secure Boot or hardware security settings.",
          34, 62, 732, &lv_font_montserrat_16, kOrange, LV_TEXT_ALIGN_CENTER);
    label(lv_screen_active(), "Type RESET", 24, 126, 140, &lv_font_montserrat_16, kInk);
    s_app.factory_reset_input = lv_textarea_create(lv_screen_active());
    lv_obj_set_pos(s_app.factory_reset_input, 160, 116);
    lv_obj_set_size(s_app.factory_reset_input, 616, 48);
    lv_textarea_set_one_line(s_app.factory_reset_input, true);
    lv_textarea_set_max_length(s_app.factory_reset_input, 5);
    lv_obj_remove_flag(s_app.factory_reset_input, LV_OBJ_FLAG_SCROLL_ON_FOCUS);
    s_app.wifi_active_input = s_app.factory_reset_input;
    build_wifi_keyboard(170);
    if (!s_app.factory_reset_error.empty()) {
        label(lv_screen_active(), s_app.factory_reset_error.c_str(), 160, 370, 616,
              &lv_font_montserrat_16, kOrange, LV_TEXT_ALIGN_CENTER);
    }
    confirm_bar("Erase and restart", true, factory_reset_action, "Cancel",
                [](lv_event_t *) { navigate(Screen::kSettings); }, kOrange);
}

void ota_install_action(lv_event_t *)
{
    if (s_services.request_ota_install != nullptr) {
        (void)s_services.request_ota_install(s_services.context);
    }
}

void ota_reboot_action(lv_event_t *)
{
    if (s_services.request_reboot != nullptr) {
        (void)s_services.request_reboot(s_services.context);
    }
}

void render_update()
{
    top_nav("Software Update", true);
    const bool available = s_app.ota_state == 1 || s_app.ota_state == 2 || s_app.ota_state == 6;
    const bool working = s_app.ota_state == 3 || s_app.ota_state == 4;
    const bool reboot_ready = s_app.ota_state == 5;
    const char *headline = s_app.firmware_checking
                               ? "Checking for updates..."
                               : reboot_ready
                               ? "Update verified and ready"
                               : working ? (s_app.ota_state == 3 ? "Downloading securely"
                                                                 : "Verifying image")
                                         : available ? "Update available"
                                         : !s_app.bootstrap.online
                                             ? "Connect to check for updates"
                                             : "This board is up to date";
    label(lv_screen_active(), headline, 60, 80, 680, &lv_font_montserrat_28,
          reboot_ready ? kTeal : s_app.ota_mandatory ? kOrange : kInk, LV_TEXT_ALIGN_CENTER);
    char versions[180];
    if (s_app.ota_version.empty()) {
        std::snprintf(versions, sizeof(versions), "Installed firmware: %s",
                      s_app.firmware_version.c_str());
    } else if (available || working || reboot_ready) {
        std::snprintf(versions, sizeof(versions),
                      "Available: %s  •  Minimum allowed: %s%s",
                      s_app.ota_version.c_str(), s_app.ota_minimum_version.c_str(),
                      s_app.ota_mandatory ? "  •  Required" : "");
    } else {
        std::snprintf(versions, sizeof(versions),
                      "Installed: %s  •  Current release: %s",
                      s_app.firmware_version.c_str(), s_app.ota_version.c_str());
    }
    label(lv_screen_active(), versions, 50, 132, 700, &lv_font_montserrat_20, kMuted,
          LV_TEXT_ALIGN_CENTER);
    if (working || reboot_ready) {
        lv_obj_t *progress = lv_bar_create(lv_screen_active());
        lv_obj_set_pos(progress, 84, 196);
        lv_obj_set_size(progress, 632, 30);
        lv_bar_set_range(progress, 0, 1000);
        const int value = s_app.ota_size == 0
                              ? (s_app.ota_state == 4 || reboot_ready ? 1000 : 0)
                              : static_cast<int>(std::min<size_t>(
                                    1000, s_app.ota_downloaded * 1000 / s_app.ota_size));
        lv_bar_set_value(progress, value, LV_ANIM_OFF);
        char bytes[100];
        std::snprintf(bytes, sizeof(bytes), "%u / %u KiB",
                      static_cast<unsigned>(s_app.ota_downloaded / 1024),
                      static_cast<unsigned>(s_app.ota_size / 1024));
        label(lv_screen_active(), bytes, 84, 238, 632, &lv_font_montserrat_16, kMuted,
              LV_TEXT_ALIGN_CENTER);
    } else if (!s_app.ota_release_notes.empty()) {
        label(lv_screen_active(), s_app.ota_release_notes.c_str(), 76, 190, 648,
              &lv_font_montserrat_20, kInk, LV_TEXT_ALIGN_CENTER);
    }
    if (!s_app.ota_message.empty()) {
        label(lv_screen_active(), s_app.ota_message.c_str(), 76, 294, 648,
              &lv_font_montserrat_16, s_app.ota_state == 6 ? kOrange : kMuted,
              LV_TEXT_ALIGN_CENTER);
    } else if (available) {
        label(lv_screen_active(),
              "Keep stable USB power connected. Learning data stays in its own partition.",
              76, 294, 648, &lv_font_montserrat_16, kMuted, LV_TEXT_ALIGN_CENTER);
    }
    if (s_app.firmware_checking) {
        confirm_bar("Checking securely", false, nullptr,
                    "Back", [](lv_event_t *) { navigate(Screen::kSettings); });
    } else if (reboot_ready) {
        confirm_bar("Restart into update", true, ota_reboot_action, "Later",
                    [](lv_event_t *) { navigate(Screen::kSettings); }, kTeal);
    } else if (available) {
        confirm_bar(s_app.ota_state == 6 ? "Retry update" : "Download and install", true,
                    ota_install_action, "Back", [](lv_event_t *) { navigate(Screen::kSettings); },
                    s_app.ota_mandatory ? kOrange : kBerry);
    } else {
        if (working) {
            confirm_bar("Update in progress", false, nullptr);
        } else if (!s_app.bootstrap.online) {
            confirm_bar("Open Wi-Fi", true,
                        [](lv_event_t *) { navigate(Screen::kWifi); },
                        "Back", [](lv_event_t *) { navigate(Screen::kSettings); });
        } else {
            confirm_bar("Check again", true, firmware_check_action,
                        "Back", [](lv_event_t *) { navigate(Screen::kSettings); });
        }
    }
}

void pairing_action(lv_event_t *)
{
    if (s_services.request_pairing != nullptr) {
        (void)s_services.request_pairing(s_services.context);
    }
}

void sync_action(lv_event_t *)
{
    if (s_services.request_sync != nullptr) (void)s_services.request_sync(s_services.context);
}

void home_sync_action(lv_event_t *)
{
    if (!s_app.bootstrap.online) {
        navigate(Screen::kWifi);
        return;
    }
    if (s_services.request_sync != nullptr &&
        s_services.request_sync(s_services.context)) {
        // Show request-in-flight state without falsifying the last successful
        // sync timestamp. The sync service replaces this state on completion.
        s_app.device_state = 3;
    }
    navigate(Screen::kHome);
}

void firmware_check_action(lv_event_t *)
{
    s_app.firmware_checking = false;
    if (s_app.bootstrap.online && s_services.request_firmware_check != nullptr) {
        s_app.firmware_checking =
            s_services.request_firmware_check(s_services.context);
    }
    navigate(Screen::kUpdate);
}

void render_pairing()
{
    top_nav("Pair Buddy Board", true);
    if (s_app.bootstrap.paired) {
        const bool syncing = s_app.device_state == 3;
        const bool ready = s_app.device_state == 4;
        label(lv_screen_active(),
              syncing ? LV_SYMBOL_REFRESH "  Pairing confirmed - syncing..."
                      : ready ? LV_SYMBOL_OK "  Paired and ready"
                              : LV_SYMBOL_WARNING "  Paired - sync needs attention",
              70, 104, 660, &lv_font_montserrat_28,
              ready ? kTeal : syncing ? kBlue : kOrange, LV_TEXT_ALIGN_CENTER);
        const std::string identity = s_app.device_name + "  •  Learning profile: " +
                                     s_app.child_name;
        label(lv_screen_active(), identity.c_str(), 70, 175, 660, &lv_font_montserrat_24, kInk,
              LV_TEXT_ALIGN_CENTER);
        char details[180];
        std::snprintf(details, sizeof(details), "Content revision %u • %u queued event%s",
                      static_cast<unsigned>(s_app.content_revision),
                      static_cast<unsigned>(s_app.bootstrap.queued_events),
                      s_app.bootstrap.queued_events == 1 ? "" : "s");
        label(lv_screen_active(), details, 70, 235, 660, &lv_font_montserrat_20, kMuted,
              LV_TEXT_ALIGN_CENTER);
        if (!s_app.device_error.empty() && !syncing && !ready) {
            label(lv_screen_active(), s_app.device_error.c_str(), 70, 285, 660,
                  &lv_font_montserrat_16, kOrange, LV_TEXT_ALIGN_CENTER);
        }
        if (syncing) {
            confirm_bar("Initial sync in progress", false, nullptr,
                        "Continue offline", [](lv_event_t *) { navigate(Screen::kHome); });
        } else {
            confirm_bar("Sync now", s_app.bootstrap.online, sync_action,
                        ready ? "Done" : "Continue offline",
                        [](lv_event_t *) { navigate(Screen::kHome); });
        }
        return;
    }
    if (!s_app.pairing_code.empty() && !s_app.claim_url.empty()) {
        lv_obj_t *qr = lv_qrcode_create(lv_screen_active());
        lv_qrcode_set_size(qr, 230);
        lv_qrcode_set_dark_color(qr, color(kInk));
        lv_qrcode_set_light_color(qr, color(kPaper));
        lv_qrcode_set_quiet_zone(qr, true);
        lv_qrcode_set_data(qr, s_app.claim_url.c_str());
        lv_obj_set_pos(qr, 36, 86);
        label(lv_screen_active(), "Open the parent page or scan:", 310, 90, 450,
              &lv_font_montserrat_20, kMuted);
        label(lv_screen_active(), s_app.pairing_code.c_str(), 310, 135, 450,
              &lv_font_montserrat_28, kBerry, LV_TEXT_ALIGN_CENTER);
        label(lv_screen_active(), s_app.claim_url.c_str(), 310, 205, 450,
              &lv_font_montserrat_16, kInk, LV_TEXT_ALIGN_CENTER);
        label(lv_screen_active(), "Waiting for a parent to choose a child...", 310, 300, 450,
              &lv_font_montserrat_20, kMuted, LV_TEXT_ALIGN_CENTER);
        confirm_bar("Generate a new code", s_app.bootstrap.online, pairing_action,
                    "Continue offline", [](lv_event_t *) { navigate(Screen::kHome); });
        return;
    }
    label(lv_screen_active(), "Pairing requires a parent", 70, 105, 660,
          &lv_font_montserrat_28, kInk, LV_TEXT_ALIGN_CENTER);
    label(lv_screen_active(),
          "Connect Wi-Fi, generate a short-lived code, then claim it from the parent dashboard.\nNo parent password or browser cookie is stored on this board.",
          70, 175, 660, &lv_font_montserrat_20, kMuted, LV_TEXT_ALIGN_CENTER);
    if (!s_app.device_error.empty()) {
        label(lv_screen_active(), s_app.device_error.c_str(), 70, 292, 660,
              &lv_font_montserrat_16, kOrange, LV_TEXT_ALIGN_CENTER);
    }
    confirm_bar("Generate pairing code", s_app.bootstrap.online, pairing_action,
                "Continue offline", [](lv_event_t *) { navigate(Screen::kHome); });
}

void render_wifi()
{
    top_nav("Wi-Fi", true);
    load_wifi_networks();
    char heading[160];
    std::snprintf(heading, sizeof(heading), "%s%s%s", wifi_state_text(),
                  s_app.wifi_ssid.empty() ? "" : " • ",
                  s_app.wifi_ssid.empty() ? "" : s_app.wifi_ssid.c_str());
    label(lv_screen_active(), heading, 26, 66, 748, &lv_font_montserrat_20,
          s_app.wifi_state == 4 ? kTeal : kMuted);

    lv_obj_t *list = lv_obj_create(lv_screen_active());
    lv_obj_set_pos(list, 18, 101);
    lv_obj_set_size(list, 764, 288);
    lv_obj_set_style_bg_opa(list, LV_OPA_TRANSP, LV_PART_MAIN);
    lv_obj_set_style_border_width(list, 0, LV_PART_MAIN);
    lv_obj_set_style_pad_all(list, 4, LV_PART_MAIN);
    lv_obj_set_scroll_dir(list, LV_DIR_VER);
    int y = 0;
    for (size_t index = 0; index < s_app.wifi_networks.size(); ++index) {
        const auto &network = s_app.wifi_networks[index];
        char row[150];
        std::snprintf(row, sizeof(row), LV_SYMBOL_WIFI "  %s\n%s • %s%s%s", network.ssid,
                      wifi_signal_text(network.signal_dbm), wifi_security_text(network.security),
                      network.saved ? " • Saved" : "", network.current ? " • Current" : "");
        option_tile(list, row, 0, y, 732, 76, network.current, wifi_row_event,
                    static_cast<intptr_t>(index), network.security != 3);
        y += 84;
    }
    option_tile(list, "+ Hidden network", 0, y, 732, 68, false, hidden_wifi_event, 0);
    lv_obj_set_height(list, 288);
    confirm_bar("Refresh scan", s_app.wifi_state != 2, refresh_wifi,
                "Continue offline", [](lv_event_t *) { navigate(Screen::kHome); });
}

void render_wifi_network()
{
    s_app.wifi_ssid_input = nullptr;
    s_app.wifi_password_input = nullptr;
    s_app.wifi_keyboard = nullptr;
    s_app.wifi_active_input = nullptr;
    const buddy_ui_wifi_network_t *network =
        s_app.selected_wifi_index >= 0 &&
                static_cast<size_t>(s_app.selected_wifi_index) < s_app.wifi_networks.size()
            ? &s_app.wifi_networks[static_cast<size_t>(s_app.selected_wifi_index)]
            : nullptr;
    top_nav(s_app.hidden_wifi ? "Hidden Network" : "Connect to Wi-Fi", true);
    int keyboard_top = 154;
    if (s_app.hidden_wifi) {
        label(lv_screen_active(), "Network name", 20, 65, 180, &lv_font_montserrat_16, kMuted);
        s_app.wifi_ssid_input = lv_textarea_create(lv_screen_active());
        lv_obj_set_pos(s_app.wifi_ssid_input, 170, 59);
        lv_obj_set_size(s_app.wifi_ssid_input, 610, 48);
        lv_textarea_set_one_line(s_app.wifi_ssid_input, true);
        lv_textarea_set_max_length(s_app.wifi_ssid_input, 32);
        lv_obj_remove_flag(s_app.wifi_ssid_input, LV_OBJ_FLAG_SCROLL_ON_FOCUS);
        lv_obj_add_event_cb(s_app.wifi_ssid_input, wifi_focus_event, LV_EVENT_FOCUSED, nullptr);
        keyboard_top = 164;
    } else {
        char details[150];
        std::snprintf(details, sizeof(details), LV_SYMBOL_WIFI "  %s  •  %s  •  %s",
                      network == nullptr ? "Network" : network->ssid,
                      network == nullptr ? "" : wifi_signal_text(network->signal_dbm),
                      network == nullptr ? "" : wifi_security_text(network->security));
        label(lv_screen_active(), details, 20, 68, 760, &lv_font_montserrat_20, kInk);
    }
    const int password_top = s_app.hidden_wifi ? 112 : 102;
    label(lv_screen_active(), "Password", 20, password_top + 10, 140,
          &lv_font_montserrat_16, kMuted);
    s_app.wifi_password_input = lv_textarea_create(lv_screen_active());
    lv_obj_set_pos(s_app.wifi_password_input, 150, password_top);
    lv_obj_set_size(s_app.wifi_password_input, 430, 48);
    lv_textarea_set_one_line(s_app.wifi_password_input, true);
    lv_textarea_set_password_mode(s_app.wifi_password_input, true);
    lv_textarea_set_max_length(s_app.wifi_password_input, 64);
    lv_obj_remove_flag(s_app.wifi_password_input, LV_OBJ_FLAG_SCROLL_ON_FOCUS);
    lv_obj_add_event_cb(s_app.wifi_password_input, wifi_focus_event, LV_EVENT_FOCUSED, nullptr);
    lv_obj_t *reveal = lv_checkbox_create(lv_screen_active());
    lv_checkbox_set_text(reveal, "Show");
    lv_obj_set_pos(reveal, 600, password_top + 12);
    style_text(reveal, kInk, &lv_font_montserrat_16);
    lv_obj_add_event_cb(reveal, wifi_reveal_event, LV_EVENT_VALUE_CHANGED, nullptr);

    s_app.wifi_active_input =
        s_app.hidden_wifi ? s_app.wifi_ssid_input : s_app.wifi_password_input;
    build_wifi_keyboard(keyboard_top);
    const bool can_forget = network != nullptr && network->saved;
    confirm_bar("Connect", true, connect_wifi, can_forget ? "Forget saved" : "Cancel",
                can_forget ? confirm_forget_wifi
                           : [](lv_event_t *) { navigate(Screen::kWifi); },
                can_forget ? kOrange : kPaper);
}

void render_diagnostics()
{
    top_nav("Diagnostics", true);
    buddy_ui_diagnostics_t telemetry{};
    if (s_services.diagnostics != nullptr) {
        (void)s_services.diagnostics(s_services.context, &telemetry);
    }
    const char *ota_state = s_app.ota_state == 5 ? "ready to reboot"
                            : s_app.ota_state == 6 ? "last update failed"
                            : s_app.ota_state == 3 || s_app.ota_state == 4 ? "updating"
                                                                        : "idle";
    char rssi_text[32]{};
    if (s_app.wifi_rssi != 0) {
        std::snprintf(rssi_text, sizeof(rssi_text), " • RSSI %d dBm", s_app.wifi_rssi);
    }
    char details[1000];
    std::snprintf(details, sizeof(details),
                  "Firmware %s  •  %s  •  P4 rev %u\n"
                  "ESP-IDF 5.5.5  •  LVGL 9.5.0  •  BSP 1.0.1\n"
                  "Hosted 1.4.7  •  Wi-Fi remote 0.14.5  •  C6 firmware %s\n"
                  "Device suffix %s  •  Network %s%s%s%s\n"
                  "Last sync %s  •  Content r%u  •  Queue %u  •  OTA %s\n"
                  "Heap free/min %u/%u KiB  •  PSRAM free/min %u/%u KiB\n"
                  "LittleFS free %u KiB  •  Reset reason %d\n"
                  "Secrets and complete identifiers are always redacted.",
                  s_app.firmware_version.c_str(), s_app.hardware_profile.c_str(),
                  static_cast<unsigned>(telemetry.p4_revision),
                  telemetry.c6_firmware_version[0] == '\0'
                      ? "unavailable until hosted handshake"
                      : telemetry.c6_firmware_version,
                  s_app.device_id_suffix.c_str(),
                  s_app.bootstrap.online ? "online" : "offline",
                  s_app.wifi_ipv4.empty() ? "" : " • ",
                  s_app.wifi_ipv4.empty() ? "" : s_app.wifi_ipv4.c_str(),
                  rssi_text,
                  s_app.last_sync.c_str(), static_cast<unsigned>(s_app.content_revision),
                  static_cast<unsigned>(s_app.bootstrap.queued_events), ota_state,
                  static_cast<unsigned>(telemetry.free_internal_heap / 1024),
                  static_cast<unsigned>(telemetry.minimum_internal_heap / 1024),
                  static_cast<unsigned>(telemetry.free_psram / 1024),
                  static_cast<unsigned>(telemetry.minimum_psram / 1024),
                  static_cast<unsigned>(telemetry.filesystem_free / 1024), telemetry.reset_reason);
    label(lv_screen_active(), details, 28, 74, 744, &lv_font_montserrat_16, kInk);
    confirm_bar("Back to Settings", true, [](lv_event_t *) { navigate(Screen::kSettings); });
}

void grid_event(lv_event_t *event)
{
    lv_obj_t *target = static_cast<lv_obj_t *>(lv_event_get_target(event));
    lv_obj_set_style_bg_color(target, color(kTeal), LV_PART_MAIN);
    ++s_app.touch_grid_taps;
}

void render_hardware_proof()
{
    top_nav("Touch & Display Proof", true);
    for (int row = 0; row < 3; ++row) {
        for (int column = 0; column < 5; ++column) {
            char text[12];
            std::snprintf(text, sizeof(text), "%d,%d", column + 1, row + 1);
            button(lv_screen_active(), text, 8 + column * 158, 66 + row * 102, 150, 90,
                   kPaper, grid_event);
        }
    }
    char footer[80];
    std::snprintf(footer, sizeof(footer), "Tap every target • registered: %u",
                  static_cast<unsigned>(s_app.touch_grid_taps));
    label(lv_screen_active(), footer, 24, 372, 752, &lv_font_montserrat_20, kMuted,
          LV_TEXT_ALIGN_CENTER);
}

void render_option_gallery()
{
    top_nav("OptionTile States", true);
    label(lv_screen_active(), "Stable IDs • entire tile is tappable • 52 px minimum",
          24, 66, 752, &lv_font_montserrat_16, kMuted, LV_TEXT_ALIGN_CENTER);
    option_tile(lv_screen_active(), "Rest", 24, 104, 232, 82, false, nullptr, 101);
    lv_obj_t *pressed = option_tile(lv_screen_active(), "Pressed", 284, 104, 232, 82,
                                    false, nullptr, 102);
    lv_obj_add_state(pressed, LV_STATE_PRESSED);
    option_tile(lv_screen_active(), "Selected", 544, 104, 232, 82, true, nullptr, 103);
    option_tile(lv_screen_active(), "Persisted selection\nRestored by stable value ID",
                24, 206, 362, 96, true, nullptr, 104);
    option_tile(lv_screen_active(), "Disabled\nUnavailable right now",
                414, 206, 362, 96, false, nullptr, 105, false);
    lv_obj_t *correct = option_tile(lv_screen_active(), "Correct", 24, 322, 232, 66,
                                    false, nullptr, 106);
    lv_obj_set_style_bg_color(correct, color(kTeal), LV_PART_MAIN);
    lv_obj_t *incorrect = option_tile(lv_screen_active(), "Incorrect", 284, 322, 232, 66,
                                      false, nullptr, 107);
    lv_obj_set_style_bg_color(incorrect, color(kOrange), LV_PART_MAIN);
    option_tile(lv_screen_active(), "Long label wraps safely", 544, 322, 232, 66,
                false, nullptr, 108);
}

void render_choice_gallery()
{
    top_nav("ChoiceGrid Contract", true);
    label(lv_screen_active(), "Choose an answer, then use the fixed Check answer action",
          24, 66, 752, &lv_font_montserrat_16, kMuted, LV_TEXT_ALIGN_CENTER);
    option_tile(lv_screen_active(), "A  •  48", 28, 104, 356, 112, false, nullptr, 201);
    option_tile(lv_screen_active(), "B  •  54", 416, 104, 356, 112, true, nullptr, 202);
    if (s_app.gallery_choice_count >= 3) {
        option_tile(lv_screen_active(), "C  •  Two-line answer\nwith helpful detail",
                    28, 236, 356, 112, false, nullptr, 203);
    }
    if (s_app.gallery_choice_count >= 4) {
        option_tile(lv_screen_active(), "D  •  64", 416, 236, 356, 112, false, nullptr, 204);
    }
    confirm_bar("Check answer", true, nullptr);
}

void render_long_option_gallery()
{
    top_nav("Restored Selection", true);
    lv_obj_t *list = lv_obj_create(lv_screen_active());
    lv_obj_set_pos(list, 18, 66);
    lv_obj_set_size(list, 764, 326);
    lv_obj_set_style_bg_opa(list, LV_OPA_TRANSP, LV_PART_MAIN);
    lv_obj_set_style_border_width(list, 0, LV_PART_MAIN);
    lv_obj_set_style_pad_all(list, 4, LV_PART_MAIN);
    lv_obj_set_scroll_dir(list, LV_DIR_VER);
    lv_obj_t *restored = nullptr;
    for (int index = 0; index < 8; ++index) {
        char row[100];
        std::snprintf(row, sizeof(row), "Saved option %d\nStable value ID option_%d", index + 1,
                      index + 1);
        lv_obj_t *tile = option_tile(list, row, 0, index * 82, 732, 74, index == 7,
                                     nullptr, 300 + index);
        if (index == 7) restored = tile;
    }
    lv_obj_update_layout(list);
    if (restored != nullptr) lv_obj_scroll_to_view(restored, LV_ANIM_OFF);
    confirm_bar("Continue with option 8", true, nullptr);
}

void render_text_boundary_gallery()
{
    top_nav("Text Boundaries", true);
    label(lv_screen_active(), "Maximum-length labels wrap; missing glyphs use a safe replacement.",
          32, 76, 736, &lv_font_montserrat_20, kMuted, LV_TEXT_ALIGN_CENTER);
    option_tile(lv_screen_active(),
                "A two-line option label remains readable and never becomes a marquee",
                36, 132, 728, 92, false, nullptr, 401);
    option_tile(lv_screen_active(), "Unsupported sample: math \xE2\x88\x91  CJK \xE6\xBC\xA2  emoji \xF0\x9F\x8C\x9F",
                36, 244, 728, 76, false, nullptr, 402);
    label(lv_screen_active(), "Large value: 4,294,967,295", 36, 342, 728,
          &lv_font_montserrat_24, kInk, LV_TEXT_ALIGN_CENTER);
    confirm_bar("Done", true, nullptr);
}

void render(Screen screen)
{
    s_app.current = screen;
    prepare_screen(screen == Screen::kHome ? kWash : kMint);
    switch (screen) {
    case Screen::kHome: render_home(); break;
    case Screen::kMultiplicationSetup: render_multiplication_setup(); break;
    case Screen::kMultiplicationQuestion: render_multiplication_question(); break;
    case Screen::kMultiplicationSummary: render_multiplication_summary(); break;
    case Screen::kMasteryOverview: render_mastery_overview(); break;
    case Screen::kMasteryDetail: render_mastery_detail(); break;
    case Screen::kFlashLibrary: render_flash_library(); break;
    case Screen::kFlashStudy: render_flash_study(); break;
    case Screen::kFlashSummary: render_flash_summary(); break;
    case Screen::kSettings: render_settings(); break;
    case Screen::kWifi: render_wifi(); break;
    case Screen::kWifiNetwork: render_wifi_network(); break;
    case Screen::kWifiForget: render_wifi_forget(); break;
    case Screen::kPairing: render_pairing(); break;
    case Screen::kUpdate: render_update(); break;
    case Screen::kPreferences: render_preferences(); break;
    case Screen::kFactoryReset: render_factory_reset(); break;
    case Screen::kDiagnostics: render_diagnostics(); break;
    case Screen::kHardwareProof: render_hardware_proof(); break;
    case Screen::kOptionGallery: render_option_gallery(); break;
    case Screen::kChoiceGallery: render_choice_gallery(); break;
    case Screen::kLongOptionGallery: render_long_option_gallery(); break;
    case Screen::kTextBoundaryGallery: render_text_boundary_gallery(); break;
    }
}

} // namespace

extern "C" void buddy_ui_set_services(const buddy_ui_services_t *services)
{
    s_services = services == nullptr ? buddy_ui_services_t{} : *services;
}

extern "C" bool buddy_ui_start(lv_display_t *display, const buddy_ui_bootstrap_t *bootstrap)
{
    if (display == nullptr || bootstrap == nullptr ||
        lv_display_get_horizontal_resolution(display) != kWidth ||
        lv_display_get_vertical_resolution(display) != kHeight) {
        return false;
    }
    s_app.display = display;
    s_app.bootstrap = *bootstrap;
    s_app.child_name = bootstrap->child_name == nullptr ? "Demo Learner" : bootstrap->child_name;
    s_app.device_name = bootstrap->device_name == nullptr ? "Buddy Board" : bootstrap->device_name;
    s_app.flash_authoring_url = bootstrap->flash_authoring_url == nullptr
                                     ? "" : bootstrap->flash_authoring_url;
    s_app.last_sync = bootstrap->last_sync_text == nullptr ? "Never" : bootstrap->last_sync_text;
    s_app.content_revision = bootstrap->flash_content_revision;
    s_app.firmware_version = bootstrap->firmware_version == nullptr
                                 ? "0.1.0" : bootstrap->firmware_version;
    s_app.hardware_profile = bootstrap->hardware_profile == nullptr
                                 ? "unknown" : bootstrap->hardware_profile;
    s_app.device_id_suffix = bootstrap->device_id_suffix == nullptr
                                 ? "unpaired" : bootstrap->device_id_suffix;
    s_app.brightness_percent = bootstrap->brightness_percent;
    s_app.screen_timeout_minutes = bootstrap->screen_timeout_minutes;
    s_app.reduced_motion = bootstrap->reduced_motion;
    s_app.selected_factors.fill(false);
    s_app.selected_factors[1] = true;
    lv_display_set_default(display);
    bool resumed = false;
    if (bootstrap->multiplication_session_json != nullptr) {
        const auto restored = buddy::domain::decode_multiplication_session(
            bootstrap->multiplication_session_json);
        if (restored.has_value()) {
            s_app.selected_factors.fill(false);
            for (const int factor : restored->selected_factors) {
                s_app.selected_factors[static_cast<size_t>(factor - 1)] = true;
            }
            s_app.timed = restored->timed;
            s_app.duration_seconds = restored->duration_seconds;
            s_app.active_session_seed = restored->seed;
            s_app.session_seed = std::max(s_app.session_seed, restored->seed + 1);
            s_app.deck = restored->deck;
            s_app.deck_index = restored->deck_index;
            s_app.attempts = restored->attempts;
            s_app.score_correct = restored->score_correct;
            s_app.feedback_visible = restored->feedback_visible;
            s_app.last_correct = restored->last_correct;
            s_app.client_attempt_id = restored->client_attempt_id;
            s_app.session_started_ms = now_ms();
            s_app.session_elapsed_offset_ms = restored->elapsed_ms;
            s_app.question_started_ms = s_app.session_started_ms;
            s_app.session_saved = false;
            ensure_timed_timer();
            resumed = true;
        }
    }
    bool resumed_flash = false;
    if (!resumed && bootstrap->flash_session_json != nullptr) {
        resumed_flash = restore_flash_session(bootstrap->flash_session_json);
        if (!resumed_flash) remove_flash_session();
    }
    render(resumed ? Screen::kMultiplicationQuestion
                   : resumed_flash ? (s_app.flash_round != nullptr && s_app.flash_round->finished()
                                          ? Screen::kFlashSummary
                                          : Screen::kFlashStudy)
                                   : bootstrap->paired ? Screen::kHome : Screen::kWifi);
    notify_activity_state();
    return true;
}

extern "C" void buddy_ui_update_status(bool online, size_t queued_events,
                                         const char *last_sync_text)
{
    s_app.bootstrap.online = online;
    s_app.bootstrap.queued_events = queued_events;
    if (last_sync_text != nullptr) {
        s_app.last_sync = last_sync_text;
    }
    render(s_app.current);
}

extern "C" void buddy_ui_update_connectivity(int state, const char *ssid, const char *ipv4,
                                                int rssi,
                                                uint32_t revision)
{
    if (revision == s_app.wifi_revision) return;
    s_app.wifi_revision = revision;
    s_app.wifi_state = state;
    s_app.wifi_ssid = ssid == nullptr ? "" : ssid;
    s_app.wifi_ipv4 = ipv4 == nullptr ? "" : ipv4;
    s_app.wifi_rssi = rssi;
    s_app.bootstrap.online = state == 4;
    if (state == 4 && !s_app.bootstrap.paired && s_app.current == Screen::kWifi) {
        navigate(Screen::kPairing);
    } else if (s_app.current == Screen::kWifi) {
        render(Screen::kWifi);
    }
}

extern "C" void buddy_ui_update_device(bool paired, int state, const char *pairing_code,
                                         const char *claim_url, const char *child_name,
                                         const char *device_name, const char *flash_authoring_url,
                                         const char *last_error, uint32_t content_revision,
                                         size_t queued_events, uint32_t revision)
{
    if (revision == s_app.device_revision) return;
    s_app.device_revision = revision;
    s_app.device_state = state;
    if (s_app.firmware_checking && state != 3) s_app.firmware_checking = false;
    s_app.bootstrap.paired = paired;
    s_app.pairing_code = pairing_code == nullptr ? "" : pairing_code;
    s_app.claim_url = claim_url == nullptr ? "" : claim_url;
    s_app.device_error = last_error == nullptr ? "" : last_error;
    s_app.content_revision = content_revision;
    s_app.bootstrap.queued_events = queued_events;
    if (child_name != nullptr && child_name[0] != '\0') s_app.child_name = child_name;
    if (device_name != nullptr && device_name[0] != '\0') s_app.device_name = device_name;
    if (flash_authoring_url != nullptr && flash_authoring_url[0] != '\0') {
        s_app.flash_authoring_url = flash_authoring_url;
    }
    if (s_app.current == Screen::kPairing && paired && state == 4) {
        // A claimed device enters Home only after its initial content/mastery
        // synchronization has completed successfully.
        navigate(Screen::kHome);
    } else if (s_app.current == Screen::kPairing || s_app.current == Screen::kHome) {
        render(s_app.current);
    } else if (s_app.current == Screen::kUpdate) {
        // Manual policy checks can complete without changing the OTA manifest
        // (already current or an authenticated/network error), so the sync
        // service revision must also repaint this screen.
        render(Screen::kUpdate);
    }
}

extern "C" void buddy_ui_update_ota(int state, const char *version,
                                      const char *minimum_version,
                                      const char *release_notes, const char *message,
                                      size_t downloaded, size_t total_size, bool mandatory,
                                      uint32_t revision)
{
    if (revision == s_app.ota_revision) return;
    s_app.ota_revision = revision;
    s_app.ota_state = state;
    s_app.ota_version = version == nullptr ? "" : version;
    s_app.ota_minimum_version = minimum_version == nullptr ? "" : minimum_version;
    s_app.ota_release_notes = release_notes == nullptr ? "" : release_notes;
    s_app.ota_message = message == nullptr ? "" : message;
    s_app.ota_downloaded = downloaded;
    s_app.ota_size = total_size;
    s_app.ota_mandatory = mandatory;
    if (s_app.current == Screen::kUpdate) render(Screen::kUpdate);
}

extern "C" void buddy_ui_update_mastery(size_t fluent_facts, int xp_total,
                                           int best_60_seconds, int best_120_seconds,
                                           uint32_t revision)
{
    if (revision == s_app.mastery_revision) return;
    s_app.mastery_revision = revision;
    s_app.bootstrap.fluent_facts = fluent_facts;
    s_app.bootstrap.multiplication_xp_total = xp_total;
    s_app.bootstrap.best_60_seconds = best_60_seconds;
    s_app.bootstrap.best_120_seconds = best_120_seconds;
    if (s_app.current == Screen::kHome || s_app.current == Screen::kMultiplicationSetup) {
        render(s_app.current);
    }
}

extern "C" bool buddy_ui_run_interaction_self_test(void)
{
    if (s_app.display == nullptr) return false;
    s_app.navigation_pending = false;
    s_app.click_seen = false;
    s_app.selected_factors.fill(false);
    render(Screen::kMultiplicationSetup);
    lv_obj_t *screen = lv_screen_active();
    if (lv_obj_get_child_count(screen) < 20) return false;
    lv_obj_t *first_table = lv_obj_get_child(screen, 2);
    lv_obj_t *bar = lv_obj_get_child(screen, -1);
    lv_obj_t *start = lv_obj_get_child(bar, 0);
    if (!lv_obj_has_state(start, LV_STATE_DISABLED)) return false;

    // A press that becomes a drag/press-lost sequence must not commit.
    (void)lv_obj_send_event(first_table, LV_EVENT_PRESSED, nullptr);
    (void)lv_obj_send_event(first_table, LV_EVENT_PRESS_LOST, nullptr);
    (void)lv_obj_send_event(first_table, LV_EVENT_RELEASED, nullptr);
    if (s_app.selected_factors[0]) return false;

    // Two immediate clicks before the deferred render are treated as one
    // physical tap, preventing select-then-unselect and double submission.
    (void)lv_obj_send_event(first_table, LV_EVENT_CLICKED, nullptr);
    (void)lv_obj_send_event(first_table, LV_EVENT_CLICKED, nullptr);
    if (!s_app.selected_factors[0] || !s_app.navigation_pending) return false;
    (void)lv_timer_handler();
    if (s_app.navigation_pending || !s_app.selected_factors[0]) return false;

    screen = lv_screen_active();
    bar = lv_obj_get_child(screen, -1);
    start = lv_obj_get_child(bar, 0);
    if (lv_obj_has_state(start, LV_STATE_DISABLED)) return false;

    // A clean unpaired board advances through the specified first-boot path
    // without requiring hidden Back/Settings navigation.
    s_app.bootstrap.paired = false;
    s_app.bootstrap.online = false;
    render(Screen::kWifi);
    buddy_ui_update_connectivity(4, "Home Network", "192.0.2.24", -48,
                                 s_app.wifi_revision + 1);
    if (!s_app.navigation_pending) return false;
    (void)lv_timer_handler();
    if (s_app.current != Screen::kPairing) return false;
    buddy_ui_update_device(true, 3, "", "", "Avery", "Kitchen Buddy Board", "", "", 12, 0,
                           s_app.device_revision + 1);
    if (s_app.navigation_pending || s_app.current != Screen::kPairing) return false;
    buddy_ui_update_device(true, 4, "", "", "Avery", "Kitchen Buddy Board", "", "", 12, 0,
                           s_app.device_revision + 1);
    if (!s_app.navigation_pending) return false;
    (void)lv_timer_handler();
    if (s_app.current != Screen::kHome) return false;

    // Home sync must invoke the service and show an in-flight state without
    // replacing the last-successful timestamp with a false success.
    s_app.click_seen = false;
    s_app.bootstrap.online = true;
    s_app.device_state = 4;
    s_app.last_sync = "Yesterday";
    render(Screen::kHome);
    screen = lv_screen_active();
    lv_obj_t *sync_button = lv_obj_get_child(screen, -1);
    (void)lv_obj_send_event(sync_button, LV_EVENT_CLICKED, nullptr);
    if (!s_app.navigation_pending || s_app.device_state != 3 || s_app.last_sync != "Yesterday") {
        return false;
    }
    (void)lv_timer_handler();
    if (s_app.current != Screen::kHome) return false;

    // The same action while offline opens connection help instead of claiming
    // a sync succeeded.
    s_app.click_seen = false;
    s_app.bootstrap.online = false;
    render(Screen::kHome);
    screen = lv_screen_active();
    sync_button = lv_obj_get_child(screen, -1);
    (void)lv_obj_send_event(sync_button, LV_EVENT_CLICKED, nullptr);
    if (!s_app.navigation_pending) return false;
    (void)lv_timer_handler();
    if (s_app.current != Screen::kWifi) return false;

    // Manual firmware checks remain visibly in flight while the service is
    // working, then repaint even when the result is an error with no new OTA
    // manifest revision.
    s_app.bootstrap.online = true;
    s_app.bootstrap.paired = true;
    firmware_check_action(nullptr);
    if (!s_app.navigation_pending || !s_app.firmware_checking) return false;
    (void)lv_timer_handler();
    if (s_app.current != Screen::kUpdate) return false;
    buddy_ui_update_device(true, 3, "", "", "Avery", "Kitchen Buddy Board", "", "", 12, 0,
                           s_app.device_revision + 1);
    if (!s_app.firmware_checking || s_app.current != Screen::kUpdate) return false;
    buddy_ui_update_device(true, 8, "", "", "Avery", "Kitchen Buddy Board", "",
                           "Firmware policy check failed", 12, 0,
                           s_app.device_revision + 1);
    return !s_app.firmware_checking && s_app.current == Screen::kUpdate;
}

extern "C" bool buddy_ui_render_scenario(const char *scenario_name)
{
    if (scenario_name == nullptr || s_app.display == nullptr) {
        return false;
    }
    const std::string scenario(scenario_name);
    if (scenario == "home-offline") {
        s_app.bootstrap.online = false;
        s_app.bootstrap.queued_events = 3;
        s_app.last_sync = "8 days ago - content may be stale";
        render(Screen::kHome);
    } else if (scenario == "home-online") {
        s_app.bootstrap.online = true;
        s_app.bootstrap.queued_events = 0;
        s_app.last_sync = "Just now";
        render(Screen::kHome);
    } else if (scenario == "home-syncing") {
        s_app.bootstrap.online = true;
        s_app.bootstrap.queued_events = 2;
        s_app.device_state = 3;
        s_app.last_sync = "12 minutes ago";
        render(Screen::kHome);
    } else if (scenario == "option-states") {
        render(Screen::kOptionGallery);
    } else if (scenario == "choice-grid") {
        s_app.gallery_choice_count = 4;
        render(Screen::kChoiceGallery);
    } else if (scenario == "choice-grid-2") {
        s_app.gallery_choice_count = 2;
        render(Screen::kChoiceGallery);
    } else if (scenario == "choice-grid-3") {
        s_app.gallery_choice_count = 3;
        render(Screen::kChoiceGallery);
    } else if (scenario == "long-option-list") {
        render(Screen::kLongOptionGallery);
    } else if (scenario == "text-boundaries") {
        render(Screen::kTextBoundaryGallery);
    } else if (scenario == "multiplication-selection") {
        s_app.selected_factors.fill(false);
        s_app.selected_factors[1] = true;
        s_app.selected_factors[6] = true;
        s_app.selected_factors[7] = true;
        s_app.timed = true;
        s_app.duration_seconds = 60;
        render(Screen::kMultiplicationSetup);
    } else if (scenario == "multiplication-no-selection") {
        s_app.selected_factors.fill(false);
        s_app.timed = false;
        render(Screen::kMultiplicationSetup);
    } else if (scenario == "multiplication-locked-feedback") {
        s_app.selected_factors.fill(false);
        s_app.selected_factors[6] = true;
        s_app.timed = false;
        s_app.deck = {{7, 8}, {7, 6}};
        s_app.deck_index = 0;
        s_app.answer = "54";
        s_app.attempts = {{{7, 8}, 54, 2400}};
        s_app.score_correct = 0;
        s_app.feedback_visible = true;
        s_app.last_correct = false;
        render(Screen::kMultiplicationQuestion);
    } else if (scenario == "mastery-overview") {
        render(Screen::kMasteryOverview);
    } else if (scenario == "mastery-detail") {
        s_app.selected_mastery_factor = 7;
        render(Screen::kMasteryDetail);
    } else if (scenario == "flash-card-reveal") {
        std::vector<FlashCard> cards{{"golden_1", "benevolent", "kind and generous",
                                      "A benevolent neighbor helps."}};
        s_app.flash_round = std::make_unique<FlashRound>(std::move(cards), 42);
        s_app.flash_round->reveal();
        render(Screen::kFlashStudy);
    } else if (scenario == "wifi-selection") {
        s_app.bootstrap.online = true;
        render(Screen::kWifi);
    } else if (scenario == "wifi-scanning") {
        s_app.wifi_state = 2;
        render(Screen::kWifi);
    } else if (scenario == "wifi-wrong-password") {
        s_app.wifi_state = 5;
        s_app.wifi_ssid = "Home Network";
        render(Screen::kWifi);
    } else if (scenario == "wifi-password") {
        load_wifi_networks();
        s_app.selected_wifi_index = 0;
        s_app.hidden_wifi = false;
        render(Screen::kWifiNetwork);
    } else if (scenario == "wifi-forget") {
        load_wifi_networks();
        s_app.selected_wifi_index = 0;
        s_app.hidden_wifi = false;
        render(Screen::kWifiForget);
    } else if (scenario == "pairing-code") {
        s_app.bootstrap.online = true;
        s_app.bootstrap.paired = false;
        s_app.pairing_code = "7K3M9Q2R";
        s_app.claim_url = "https://buddyblocks.net/parent/?pair=7K3M9Q2R";
        render(Screen::kPairing);
    } else if (scenario == "pairing-syncing") {
        s_app.bootstrap.online = true;
        s_app.bootstrap.paired = true;
        s_app.device_state = 3;
        s_app.device_error.clear();
        render(Screen::kPairing);
    } else if (scenario == "pairing-error") {
        s_app.bootstrap.online = true;
        s_app.bootstrap.paired = false;
        s_app.pairing_code.clear();
        s_app.claim_url.clear();
        s_app.device_error = "Pairing code expired. Generate a new code.";
        render(Screen::kPairing);
    } else if (scenario == "flash-library-empty") {
        s_app.bootstrap.paired = true;
        s_app.bootstrap.online = true;
        s_services.flash_section_count = empty_flash_section_count;
        render(Screen::kFlashLibrary);
    } else if (scenario == "diagnostics") {
        render(Screen::kDiagnostics);
    } else if (scenario == "software-update") {
        s_app.ota_state = 1;
        s_app.ota_version = "1.0.1";
        s_app.ota_minimum_version = "1.0.0";
        s_app.ota_release_notes = "Improved offline study reliability and touch response.";
        s_app.ota_message.clear();
        s_app.ota_downloaded = 0;
        s_app.ota_size = 1993424;
        s_app.ota_mandatory = false;
        render(Screen::kUpdate);
    } else if (scenario == "software-update-checking") {
        s_app.bootstrap.online = true;
        s_app.firmware_checking = true;
        s_app.ota_state = 0;
        s_app.ota_version.clear();
        s_app.ota_minimum_version.clear();
        s_app.ota_release_notes.clear();
        s_app.ota_message.clear();
        render(Screen::kUpdate);
    } else if (scenario == "settings") {
        render(Screen::kSettings);
    } else if (scenario == "display-settings") {
        render(Screen::kPreferences);
    } else if (scenario == "factory-reset") {
        s_app.factory_reset_error.clear();
        render(Screen::kFactoryReset);
    } else {
        return false;
    }
    return true;
}
