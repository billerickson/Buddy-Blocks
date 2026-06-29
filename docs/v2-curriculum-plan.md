# V2 Classical Curriculum Plan

This document defines the recommended v2 curriculum expansion after the v1 core tracks are stable. V2 should add a classical education layer around the trivium: Grammar, Logic, and Rhetoric, supported by Classical Literature, History And Civics, and Memory Work.

The goal is not simply to add more subjects. The goal is to give Buddy Blocks a clearer classical school shape while keeping lessons compact, playful, and practice-heavy.

## Placement Rule

All new v2 classical tracks should start every student at Grade 3, following the current Spanish model.

This matters for Reagan and any older student. A globally Grade 6 student should not be dropped into Grade 6 Grammar, Logic, Rhetoric, Literature, History, or Memory Work with no foundation. These tracks should behave like level sequences:

- Grade 3 means Level I / beginner entry.
- Grade 4 means Level II / next sequential course.
- Later grades can represent later levels once the lower-level tracks exist.
- The first visible v2 classical track for every student should be the Grade 3 track.

For v2 launch, seed or assign subject-level overrides so all existing students begin these new subjects at Grade 3:

- `grammar`
- `logic`
- `rhetoric`
- `literature`
- `history-civics`
- `memory-work`

The product should eventually generalize the Spanish handoff behavior so these level-based subjects can unlock their next level after completion. Until that exists, keep the authored v2 launch scope to Grade 3 entry tracks.

## Recommended Build Order

1. Grammar
2. Logic
3. Rhetoric
4. Classical Literature
5. History And Civics
6. Memory Work

Grammar, Logic, and Rhetoric should be built first because they define the classical spine. Literature, History, and Memory Work should reinforce those skills rather than compete with them.

## Track 1: Grammar

Subject key: `grammar`

Launch track:

- Folder: `grade-03/06-grammar`
- Track title: `Grammar I`
- Placement: every student starts here

Purpose:

Grammar I should teach students to see the structure of language. It should connect naturally to Latin, Vocabulary, and Writing without duplicating those tracks.

Recommended units:

1. Parts Of Speech
2. Nouns, Pronouns, And Verbs
3. Adjectives, Adverbs, And Prepositions
4. Subjects And Predicates
5. Four Sentence Types
6. Capitalization And Punctuation
7. Phrases, Clauses, And Fragments
8. Sentence Combining
9. Copywork And Dictation
10. Introduction To Sentence Diagramming
11. Cumulative Grammar Review

Recommended lesson patterns:

- Identify the part of speech.
- Choose the correct punctuation.
- Fix a sentence.
- Match grammar terms to examples.
- Build a sentence from ordered parts.
- Diagram simple subject and predicate patterns.
- Copy a model sentence, then answer a structure question.

## Track 2: Logic

Subject key: `logic`

Launch track:

- Folder: `grade-03/07-logic`
- Track title: `Logic I`
- Placement: every student starts here

Purpose:

Logic I should help students reason clearly before they are asked to argue formally. It should start concrete and visual, then move toward statements, categories, and simple arguments.

Recommended units:

1. Patterns And Rules
2. Categories And Classification
3. Same, Different, And Opposite
4. Analogies
5. Sequencing And Order
6. Cause And Effect
7. True, False, And Not Enough Information
8. If-Then Thinking
9. Claims And Reasons
10. Common Reasoning Mistakes
11. Cumulative Logic Review

Recommended lesson patterns:

- Complete a pattern.
- Sort examples into categories.
- Choose the best analogy.
- Put events or steps in order.
- Decide whether a statement is true, false, or unknown from the evidence.
- Match claims with supporting reasons.
- Spot simple fallacies in kid-friendly examples.

## Track 3: Rhetoric

Subject key: `rhetoric`

Launch track:

- Folder: `grade-03/08-rhetoric`
- Track title: `Rhetoric I`
- Placement: every student starts here

Purpose:

Rhetoric I should teach students to communicate with order, clarity, and force. At this level, rhetoric should be more about narration, summary, explanation, and short oral answers than formal debate.

Recommended units:

1. Narration
2. Main Idea And Summary
3. Strong Sentences
4. Paragraph Shape
5. Description
6. Explanation
7. Opinion With Reasons
8. Compare And Contrast
9. Short Speeches
10. Revision For Clarity
11. Cumulative Rhetoric Review

Recommended lesson patterns:

- Retell a short passage in order.
- Choose the best summary.
- Combine choppy sentences.
- Arrange sentences into a paragraph.
- Write a topic sentence.
- Record or type a short answer.
- Revise a weak sentence for clarity.

Future Rhetoric II and higher tracks can introduce the progymnasmata more explicitly:

