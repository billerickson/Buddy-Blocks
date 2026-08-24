#include "buddy_domain.h"
#include "esp32_p4_domain_vectors.h"

#include <cstdlib>
#include <iostream>
#include <string>
#include <vector>

namespace {

void require(bool condition, const std::string &message)
{
    if (!condition) {
        std::cerr << "FAIL: " << message << '\n';
        std::exit(1);
    }
}

buddy::domain::MultiplicationFact parse_fact(const std::string &value)
{
    const size_t separator = value.find('x');
    return {std::stoi(value.substr(0, separator)), std::stoi(value.substr(separator + 1))};
}

std::string fact_key(const buddy::domain::MultiplicationFact &fact)
{
    return std::to_string(fact.factor) + "x" + std::to_string(fact.multiplier);
}

} // namespace

int main()
{
    using namespace buddy::domain;
    namespace vectors = buddy::test_vectors;

    require(normalize_selected_factors(vectors::normalization_input) ==
                vectors::normalization_expected,
            "factor normalization matches the website");
    const auto pool = build_fact_pool(vectors::pool_factors);
    require(pool.size() == vectors::pool_count && fact_key(pool.front()) == vectors::pool_first &&
                fact_key(pool.back()) == vectors::pool_last,
            "fact pool spans selected tables and multipliers 1..12");

    MasteryStats fluent{4, 4, 3, 4200};
    MasteryStats slow{8, 7, 5, 6000};
    MasteryStats weak{10, 5, 0, 2200};
    require(mastery_level(&fluent) == MasteryLevel::kFluent, "fluent threshold");
    require(mastery_level(&slow) == MasteryLevel::kLearning, "speed threshold");
    require(practice_weight(nullptr) == 2 && practice_weight(&fluent) == 1 &&
                practice_weight(&weak) == 3,
            "adaptive practice weights");
    require(calculate_xp(9, 9) == 0 && calculate_xp(18, 20) == 13 && calculate_xp(500, 500) == 30,
            "XP formula and cap");
    for (const auto &entry : vectors::xp_cases) {
        require(calculate_xp(entry.correct, entry.total) == entry.expected, "shared XP vector");
    }
    for (const auto &entry : vectors::mastery_cases) {
        MasteryStats stats{entry.attempts, entry.correct, entry.streak, entry.best_ms};
        const char *level = mastery_level(&stats) == MasteryLevel::kFluent ? "fluent" : "learning";
        require(std::string(level) == entry.level && practice_weight(&stats) == entry.weight,
                "shared mastery vector");
    }

    const auto shared_deck =
        build_deck(vectors::deck_factors, {}, true, std::nullopt, vectors::deck_seed);
    std::vector<std::string> shared_deck_keys;
    for (const auto &fact_value : shared_deck)
        shared_deck_keys.push_back(fact_key(fact_value));
    require(shared_deck_keys == vectors::deck_expected, "shared seeded-deck vector");

    std::vector<MasteryStats> mastery(144);
    mastery[12] = fluent; // 2x1
    const auto deck_a = build_deck({2}, mastery, true, MultiplicationFact{2, 1}, 12345);
    const auto deck_b = build_deck({2}, mastery, true, MultiplicationFact{2, 1}, 12345);
    require(deck_a == deck_b && !(deck_a.front() == MultiplicationFact{2, 1}),
            "seeded deck is deterministic and avoids the previous fact");
    size_t fluent_copies = 0;
    for (const auto &fact : deck_a) {
        fluent_copies += fact == MultiplicationFact{2, 1} ? 1 : 0;
    }
    require(fluent_copies == 1 && deck_a.size() == 23, "adaptive deck copy counts");

    std::vector<MultiplicationFact> remaining;
    for (const auto &value : vectors::requeue_deck)
        remaining.push_back(parse_fact(value));
    requeue_missed(remaining, parse_fact(vectors::requeue_missed), vectors::requeue_spacing);
    std::vector<std::string> requeued_keys;
    for (const auto &fact_value : remaining)
        requeued_keys.push_back(fact_key(fact_value));
    require(requeued_keys == vectors::requeue_expected, "missed fact returns after three others");

    SelectionModel selection(SelectionModel::Mode::kMultiple);
    selection.set_options({"1", "2", "3"});
    require(!selection.can_commit() && !selection.select("unknown"), "invalid selection rejected");
    require(selection.select("2") && selection.is_selected("2") && selection.can_commit(),
            "valid selection is explicit");
    selection.select("2");
    require(!selection.can_commit(), "multi-select toggles without implicit commit");
    require(selection.restore({"3", "missing"}) &&
                selection.commit() == std::vector<std::string>({"3"}),
            "persisted selection restores by stable ID");

    std::vector<FlashCard> cards{{"a", "A", "a", ""},
                                 {"b", "B", "b", ""},
                                 {"c", "C", "c", ""},
                                 {"d", "D", "d", ""},
                                 {"e", "E", "e", ""}};
    FlashRound round(cards, 77);
    const std::string missed_id = round.current()->id;
    round.reveal();
    require(round.rate(false), "revealed card accepts Again");
    for (int index = 0; index < 3; ++index) {
        require(round.current()->id != missed_id, "Again card waits for three other reviews");
        round.reveal();
        round.rate(true);
    }
    require(round.current()->id == missed_id, "Again card returns at the fourth position");

    FlashSessionState flash_state{
        "esp32p4_demo_00000000000000ff",
        "practice_set_1",
        12,
        99,
        3456,
        true,
        {{"card_a", false, 1200}, {"card_b", true, 900}},
    };
    const std::string encoded_flash = encode_flash_session(flash_state);
    const auto restored_flash = decode_flash_session(encoded_flash);
    require(restored_flash.has_value() &&
                restored_flash->client_attempt_id == flash_state.client_attempt_id &&
                restored_flash->practice_set_id == flash_state.practice_set_id &&
                restored_flash->content_revision == flash_state.content_revision &&
                restored_flash->revealed && restored_flash->reviews.size() == 2 &&
                !restored_flash->reviews.front().got_it &&
                restored_flash->reviews.front().response_ms == 1200,
            "active flash-card round survives a deterministic state round trip");
    require(!decode_flash_session(encoded_flash + "corrupt").has_value(),
            "corrupt flash-card session is rejected");

    require(classify_http_result(200, "") == RetryAction::kSuccess &&
                classify_http_result(503, "temporarily_unavailable") == RetryAction::kRetry &&
                classify_http_result(403, "device_revoked") == RetryAction::kRepair &&
                classify_http_result(426, "firmware_update_required") ==
                    RetryAction::kMandatoryUpdate &&
                classify_http_result(409, "client_attempt_conflict") == RetryAction::kQuarantine,
            "HTTP retry classification is stable");

    require(flash_snapshot_fetch_action(12, 12, 12) == SnapshotFetchAction::kUseCache &&
                flash_snapshot_fetch_action(13, 12, 12) == SnapshotFetchAction::kConditionalFetch &&
                flash_snapshot_fetch_action(12, 12, std::nullopt) ==
                    SnapshotFetchAction::kUnconditionalFetch &&
                flash_snapshot_fetch_action(0, 0, std::nullopt) ==
                    SnapshotFetchAction::kUnconditionalFetch &&
                flash_snapshot_fetch_action(13, 12, 13) == SnapshotFetchAction::kUseCache,
            "flash snapshot cache is trusted only after payload validation");

    require(parse_server_timestamp_ms("2026-08-23T18:00:00.000Z") == 1787508000000LL &&
                parse_server_timestamp_ms("2024-02-29T23:59:59.999Z") == 1709251199999LL &&
                !parse_server_timestamp_ms("2025-02-29T00:00:00.000Z").has_value() &&
                !parse_server_timestamp_ms("2026-08-23T18:00:00Z").has_value() &&
                !parse_server_timestamp_ms("2026-08-23T18:00:60.000Z").has_value(),
            "server UTC timestamps are parsed without depending on a process timezone");

    MultiplicationSessionState active{
        "esp32p4_demo_000000000000002a",
        false,
        60,
        {2, 7},
        42,
        1234,
        {{2, 4}, {7, 8}},
        1,
        {{{2, 4}, 8, 2100}},
        1,
        false,
        true,
    };
    const std::string active_json = encode_multiplication_session(active);
    const auto restored = decode_multiplication_session(active_json);
    require(restored.has_value() && restored->client_attempt_id == active.client_attempt_id &&
                restored->selected_factors == active.selected_factors &&
                restored->deck == active.deck && restored->attempts.size() == 1 &&
                restored->attempts.front().response_ms == 2100,
            "active multiplication session survives a JSON round trip");
    require(!decode_multiplication_session(active_json + "corrupt").has_value() &&
                !decode_multiplication_session("{\"schemaVersion\":2}").has_value(),
            "invalid and unsupported active sessions are rejected");
    const std::string submission = multiplication_submission_json(active);
    require(submission.find("\"eventType\":\"multiplication_session\"") != std::string::npos &&
                submission.find("\"inputMethod\":\"keyboard\"") != std::string::npos &&
                submission.find("\"responseMs\":2100") != std::string::npos,
            "multiplication outbox payload preserves API semantics");

    std::cout << "buddy_domain_tests: PASS\n";
    return 0;
}
