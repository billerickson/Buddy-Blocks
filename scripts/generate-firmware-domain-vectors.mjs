import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) {
  throw new Error('usage: node generate-firmware-domain-vectors.mjs <vectors.json> <output.h>');
}

const vectors = JSON.parse(await readFile(inputPath, 'utf8'));
const ints = (values) => values.join(', ');
const strings = (values) => values.map((value) => `"${value}"`).join(', ');
const masteryRows = vectors.mastery
  .map(({ stats, expected, weight }) =>
    `{${stats.attempts}, ${stats.correct}, ${stats.correctStreak}, ${stats.bestKeyboardResponseMs}, "${expected}", ${weight}}`,
  )
  .join(',\n    ');
const xpRows = vectors.xp
  .map(({ correct, total, expected }) => `{${correct}, ${total}, ${expected}}`)
  .join(', ');

const header = `#pragma once
#include <cstdint>
#include <string>
#include <vector>

namespace buddy::test_vectors {
inline const std::vector<int> normalization_input{${ints(vectors.selectedFactorNormalization.input)}};
inline const std::vector<int> normalization_expected{${ints(vectors.selectedFactorNormalization.expected)}};
inline const std::vector<int> pool_factors{${ints(vectors.factPool.selectedFactors)}};
inline constexpr size_t pool_count = ${vectors.factPool.expectedCount};
inline constexpr const char *pool_first = "${vectors.factPool.expectedFirst}";
inline constexpr const char *pool_last = "${vectors.factPool.expectedLast}";
inline const std::vector<int> deck_factors{${ints(vectors.deterministicDeck.selectedFactors)}};
inline constexpr uint64_t deck_seed = ${vectors.deterministicDeck.seed}ULL;
inline const std::vector<std::string> deck_expected{${strings(vectors.deterministicDeck.expected)}};
inline const std::vector<std::string> requeue_deck{${strings(vectors.missedFactSpacing.deck)}};
inline constexpr const char *requeue_missed = "${vectors.missedFactSpacing.missed}";
inline constexpr size_t requeue_spacing = ${vectors.missedFactSpacing.spacing};
inline const std::vector<std::string> requeue_expected{${strings(vectors.missedFactSpacing.expected)}};
struct XpCase { int correct; int total; int expected; };
inline const std::vector<XpCase> xp_cases{${xpRows}};
struct MasteryCase { int attempts; int correct; int streak; uint32_t best_ms; const char *level; int weight; };
inline const std::vector<MasteryCase> mastery_cases{
    ${masteryRows}
};
} // namespace buddy::test_vectors
`;

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, header);