- Fable
- Narrative
- Chreia
- Proverb
- Refutation
- Confirmation
- Commonplace
- Encomium
- Comparison

## Track 4: Classical Literature

Subject key: `literature`

Launch track:

- Folder: `grade-03/09-literature`
- Track title: `Classical Literature I`
- Placement: every student starts here

Purpose:

Classical Literature I should give students shared stories, characters, images, and moral questions. It should favor short adapted readings, excerpts, fables, myths, poems, and guided comprehension.

Recommended units:

1. Fables And Morals
2. Myths And Heroes
3. Folk Tales And Legends
4. Poetry And Recitation
5. Character And Choice
6. Setting And Story World
7. Conflict And Resolution
8. Beautiful Sentences
9. Literature Connections To Latin
10. Cumulative Literature Review

Recommended sources and styles:

- Aesop-style fables.
- Greek and Roman myths in adapted form.
- Short poems for reading and memory.
- Age-appropriate excerpts from classic children's literature.
- Short historical speeches or sayings when they fit the reading level.

## Track 5: History And Civics

Subject key: `history-civics`

Launch track:

- Folder: `grade-03/10-history-civics`
- Track title: `History And Civics I`
- Placement: every student starts here

Purpose:

History And Civics I should orient students in time, place, people, and civic ideas. It should be chronological enough to build a timeline habit, but compact enough for short lessons.

Recommended units:

1. Timelines And Maps
2. Ancient Peoples And Places
3. Greece And Rome
4. Medieval Worlds
5. Explorers And Encounters
6. Early America
7. Communities And Government
8. Rights And Responsibilities
9. Symbols, Documents, And Speeches
10. Cumulative History Review

Recommended lesson patterns:

- Place events in order.
- Match people to contributions.
- Read a simple map.
- Compare two communities.
- Interpret a short primary-source excerpt.
- Identify a civic responsibility.
- Connect a story, place, or person to a timeline.

## Track 6: Memory Work

Subject key: `memory-work`

Launch track:

- Folder: `grade-03/11-memory-work`
- Track title: `Memory Work I`
- Placement: every student starts here

Purpose:

Memory Work I should provide a light daily-practice track that supports the rest of the curriculum. It should feel like classical morning time: short, repeatable, and satisfying.

Recommended units:

1. Poetry
2. Latin Sayings
3. Grammar Rules
4. Math Facts And Measures
5. Geography
6. History Sentences
7. Famous Lines And Speeches
8. Cumulative Memory Review

Optional family-specific extension:

- Scripture memory
- Catechism
- Hymns or prayers

These should only be added if the product intentionally supports an explicitly Christian classical mode. Otherwise, keep the canonical v2 track broadly classical and put family-specific memory selections in practice sets or a later configurable content layer.

## Authoring Guidance

Use the existing Buddy Blocks lesson style:

- One skill per lesson.
- 8-12 scored questions for standard lessons.
- `xpBase: 10` unless a special lesson design needs a different value.
- Use `config.intro` cards for short teaching moments.
- Mix question types instead of relying only on multiple choice.
- Keep lesson IDs stable once seeded.
- Use cumulative review lessons at the end of each track.

The existing question types already support most v2 needs:

- `multiple-choice` for recognition.
- `text-input` for grammar terms, short answers, and memory recall.
- `fill-blank` for grammar, sentences, and quotations.
- `match-pairs` for terms, definitions, people, events, and examples.
- `order-items` for sentence order, timeline order, and argument order.
- `passage-question` for literature, history, and rhetoric.
- `constructed-response` for narration, summaries, and short written rhetoric.
- `speaking-prompt` for recitation and short speeches.
- `error-correction` for grammar and revision.

## Product And Code Notes

Before authoring v2 tracks, add subject metadata for the new subject keys in `src/lib/subjects.ts` so they sort intentionally and receive starter badges.

Suggested order after existing subjects:

1. Grammar
2. Logic
3. Rhetoric
4. Literature
5. History And Civics
6. Memory Work

For enrollment, do not rely on each child's global grade level for these subjects. V2 should either:

- seed Grade 3 subject-level overrides for every new classical subject, or
- introduce a generalized level-sequence assignment model that starts every student at the first available level.

The second option is cleaner long-term. The first option is sufficient for a v2 launch if the goal is to keep the current enrollment model small.

## V2 Launch Scope

Recommended full v2 launch:

- Grade 3 Grammar I
- Grade 3 Logic I
- Grade 3 Rhetoric I
- Grade 3 Classical Literature I
- Grade 3 History And Civics I
- Grade 3 Memory Work I
- Subject metadata and starter badges for all six
- Grade 3 default placement for every student in all six subjects

Do not build Grade 6 versions of these subjects first. For classical tracks, the beginner level is the important entry point, regardless of the student's global academic grade.
