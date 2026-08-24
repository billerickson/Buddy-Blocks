#include "buddy_domain.h"

#include <algorithm>
#include <array>
#include <charconv>
#include <cstdio>
#include <sstream>
#include <utility>

namespace buddy::domain {

bool MultiplicationFact::operator==(const MultiplicationFact &other) const
{
    return factor == other.factor && multiplier == other.multiplier;
}

SeededRandom::SeededRandom(uint64_t seed) : state_(seed == 0 ? 0x9e3779b97f4a7c15ULL : seed) {}

uint32_t SeededRandom::next_u32()
{
    uint64_t value = state_;
    value ^= value >> 12;
    value ^= value << 25;
    value ^= value >> 27;
    state_ = value;
    return static_cast<uint32_t>((value * 0x2545f4914f6cdd1dULL) >> 32);
}

size_t SeededRandom::uniform(size_t upper_exclusive)
{
    return upper_exclusive == 0
               ? 0
               : static_cast<size_t>((static_cast<uint64_t>(next_u32()) * upper_exclusive) >> 32);
}

std::vector<int> normalize_selected_factors(const std::vector<int> &values)
{
    std::vector<int> normalized;
    for (const int value : values) {
        if (value >= kMinFactor && value <= kMaxFactor &&
            std::find(normalized.begin(), normalized.end(), value) == normalized.end()) {
            normalized.push_back(value);
        }
    }
    std::sort(normalized.begin(), normalized.end());
    return normalized;
}

std::vector<MultiplicationFact> build_fact_pool(const std::vector<int> &selected_factors)
{
    std::vector<MultiplicationFact> facts;
    for (const int factor : normalize_selected_factors(selected_factors)) {
        for (int multiplier = kMinMultiplier; multiplier <= kMaxMultiplier; ++multiplier) {
            facts.push_back({factor, multiplier});
        }
    }
    return facts;
}

MasteryLevel mastery_level(const MasteryStats *stats)
{
    if (stats == nullptr || stats->attempts == 0) {
        return MasteryLevel::kNew;
    }
    const double accuracy = static_cast<double>(stats->correct) / stats->attempts;
    const bool fluent_speed = !stats->best_keyboard_response_ms.has_value() ||
                              stats->best_keyboard_response_ms.value() <= 5000;
    return stats->correct >= 4 && stats->correct_streak >= 3 && accuracy >= 0.8 && fluent_speed
               ? MasteryLevel::kFluent
               : MasteryLevel::kLearning;
}

int practice_weight(const MasteryStats *stats)
{
    if (stats == nullptr || stats->attempts == 0) {
        return 2;
    }
    if (mastery_level(stats) == MasteryLevel::kFluent) {
        return 1;
    }
    const double accuracy = static_cast<double>(stats->correct) / stats->attempts;
    return accuracy < 0.6 || stats->correct_streak == 0 ? 3 : 2;
}

int calculate_xp(int score_correct, int score_total)
{
    if (score_total < 10 || score_correct <= 0) {
        return 0;
    }
    const double accuracy = static_cast<double>(score_correct) / score_total;
    const int accuracy_bonus = accuracy >= 0.9 ? 5 : accuracy >= 0.75 ? 2 : 0;
    return std::min(30, 5 + score_correct / 5 + accuracy_bonus);
}

bool score_attempt(const std::vector<int> &selected_factors, const Attempt &attempt)
{
    const auto normalized = normalize_selected_factors(selected_factors);
    return std::find(normalized.begin(), normalized.end(), attempt.fact.factor) !=
               normalized.end() &&
           attempt.fact.multiplier >= kMinMultiplier && attempt.fact.multiplier <= kMaxMultiplier &&
           attempt.answer == attempt.fact.factor * attempt.fact.multiplier;
}

namespace {

std::vector<std::string> split(const std::string &value, char delimiter)
{
    std::vector<std::string> parts;
    size_t start = 0;
    while (true) {
        const size_t end = value.find(delimiter, start);
        parts.push_back(value.substr(start, end == std::string::npos ? end : end - start));
        if (end == std::string::npos) {
            return parts;
        }
        start = end + 1;
    }
}

template <typename T> bool parse_integer(const std::string &value, T &output)
{
    if (value.empty()) {
        return false;
    }
    const char *begin = value.data();
    const char *end = begin + value.size();
    const auto result = std::from_chars(begin, end, output);
    return result.ec == std::errc{} && result.ptr == end;
}

bool safe_identifier(const std::string &value)
{
    return !value.empty() && value.size() <= 128 &&
           std::all_of(value.begin(), value.end(), [](unsigned char character) {
               return (character >= 'a' && character <= 'z') ||
                      (character >= 'A' && character <= 'Z') ||
                      (character >= '0' && character <= '9') || character == '-' ||
                      character == '_';
           });
}

} // namespace

std::string encode_multiplication_session(const MultiplicationSessionState &state)
{
    std::ostringstream packed;
    packed << state.client_attempt_id << '|' << (state.timed ? 1 : 0) << '|'
           << state.duration_seconds << '|' << state.seed << '|' << state.elapsed_ms << '|'
           << state.deck_index << '|' << state.score_correct << '|'
           << (state.feedback_visible ? 1 : 0) << '|' << (state.last_correct ? 1 : 0) << '|';
    for (size_t index = 0; index < state.selected_factors.size(); ++index) {
        if (index > 0)
            packed << ',';
        packed << state.selected_factors[index];
    }
    packed << '|';
    for (size_t index = 0; index < state.deck.size(); ++index) {
        if (index > 0)
            packed << ';';
        packed << state.deck[index].factor << ',' << state.deck[index].multiplier;
    }
    packed << '|';
    for (size_t index = 0; index < state.attempts.size(); ++index) {
        if (index > 0)
            packed << ';';
        const Attempt &attempt = state.attempts[index];
        packed << attempt.fact.factor << ',' << attempt.fact.multiplier << ',' << attempt.answer
               << ',' << attempt.response_ms;
    }
    return "{\"schemaVersion\":1,\"state\":\"" + packed.str() + "\"}";
}

std::optional<MultiplicationSessionState> decode_multiplication_session(const std::string &json)
{
    constexpr const char *prefix = "{\"schemaVersion\":1,\"state\":\"";
    constexpr const char *suffix = "\"}";
    if (json.size() <=
            std::char_traits<char>::length(prefix) + std::char_traits<char>::length(suffix) ||
        json.compare(0, std::char_traits<char>::length(prefix), prefix) != 0 ||
        json.compare(json.size() - std::char_traits<char>::length(suffix),
                     std::char_traits<char>::length(suffix), suffix) != 0) {
        return std::nullopt;
    }
    const std::string packed = json.substr(std::char_traits<char>::length(prefix),
                                           json.size() - std::char_traits<char>::length(prefix) -
                                               std::char_traits<char>::length(suffix));
    const auto fields = split(packed, '|');
    if (fields.size() != 12) {
        return std::nullopt;
    }

    MultiplicationSessionState state;
    int timed = 0;
    int feedback = 0;
    int last_correct = 0;
    if (!safe_identifier(fields[0]) || !parse_integer(fields[1], timed) || timed < 0 || timed > 1 ||
        !parse_integer(fields[2], state.duration_seconds) ||
        (state.duration_seconds != 60 && state.duration_seconds != 120) ||
        !parse_integer(fields[3], state.seed) || !parse_integer(fields[4], state.elapsed_ms) ||
        !parse_integer(fields[5], state.deck_index) ||
        !parse_integer(fields[6], state.score_correct) || state.score_correct < 0 ||
        !parse_integer(fields[7], feedback) || feedback < 0 || feedback > 1 ||
        !parse_integer(fields[8], last_correct) || last_correct < 0 || last_correct > 1) {
        return std::nullopt;
    }
    state.client_attempt_id = fields[0];
    state.timed = timed == 1;
    state.feedback_visible = feedback == 1;
    state.last_correct = last_correct == 1;

    for (const std::string &factor_value : split(fields[9], ',')) {
        int factor = 0;
        if (!parse_integer(factor_value, factor) || factor < kMinFactor || factor > kMaxFactor) {
            return std::nullopt;
        }
        state.selected_factors.push_back(factor);
    }
    if (normalize_selected_factors(state.selected_factors) != state.selected_factors) {
        return std::nullopt;
    }
    if (!fields[10].empty()) {
        for (const std::string &fact_value : split(fields[10], ';')) {
            const auto parts = split(fact_value, ',');
            MultiplicationFact fact;
            if (parts.size() != 2 || !parse_integer(parts[0], fact.factor) ||
                !parse_integer(parts[1], fact.multiplier) || fact.factor < kMinFactor ||
                fact.factor > kMaxFactor || fact.multiplier < kMinMultiplier ||
                fact.multiplier > kMaxMultiplier) {
                return std::nullopt;
            }
            state.deck.push_back(fact);
        }
    }
    if (!fields[11].empty()) {
        for (const std::string &attempt_value : split(fields[11], ';')) {
            const auto parts = split(attempt_value, ',');
            Attempt attempt;
            if (parts.size() != 4 || !parse_integer(parts[0], attempt.fact.factor) ||
                !parse_integer(parts[1], attempt.fact.multiplier) ||
                !parse_integer(parts[2], attempt.answer) ||
                !parse_integer(parts[3], attempt.response_ms) || attempt.answer < 0 ||
                attempt.answer > 999 || attempt.response_ms > 600000 ||
                attempt.fact.factor < kMinFactor || attempt.fact.factor > kMaxFactor ||
                attempt.fact.multiplier < kMinMultiplier ||
                attempt.fact.multiplier > kMaxMultiplier) {
                return std::nullopt;
            }
            state.attempts.push_back(attempt);
        }
    }
    if (state.selected_factors.empty() || state.deck.empty() ||
        state.deck_index > state.deck.size() || state.attempts.size() > 500 ||
        state.score_correct > static_cast<int>(state.attempts.size())) {
        return std::nullopt;
    }
    return state;
}

std::string multiplication_submission_json(const MultiplicationSessionState &state)
{
    std::ostringstream json;
    json << "{\"eventType\":\"multiplication_session\",\"body\":{"
         << "\"clientAttemptId\":\"" << state.client_attempt_id << "\","
         << "\"mode\":\"" << (state.timed ? "timed" : "practice") << "\","
         << "\"selectedFactors\":[";
    for (size_t index = 0; index < state.selected_factors.size(); ++index) {
        if (index > 0)
            json << ',';
        json << state.selected_factors[index];
    }
    json << "],\"durationSeconds\":";
    if (state.timed)
        json << state.duration_seconds;
    else
        json << "null";
    // `keyboard` is the existing API term for typed input, including the touch keypad.
    json << ",\"inputMethod\":\"keyboard\",\"startedAt\":\"1970-01-01T00:00:00.000Z\","
         << "\"attempts\":[";
    for (size_t index = 0; index < state.attempts.size(); ++index) {
        if (index > 0)
            json << ',';
        const Attempt &attempt = state.attempts[index];
        json << "{\"factor\":" << attempt.fact.factor
             << ",\"multiplier\":" << attempt.fact.multiplier << ",\"answer\":" << attempt.answer
             << ",\"responseMs\":" << std::min<uint32_t>(attempt.response_ms, 600000)
             << ",\"inputMethod\":\"keyboard\"}";
    }
    json << "]}}";
    return json.str();
}

std::string encode_flash_session(const FlashSessionState &state)
{
    std::ostringstream packed;
    packed << state.client_attempt_id << '|' << state.practice_set_id << '|'
           << state.content_revision << '|' << state.seed << '|' << state.elapsed_ms << '|'
           << (state.revealed ? 1 : 0) << '|';
    for (size_t index = 0; index < state.reviews.size(); ++index) {
        if (index > 0)
            packed << ';';
        const FlashSessionReview &review = state.reviews[index];
        packed << review.card_id << ',' << (review.got_it ? 1 : 0) << ','
               << std::min<uint32_t>(review.response_ms, 600000);
    }
    return "{\"schemaVersion\":1,\"state\":\"" + packed.str() + "\"}";
}

std::optional<FlashSessionState> decode_flash_session(const std::string &json)
{
    constexpr const char *prefix = "{\"schemaVersion\":1,\"state\":\"";
    constexpr const char *suffix = "\"}";
    const size_t prefix_size = std::char_traits<char>::length(prefix);
    const size_t suffix_size = std::char_traits<char>::length(suffix);
    if (json.size() <= prefix_size + suffix_size || json.compare(0, prefix_size, prefix) != 0 ||
        json.compare(json.size() - suffix_size, suffix_size, suffix) != 0) {
        return std::nullopt;
    }
    const auto fields =
        split(json.substr(prefix_size, json.size() - prefix_size - suffix_size), '|');
    FlashSessionState state;
    int revealed = 0;
    if (fields.size() != 7 || !safe_identifier(fields[0]) || !safe_identifier(fields[1]) ||
        !parse_integer(fields[2], state.content_revision) ||
        !parse_integer(fields[3], state.seed) || !parse_integer(fields[4], state.elapsed_ms) ||
        !parse_integer(fields[5], revealed) || revealed < 0 || revealed > 1) {
        return std::nullopt;
    }
    state.client_attempt_id = fields[0];
    state.practice_set_id = fields[1];
    state.revealed = revealed == 1;
    if (!fields[6].empty()) {
        for (const std::string &value : split(fields[6], ';')) {
            const auto parts = split(value, ',');
            FlashSessionReview review;
            int got_it = 0;
            if (parts.size() != 3 || !safe_identifier(parts[0]) ||
                !parse_integer(parts[1], got_it) || got_it < 0 || got_it > 1 ||
                !parse_integer(parts[2], review.response_ms) || review.response_ms > 600000) {
                return std::nullopt;
            }
            review.card_id = parts[0];
            review.got_it = got_it == 1;
            state.reviews.push_back(std::move(review));
            if (state.reviews.size() > 1000)
                return std::nullopt;
        }
    }
    return state;
}

namespace {

size_t mastery_index(const MultiplicationFact &fact)
{
    return static_cast<size_t>((fact.factor - 1) * 12 + fact.multiplier - 1);
}

template <typename T> void shuffle(std::vector<T> &values, SeededRandom &random)
{
    for (size_t index = values.size(); index > 1; --index) {
        const size_t swap_index = random.uniform(index);
        std::swap(values[index - 1], values[swap_index]);
    }
}

void avoid_adjacent_duplicates(std::vector<MultiplicationFact> &facts)
{
    for (size_t index = 1; index < facts.size(); ++index) {
        if (!(facts[index] == facts[index - 1])) {
            continue;
        }
        const auto swap_it = std::find_if(
            facts.begin() + static_cast<std::ptrdiff_t>(index + 1), facts.end(),
            [&](const MultiplicationFact &candidate) { return !(candidate == facts[index - 1]); });
        if (swap_it != facts.end()) {
            std::iter_swap(facts.begin() + static_cast<std::ptrdiff_t>(index), swap_it);
        }
    }
}

} // namespace

std::vector<MultiplicationFact> build_deck(const std::vector<int> &selected_factors,
                                           const std::vector<MasteryStats> &mastery_by_ordered_fact,
                                           bool adaptive,
                                           std::optional<MultiplicationFact> previous_fact,
                                           uint64_t seed)
{
    std::vector<MultiplicationFact> weighted;
    for (const MultiplicationFact &fact : build_fact_pool(selected_factors)) {
        const size_t index = mastery_index(fact);
        const MasteryStats *stats =
            index < mastery_by_ordered_fact.size() ? &mastery_by_ordered_fact[index] : nullptr;
        const int copies = adaptive ? practice_weight(stats) : 1;
        for (int copy = 0; copy < copies; ++copy) {
            weighted.push_back(fact);
        }
    }

    SeededRandom random(seed);
    shuffle(weighted, random);
    if (previous_fact.has_value() && weighted.size() > 1 &&
        weighted.front() == previous_fact.value()) {
        const auto swap_it = std::find_if(weighted.begin() + 1, weighted.end(),
                                          [&](const MultiplicationFact &candidate) {
                                              return !(candidate == previous_fact.value());
                                          });
        if (swap_it != weighted.end()) {
            std::iter_swap(weighted.begin(), swap_it);
        }
    }
    avoid_adjacent_duplicates(weighted);
    return weighted;
}

void requeue_missed(std::vector<MultiplicationFact> &remaining, const MultiplicationFact &fact,
                    size_t spacing)
{
    remaining.insert(
        remaining.begin() + static_cast<std::ptrdiff_t>(std::min(remaining.size(), spacing)), fact);
}

SelectionModel::SelectionModel(Mode mode) : mode_(mode) {}

void SelectionModel::set_options(std::vector<std::string> stable_ids)
{
    options_ = std::move(stable_ids);
    selected_.erase(std::remove_if(selected_.begin(), selected_.end(),
                                   [&](const std::string &value) { return !option_exists(value); }),
                    selected_.end());
}

bool SelectionModel::option_exists(const std::string &stable_id) const
{
    return std::find(options_.begin(), options_.end(), stable_id) != options_.end();
}

bool SelectionModel::select(const std::string &stable_id)
{
    if (!option_exists(stable_id)) {
        return false;
    }
    const auto selected = std::find(selected_.begin(), selected_.end(), stable_id);
    if (mode_ == Mode::kSingle) {
        selected_.assign(1, stable_id);
    } else if (selected == selected_.end()) {
        selected_.push_back(stable_id);
    } else {
        selected_.erase(selected);
    }
    return true;
}

bool SelectionModel::restore(const std::vector<std::string> &stable_ids)
{
    std::vector<std::string> restored;
    for (const std::string &stable_id : stable_ids) {
        if (option_exists(stable_id) &&
            std::find(restored.begin(), restored.end(), stable_id) == restored.end()) {
            restored.push_back(stable_id);
            if (mode_ == Mode::kSingle) {
                break;
            }
        }
    }
    selected_ = std::move(restored);
    return can_commit();
}

bool SelectionModel::is_selected(const std::string &stable_id) const
{
    return std::find(selected_.begin(), selected_.end(), stable_id) != selected_.end();
}

bool SelectionModel::can_commit() const
{
    return !selected_.empty();
}

const std::vector<std::string> &SelectionModel::selected() const
{
    return selected_;
}

std::vector<std::string> SelectionModel::commit() const
{
    return selected_;
}

FlashRound::FlashRound(std::vector<FlashCard> cards, uint64_t seed)
    : cards_(std::move(cards)), mastered_(cards_.size(), false)
{
    for (size_t index = 0; index < cards_.size(); ++index) {
        queue_.push_back({index, true});
    }
    SeededRandom random(seed);
    shuffle(queue_, random);
}

const FlashCard *FlashRound::current() const
{
    return cursor_ < queue_.size() ? &cards_[queue_[cursor_].card_index] : nullptr;
}

void FlashRound::reveal()
{
    revealed_ = current() != nullptr;
}

bool FlashRound::revealed() const
{
    return revealed_;
}

bool FlashRound::rate(bool got_it)
{
    if (!revealed_ || cursor_ >= queue_.size()) {
        return false;
    }
    const QueueItem item = queue_[cursor_];
    ++summary_.total_reviews;
    if (item.first_view) {
        ++summary_.unique_studied;
        if (got_it) {
            ++summary_.first_pass_got_it;
        }
    }
    if (got_it) {
        mastered_[item.card_index] = true;
    } else {
        const size_t insert_at = std::min(queue_.size(), cursor_ + 4);
        queue_.insert(queue_.begin() + static_cast<std::ptrdiff_t>(insert_at),
                      {item.card_index, false});
    }
    ++cursor_;
    revealed_ = false;
    return true;
}

bool FlashRound::finished() const
{
    return !cards_.empty() &&
           std::all_of(mastered_.begin(), mastered_.end(), [](bool value) { return value; });
}

const FlashRoundSummary &FlashRound::summary() const
{
    return summary_;
}

RetryAction classify_http_result(int status_code, const std::string &error_code)
{
    if (status_code >= 200 && status_code < 300) {
        return RetryAction::kSuccess;
    }
    if (status_code == 401 || error_code == "device_auth_invalid" ||
        error_code == "device_revoked" || error_code == "child_inactive") {
        return RetryAction::kRepair;
    }
    if (status_code == 426 || error_code == "firmware_update_required") {
        return RetryAction::kMandatoryUpdate;
    }
    if (status_code == 408 || status_code == 429 || status_code >= 500 || status_code <= 0) {
        return RetryAction::kRetry;
    }
    return RetryAction::kQuarantine;
}

SnapshotFetchAction flash_snapshot_fetch_action(uint32_t server_revision,
                                                uint32_t persisted_revision,
                                                std::optional<uint32_t> cached_revision)
{
    if (cached_revision.has_value() && cached_revision.value() == server_revision) {
        return SnapshotFetchAction::kUseCache;
    }
    if (persisted_revision > 0 && cached_revision.has_value() &&
        cached_revision.value() == persisted_revision) {
        return SnapshotFetchAction::kConditionalFetch;
    }
    return SnapshotFetchAction::kUnconditionalFetch;
}

std::optional<int64_t> parse_server_timestamp_ms(const std::string &value)
{
    int year = 0;
    int month = 0;
    int day = 0;
    int hour = 0;
    int minute = 0;
    int second = 0;
    int millisecond = 0;
    int consumed = 0;
    char zone = '\0';
    if (std::sscanf(value.c_str(), "%4d-%2d-%2dT%2d:%2d:%2d.%3d%c%n", &year, &month, &day, &hour,
                    &minute, &second, &millisecond, &zone, &consumed) != 8 ||
        zone != 'Z' || consumed != static_cast<int>(value.size()) || year < 2024 || month < 1 ||
        month > 12 || day < 1 || hour < 0 || hour > 23 || minute < 0 || minute > 59 || second < 0 ||
        second > 59 || millisecond < 0 || millisecond > 999) {
        return std::nullopt;
    }
    constexpr int days_per_month[] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    const bool leap_year = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    const int maximum_day = days_per_month[month - 1] + (month == 2 && leap_year ? 1 : 0);
    if (day > maximum_day)
        return std::nullopt;

    // Howard Hinnant's civil-calendar transform keeps this independent of the
    // process timezone and of non-portable timegm() availability in newlib.
    const int adjusted_year = year - (month <= 2 ? 1 : 0);
    const int era = adjusted_year / 400;
    const unsigned year_of_era = static_cast<unsigned>(adjusted_year - era * 400);
    const unsigned adjusted_month = static_cast<unsigned>(month + (month > 2 ? -3 : 9));
    const unsigned day_of_year = (153U * adjusted_month + 2U) / 5U + static_cast<unsigned>(day - 1);
    const unsigned day_of_era =
        year_of_era * 365U + year_of_era / 4U - year_of_era / 100U + day_of_year;
    const int64_t days_since_epoch = static_cast<int64_t>(era) * 146097 + day_of_era - 719468;
    const int64_t seconds_since_epoch = days_since_epoch * 86400LL +
                                        static_cast<int64_t>(hour) * 3600LL +
                                        static_cast<int64_t>(minute) * 60LL + second;
    return seconds_since_epoch * 1000 + millisecond;
}

} // namespace buddy::domain
