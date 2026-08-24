#pragma once

#include <cstdint>
#include <mutex>
#include <string>
#include <vector>

#include "buddy_domain.h"

namespace buddy::content {

struct Card {
    std::string id;
    std::string front;
    std::string back;
    std::string clue;
    int sort_order = 0;
};

struct Section {
    std::string id;
    std::string title;
    std::string source;
    std::string updated_at;
    bool pinned = false;
    std::vector<Card> cards;
};

struct Bootstrap {
    std::string server_time;
    std::string child_name;
    std::vector<domain::MasteryStats> mastery_by_ordered_fact;
    size_t fluent_facts = 0;
    int xp_total = 0;
    int best_60_seconds = 0;
    int best_120_seconds = 0;
};

bool parse_bootstrap(const std::string &json, Bootstrap &output);

class Library {
  public:
    bool replace_from_snapshot(const std::string &json);
    void clear();
    uint32_t revision() const;
    size_t section_count() const;
    bool section(size_t index, Section &output) const;
    bool card(size_t section_index, size_t card_index, Card &output) const;

  private:
    mutable std::recursive_mutex mutex_;
    uint32_t revision_ = 0;
    std::vector<Section> sections_;
};

} // namespace buddy::content
