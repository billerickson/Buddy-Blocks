#include "buddy_content.h"

#include <algorithm>
#include <cctype>
#include <cstring>
#include <memory>

#include "cJSON.h"

namespace buddy::content {
namespace {

using Json = std::unique_ptr<cJSON, decltype(&cJSON_Delete)>;

bool read_string(const cJSON *object, const char *key, std::string &output, size_t maximum,
                 bool optional = false)
{
    const cJSON *value = cJSON_GetObjectItemCaseSensitive(object, key);
    if (optional && (value == nullptr || cJSON_IsNull(value))) {
        output.clear();
        return true;
    }
    if (!cJSON_IsString(value) || value->valuestring == nullptr ||
        std::strlen(value->valuestring) > maximum) {
        return false;
    }
    output = value->valuestring;
    return !output.empty() || optional;
}

bool safe_identifier(const std::string &value)
{
    return !value.empty() && value.size() <= 128 &&
           std::all_of(value.begin(), value.end(), [](unsigned char character) {
               return std::isalnum(character) != 0 || character == '-' || character == '_';
           });
}

bool bounded_integer(const cJSON *object, const char *key, int minimum, int maximum,
                     int &output)
{
    const cJSON *value = cJSON_GetObjectItemCaseSensitive(object, key);
    if (!cJSON_IsNumber(value) || value->valuedouble < minimum || value->valuedouble > maximum ||
        value->valuedouble != static_cast<double>(value->valueint)) {
        return false;
    }
    output = value->valueint;
    return true;
}

bool bounded_optional_integer(const cJSON *object, const char *key, int minimum, int maximum,
                              int &output)
{
    const cJSON *value = cJSON_GetObjectItemCaseSensitive(object, key);
    return value == nullptr || bounded_integer(object, key, minimum, maximum, output);
}

} // namespace

bool parse_bootstrap(const std::string &json, Bootstrap &output)
{
    if (json.empty() || json.size() > 512U * 1024U) return false;
    Json root(cJSON_ParseWithLength(json.data(), json.size()), cJSON_Delete);
    const cJSON *schema = root ? cJSON_GetObjectItemCaseSensitive(root.get(), "schemaVersion")
                               : nullptr;
    const cJSON *child = root ? cJSON_GetObjectItemCaseSensitive(root.get(), "child") : nullptr;
    const cJSON *multiplication =
        root ? cJSON_GetObjectItemCaseSensitive(root.get(), "multiplication") : nullptr;
    const cJSON *mastery = multiplication
                               ? cJSON_GetObjectItemCaseSensitive(multiplication, "mastery")
                               : nullptr;
    int fluent = 0;
    int xp = 0;
    Bootstrap parsed;
    parsed.mastery_by_ordered_fact.resize(144);
    if (!root || !cJSON_IsNumber(schema) || schema->valueint != 1 || !cJSON_IsObject(child) ||
        !cJSON_IsObject(multiplication) || !cJSON_IsArray(mastery) ||
        cJSON_GetArraySize(mastery) > 144 ||
        !read_string(root.get(), "serverTime", parsed.server_time, 64) ||
        !read_string(child, "displayName", parsed.child_name, 80) ||
        !bounded_integer(multiplication, "fluentFacts", 0, 144, fluent) ||
        !bounded_integer(multiplication, "xpTotal", 0, 100000000, xp) ||
        !bounded_optional_integer(multiplication, "best60Seconds", 0, 10000,
                                  parsed.best_60_seconds) ||
        !bounded_optional_integer(multiplication, "best120Seconds", 0, 20000,
                                  parsed.best_120_seconds)) {
        return false;
    }
    std::vector<bool> seen(144, false);
    cJSON *item = nullptr;
    cJSON_ArrayForEach(item, mastery) {
        int factor = 0;
        int multiplier = 0;
        int attempts = 0;
        int correct = 0;
        int streak = 0;
        if (!cJSON_IsObject(item) || !bounded_integer(item, "factor", 1, 12, factor) ||
            !bounded_integer(item, "multiplier", 1, 12, multiplier) ||
            !bounded_integer(item, "attempts", 0, 1000000, attempts) ||
            !bounded_integer(item, "correct", 0, attempts, correct) ||
            !bounded_integer(item, "correctStreak", 0, correct, streak)) {
            return false;
        }
        const size_t index = static_cast<size_t>((factor - 1) * 12 + multiplier - 1);
        if (seen[index]) return false;
        seen[index] = true;
        domain::MasteryStats stats{attempts, correct, streak, std::nullopt};
        const cJSON *best = cJSON_GetObjectItemCaseSensitive(item, "bestKeyboardResponseMs");
        if (best != nullptr && !cJSON_IsNull(best)) {
            int response = 0;
            if (!bounded_integer(item, "bestKeyboardResponseMs", 0, 600000, response)) {
                return false;
            }
            stats.best_keyboard_response_ms = static_cast<uint32_t>(response);
        }
        parsed.mastery_by_ordered_fact[index] = stats;
    }
    parsed.fluent_facts = static_cast<size_t>(fluent);
    parsed.xp_total = xp;
    output = std::move(parsed);
    return true;
}

bool Library::replace_from_snapshot(const std::string &json)
{
    if (json.empty() || json.size() > 1024U * 1024U) return false;
    Json root(cJSON_ParseWithLength(json.data(), json.size()), cJSON_Delete);
    const cJSON *schema = root ? cJSON_GetObjectItemCaseSensitive(root.get(), "schemaVersion")
                               : nullptr;
    const cJSON *revision = root ? cJSON_GetObjectItemCaseSensitive(root.get(), "revision")
                                 : nullptr;
    const cJSON *sections = root ? cJSON_GetObjectItemCaseSensitive(root.get(), "sections")
                                 : nullptr;
    if (!root || !cJSON_IsNumber(schema) || schema->valueint != 1 ||
        !cJSON_IsNumber(revision) || revision->valuedouble < 0 ||
        revision->valuedouble > UINT32_MAX || !cJSON_IsArray(sections) ||
        cJSON_GetArraySize(sections) > 50) {
        return false;
    }

    std::vector<Section> parsed;
    size_t total_cards = 0;
    cJSON *section_json = nullptr;
    cJSON_ArrayForEach(section_json, sections) {
        Section section;
        const cJSON *pinned = cJSON_GetObjectItemCaseSensitive(section_json, "pinned");
        const cJSON *cards = cJSON_GetObjectItemCaseSensitive(section_json, "cards");
        if (!cJSON_IsObject(section_json) || !read_string(section_json, "id", section.id, 128) ||
            !read_string(section_json, "title", section.title, 100) ||
            !read_string(section_json, "source", section.source, 200, true) ||
            !read_string(section_json, "updatedAt", section.updated_at, 64) ||
            (!cJSON_IsBool(pinned)) || !cJSON_IsArray(cards) ||
            cJSON_GetArraySize(cards) > 100) {
            return false;
        }
        if (!safe_identifier(section.id)) return false;
        section.pinned = cJSON_IsTrue(pinned);
        total_cards += static_cast<size_t>(cJSON_GetArraySize(cards));
        if (total_cards > 2500) return false;
        cJSON *card_json = nullptr;
        cJSON_ArrayForEach(card_json, cards) {
            Card card;
            const cJSON *sort_order = cJSON_GetObjectItemCaseSensitive(card_json, "sortOrder");
            if (!cJSON_IsObject(card_json) || !read_string(card_json, "id", card.id, 128) ||
                !read_string(card_json, "front", card.front, 500) ||
                !read_string(card_json, "back", card.back, 800) ||
                !read_string(card_json, "clue", card.clue, 800, true) ||
                !cJSON_IsNumber(sort_order) || sort_order->valueint < 0 ||
                sort_order->valueint > 10000) {
                return false;
            }
            if (!safe_identifier(card.id)) return false;
            card.sort_order = sort_order->valueint;
            section.cards.push_back(std::move(card));
        }
        std::stable_sort(section.cards.begin(), section.cards.end(),
                         [](const Card &left, const Card &right) {
                             return left.sort_order < right.sort_order;
                         });
        parsed.push_back(std::move(section));
    }
    std::stable_sort(parsed.begin(), parsed.end(), [](const Section &left, const Section &right) {
        if (left.pinned != right.pinned) return left.pinned;
        return left.updated_at > right.updated_at;
    });
    {
        std::lock_guard<std::recursive_mutex> guard(mutex_);
        revision_ = static_cast<uint32_t>(revision->valuedouble);
        sections_ = std::move(parsed);
    }
    return true;
}

void Library::clear()
{
    std::lock_guard<std::recursive_mutex> guard(mutex_);
    revision_ = 0;
    sections_.clear();
}

uint32_t Library::revision() const
{
    std::lock_guard<std::recursive_mutex> guard(mutex_);
    return revision_;
}

size_t Library::section_count() const
{
    std::lock_guard<std::recursive_mutex> guard(mutex_);
    return sections_.size();
}

bool Library::section(size_t index, Section &output) const
{
    std::lock_guard<std::recursive_mutex> guard(mutex_);
    if (index >= sections_.size()) return false;
    const Section &source = sections_[index];
    output.id = source.id;
    output.title = source.title;
    output.source = source.source;
    output.updated_at = source.updated_at;
    output.pinned = source.pinned;
    output.cards.clear();
    output.cards.resize(source.cards.size());
    return true;
}

bool Library::card(size_t section_index, size_t card_index, Card &output) const
{
    std::lock_guard<std::recursive_mutex> guard(mutex_);
    if (section_index >= sections_.size() || card_index >= sections_[section_index].cards.size()) {
        return false;
    }
    output = sections_[section_index].cards[card_index];
    return true;
}

} // namespace buddy::content
