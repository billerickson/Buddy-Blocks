#include "buddy_content.h"

#include <cstdlib>
#include <iostream>
#include <string>

using namespace buddy::content;

namespace {

void require(bool condition, const char *message)
{
    if (condition) return;
    std::cerr << "FAILED: " << message << '\n';
    std::exit(1);
}

constexpr char kBootstrap[] = R"json({
  "schemaVersion": 1,
  "serverTime": "2026-08-24T12:00:00.000Z",
  "child": {"displayName": "Avery"},
  "multiplication": {
    "fluentFacts": 1,
    "xpTotal": 42,
    "best60Seconds": 18,
    "best120Seconds": null,
    "mastery": [
      {"factor": 7, "multiplier": 8, "attempts": 5, "correct": 4,
       "correctStreak": 3, "bestKeyboardResponseMs": 2100}
    ]
  }
})json";

constexpr char kSnapshot[] = R"json({
  "schemaVersion": 1,
  "revision": 12,
  "generatedAt": "2026-08-24T12:00:00.000Z",
  "sections": [
    {"id": "section_later", "title": "Later", "source": null, "pinned": false,
     "updatedAt": "2026-08-24T11:00:00.000Z", "cards": []},
    {"id": "section_pinned", "title": "Pinned", "source": "Friday quiz",
     "pinned": true, "updatedAt": "2026-08-23T11:00:00.000Z", "cards": [
       {"id": "card_second", "front": "second", "back": "2", "clue": null,
        "sortOrder": 2},
       {"id": "card_first", "front": "caf\u00e9", "back": "1", "clue": "start",
        "sortOrder": 1}
     ]}
  ]
})json";

} // namespace

int main()
{
    Bootstrap bootstrap;
    require(parse_bootstrap(kBootstrap, bootstrap) && bootstrap.child_name == "Avery" &&
                bootstrap.fluent_facts == 1 && bootstrap.xp_total == 42 &&
                bootstrap.mastery_by_ordered_fact[79].correct == 4,
            "bootstrap parses bounded mastery and XP");
    require(!parse_bootstrap(std::string(kBootstrap) + "junk", bootstrap),
            "bootstrap rejects trailing corruption");
    std::string embedded_null(kBootstrap);
    embedded_null.push_back('\0');
    embedded_null += "junk";
    require(!parse_bootstrap(embedded_null, bootstrap),
            "bootstrap rejects embedded-null corruption");
    const std::string fractional_schema =
        std::string(kBootstrap).replace(std::string(kBootstrap).find("\"schemaVersion\": 1"),
                                        18, "\"schemaVersion\": 1.5");
    require(!parse_bootstrap(fractional_schema, bootstrap),
            "bootstrap schema version must be integral");

    Library library;
    require(library.replace_from_snapshot(kSnapshot) && library.revision() == 12 &&
                library.section_count() == 2,
            "flash-card snapshot parses");
    Section section;
    Card card;
    require(library.section(0, section) && section.id == "section_pinned" && section.pinned &&
                section.cards.size() == 2 && library.card(0, 0, card) &&
                card.id == "card_first" && card.front == "caf?",
            "pinned sections, card order, and unsupported glyph replacement are deterministic");

    const std::string fractional_revision =
        std::string(kSnapshot).replace(std::string(kSnapshot).find("\"revision\": 12"), 14,
                                       "\"revision\": 12.5");
    require(!library.replace_from_snapshot(fractional_revision),
            "fractional content revisions are rejected");
    const std::string fractional_sort =
        std::string(kSnapshot).replace(std::string(kSnapshot).find("\"sortOrder\": 2"), 14,
                                       "\"sortOrder\": 2.5");
    require(!library.replace_from_snapshot(fractional_sort),
            "fractional card ordering is rejected");
    const std::string unsafe_identifier =
        std::string(kSnapshot).replace(std::string(kSnapshot).find("section_later"), 13,
                                       "section later");
    require(!library.replace_from_snapshot(unsafe_identifier),
            "unsafe content identifiers are rejected");
    std::string invalid_utf8(kSnapshot);
    const size_t later = invalid_utf8.find("Later");
    invalid_utf8.insert(later, 1, static_cast<char>(0xc3));
    require(!library.replace_from_snapshot(invalid_utf8),
            "malformed UTF-8 in child-authored content is rejected");

    std::cout << "buddy_content_tests: PASS\n";
    return 0;
}
