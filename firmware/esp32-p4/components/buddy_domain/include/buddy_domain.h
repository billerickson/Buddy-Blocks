#pragma once

#include <cstddef>
#include <cstdint>
#include <optional>
#include <string>
#include <vector>

namespace buddy::domain {

constexpr int kMinFactor = 1;
constexpr int kMaxFactor = 12;
constexpr int kMinMultiplier = 1;
constexpr int kMaxMultiplier = 12;
constexpr size_t kMaxMultiplicationAttempts = 500;
constexpr size_t kMaxFlashReviews = 1000;

struct MultiplicationFact {
    int factor = 0;
    int multiplier = 0;

    bool operator==(const MultiplicationFact &other) const;
};

struct MasteryStats {
    int attempts = 0;
    int correct = 0;
    int correct_streak = 0;
    std::optional<uint32_t> best_keyboard_response_ms;
};

enum class MasteryLevel { kNew, kLearning, kFluent };

struct Attempt {
    MultiplicationFact fact;
    int answer = 0;
    uint32_t response_ms = 0;
};

struct MultiplicationSessionState {
    std::string client_attempt_id;
    bool timed = false;
    int duration_seconds = 60;
    std::vector<int> selected_factors;
    uint64_t seed = 0;
    uint64_t elapsed_ms = 0;
    std::vector<MultiplicationFact> deck;
    size_t deck_index = 0;
    std::vector<Attempt> attempts;
    int score_correct = 0;
    bool feedback_visible = false;
    bool last_correct = false;
    bool completed = false;
};

std::string encode_multiplication_session(const MultiplicationSessionState &state);
std::optional<MultiplicationSessionState> decode_multiplication_session(const std::string &json);
std::string multiplication_submission_json(const MultiplicationSessionState &state);

class SeededRandom {
  public:
    explicit SeededRandom(uint64_t seed);
    uint32_t next_u32();
    size_t uniform(size_t upper_exclusive);

  private:
    uint64_t state_;
};

std::vector<int> normalize_selected_factors(const std::vector<int> &values);
std::vector<MultiplicationFact> build_fact_pool(const std::vector<int> &selected_factors);
MasteryLevel mastery_level(const MasteryStats *stats);
int practice_weight(const MasteryStats *stats);
int calculate_xp(int score_correct, int score_total);
bool score_attempt(const std::vector<int> &selected_factors, const Attempt &attempt);

std::vector<MultiplicationFact> build_deck(const std::vector<int> &selected_factors,
                                           const std::vector<MasteryStats> &mastery_by_ordered_fact,
                                           bool adaptive,
                                           std::optional<MultiplicationFact> previous_fact,
                                           uint64_t seed);
void requeue_missed(std::vector<MultiplicationFact> &remaining, const MultiplicationFact &fact,
                    size_t spacing = 3);

class SelectionModel {
  public:
    enum class Mode { kSingle, kMultiple };

    explicit SelectionModel(Mode mode);
    void set_options(std::vector<std::string> stable_ids);
    bool select(const std::string &stable_id);
    bool restore(const std::vector<std::string> &stable_ids);
    bool is_selected(const std::string &stable_id) const;
    bool can_commit() const;
    const std::vector<std::string> &selected() const;
    std::vector<std::string> commit() const;

  private:
    bool option_exists(const std::string &stable_id) const;
    Mode mode_;
    std::vector<std::string> options_;
    std::vector<std::string> selected_;
};

struct FlashCard {
    std::string id;
    std::string front;
    std::string back;
    std::string clue;
};

struct FlashRoundSummary {
    size_t unique_studied = 0;
    size_t first_pass_got_it = 0;
    size_t total_reviews = 0;
};

struct FlashSessionReview {
    std::string card_id;
    bool got_it = false;
    uint32_t response_ms = 0;
};

struct FlashSessionState {
    std::string client_attempt_id;
    std::string practice_set_id;
    uint32_t content_revision = 0;
    uint64_t seed = 0;
    uint64_t elapsed_ms = 0;
    bool revealed = false;
    std::vector<FlashSessionReview> reviews;
    bool completed = false;
};

std::string encode_flash_session(const FlashSessionState &state);
std::optional<FlashSessionState> decode_flash_session(const std::string &json);

class FlashRound {
  public:
    FlashRound(std::vector<FlashCard> cards, uint64_t seed);
    const FlashCard *current() const;
    void reveal();
    bool revealed() const;
    bool rate(bool got_it);
    bool finished() const;
    const FlashRoundSummary &summary() const;

  private:
    struct QueueItem {
        size_t card_index;
        bool first_view;
    };
    std::vector<FlashCard> cards_;
    std::vector<QueueItem> queue_;
    std::vector<bool> mastered_;
    size_t cursor_ = 0;
    bool revealed_ = false;
    FlashRoundSummary summary_;
};

enum class RetryAction { kSuccess, kRetry, kQuarantine, kRepair, kMandatoryUpdate };
RetryAction classify_http_result(int status_code, const std::string &error_code);

/**
 * Decide whether a validated flash-card snapshot can satisfy a server revision.
 * A missing/corrupt cache must never be hidden by a matching revision in NVS.
 * `cached_revision` is empty unless the complete cached payload passed schema
 * and bounds validation.
 */
enum class SnapshotFetchAction { kUseCache, kConditionalFetch, kUnconditionalFetch };
SnapshotFetchAction flash_snapshot_fetch_action(uint32_t server_revision,
                                                uint32_t persisted_revision,
                                                std::optional<uint32_t> cached_revision);

/** Parse the exact UTC millisecond format emitted by Date.toISOString(). */
std::optional<int64_t> parse_server_timestamp_ms(const std::string &value);

} // namespace buddy::domain
