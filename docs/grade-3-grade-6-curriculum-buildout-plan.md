# Grade 3, Grade 4 Spanish, Grade 6, and Future LOTE Buildout Plan

This document plans the remaining course content now that v1 hardening is complete. It is intentionally separate from the architecture plan in `docs/v1-hardening-and-scaling-plan.md`.

The goal is to finish the Grade 3 and Grade 6 core academic courses currently represented in the app:

- Math
- Vocabulary

Spanish is different from Math and Vocabulary. The Grade 3 Spanish course is already in place and should be treated as the beginner Spanish level for v1 students through the grade/subject-level model. Grade 4 Spanish should be built as the next sequential Spanish course. Do not build out a separate Grade 6 Spanish course as part of this plan.

The current curriculum should stay compact, playful, and practice-heavy. Each lesson should remain small enough for a kid to complete in one sitting, while the full track should provide a coherent school-year path.

## Post-V1 Hardening Context

Recent v1 hardening changed the authoring and release assumptions for this plan:

- Canonical curriculum Markdown is loaded by `src/lib/curriculum.ts`; fixed family/profile fixtures live separately in `src/lib/seed-family.ts`.
- Run `npm run content:validate` to validate curriculum files and print grade/subject counts without touching D1.
- Run `npm run db:seed:local` after validation to seed canonical curriculum first, then the fixed v1 parent/child fixtures.
- Kid routes are generic static shells behind the Worker, so adding new children, tracks, lessons, or practice-set lessons should not require adding Astro static paths.
- Subject labels, display order, icon keys, and starter badges live in `src/lib/subjects.ts`.
- Weekly school vocabulary now belongs in child-specific practice sets, not permanent curriculum Markdown.
- The v1 enrollment model is global child grade plus optional subject-level overrides. It does not include explicit track assignment tables or automatic cross-level Spanish handoff behavior.

## Standards Source

Use the current Texas Essential Knowledge and Skills (TEKS) as the alignment source before final authoring. TEA describes TEKS as the state standards for what students should know and be able to do, and provides chapter links for English Language Arts and Reading, Mathematics, Languages Other Than English, and grade-level elementary compilations.

Primary source:

- https://tea.texas.gov/academics/curriculum-standards/teks-review/texas-essential-knowledge-and-skills

Spanish alignment source:

- https://tea.texas.gov/laws-and-rules/sboe-rules-tac/sboe-tac-currently-effect/ch114c-0.pdf

Use Chapter 114, Languages Other Than English (LOTE), as the Spanish course-alignment source. Texas describes communication as the overarching goal of world language instruction and organizes that communication into interpersonal, interpretive, and presentational modes. The TEKS also expect age-appropriate culturally authentic resources.

For this app:

- Grade 3 Spanish maps to Texas Spanish I / LOTE Level I: Novice Mid to Novice High.
- Grade 4 Spanish maps to Texas Spanish II / LOTE Level II: Novice High to Intermediate Low.
- Grade 3 French should map to Texas French I / LOTE Level I: Novice Mid to Novice High.
- Grade 4 French should map to Texas French II / LOTE Level II: Novice High to Intermediate Low.
- Grade 3 Latin should map to Texas Latin I / Classical Languages Level I, with interpretive reading as the primary proficiency target and listening, speaking, and writing used to support reading.
- Grade 4 Latin should map to Texas Latin II / Classical Languages Level II, extending Latin I toward simple connected interpretation, grammar/syntax control, and culturally relevant texts.

Do not treat this planning document as final standards alignment. Before writing each major world-language unit, recheck Chapter 114 Level I, Level II, Classical Languages Level I, or Classical Languages Level II and adjust the unit scope.

## Authoring Pattern

Use the existing Buddy Blocks lesson style:

- One skill per lesson.
- 8-12 scored questions for standard lessons.
- `xpBase: 10` unless a special lesson design needs a different value.
- Mix question types instead of repeating only multiple choice.
- Use short explanations to teach common misconceptions.
- Keep IDs stable once seeded.
- Use the shared lesson config schemas and Mad Minute defaults documented in `docs/lesson-authoring.md` and `docs/question-types.md`.
- Keep canonical curriculum, fixed seed-family data, and child-specific practice sets separate.
- Update `docs/lesson-authoring.md` and `docs/question-types.md` when new content patterns appear.

Recommended unit shape:

- 4-8 standard lessons per core unit.
- 1 mixed review lesson at the end of major clusters.
- 1 cumulative review or mastery challenge near the end of each track.
- Mad Minute can remain a standalone fluency unit in Math.

## Spanish Flash-Card Ladder

Spanish should use a three-step flash-card progression in Grade 3 and Grade 4:

- Flashcard - Easy: show the Spanish word or phrase and ask the student to choose the English meaning from multiple-choice options.
- Flashcard - Medium: show the Spanish word or phrase and ask the student to type the English meaning.
- Flashcard - Hard: show the English word or phrase and ask the student to type the Spanish translation.

Implementation guidance:

- Keep this Easy/Medium/Hard ladder scoped to Spanish tracks for now.
- Author Medium as `flash-card` with `mode: medium` once the lesson engine supports it.
- Medium cards should use the Spanish term on `front` and English `acceptedAnswers`.
- Hard cards should use the English term on `front` and Spanish `acceptedAnswers`.
- Pair Easy, Medium, and Hard lessons around the same core vocabulary set when a unit introduces or reviews reusable Spanish words.
- Include common English answer variants for Medium cards and common Spanish answer variants for Hard cards.

## Current Snapshot

After removing the old Grade 6 Spanish track, the curriculum has 5 tracks, 19 units, 76 lessons, and 486 questions.

### Grade 3 Math

Existing units:

- Addition Basics: 2 lessons.
- Subtraction Basics: 2 lessons.
- Mad Minute: 12 multiplication fact lessons.

Status:

- Strong fluency seed.
- Missing most of the full Grade 3 math course path.

### Grade 3 Vocabulary

Existing units:

- Word Meanings: 2 lessons.
- Synonyms: 2 lessons.

Status:

- Starter vocabulary support only.
- Needs full context, word study, reading vocabulary, and writing vocabulary progression.

### Grade 3 Spanish

Existing units:

- Greetings.
- Colors.
- Classroom Words.
- Numbers And Calendar.
- People And Family.
- Likes And Dislikes.
- Food And Everyday Things.
- Places And Actions.
- Simple Sentences.
- Cumulative Conversation Review.

Status:

- Full beginner Spanish course is in place.
- Needs a Spanish I / Level I alignment pass to confirm it covers interpersonal, interpretive, presentational, cultural, and authentic-resource expectations, not only vocabulary recall.
- Remaining work is Level I standards/quality review, manual QA, Flashcard - Medium additions, and the future Grade 4 handoff.

### Grade 4 Spanish

Existing units:

- Grade 3 Review And Classroom Routines.
- Numbers, Dates, And Time.
- School And Supplies.
- People, Descriptions, And Feelings.
- Food, Preferences, And Polite Requests.
- Places And Directions.
- Present-Tense Action Patterns.
- Questions And Short Conversations.
- Culture And Authentic Resources.
- Reading And Listening In Spanish.
- Cumulative Conversation Review.

Status:

- Complete as the next sequential Spanish course after Grade 3 Spanish.
- Covers Texas Spanish II / LOTE Level II expectations through short connected exchanges, resource interpretation, presentational sentences, culture comparisons, and high-frequency present-tense patterns.
- Targets practical Novice High to Intermediate Low growth rather than mirroring academic Grade 4 standards one-to-one.

### Grade 6 Math

Existing units:

- Ratios And Rates: 2 lessons.
- Expressions And Equations: 2 lessons.
- Mad Minute: 12 multiplication fact lessons.

Status:

- Good start for two major Grade 6 clusters.
- Missing number system, geometry, statistics, and broader problem solving.

### Grade 6 Vocabulary

Existing units:

- Context And Reference Skills.
- Roots Send, Write, And Law.
- Roots Good, Hand, And Empty.
- Academic Reading.
- Genre And Structure.
- Author's Craft.
- Argument And Media.
- Writing And Revision.
- Cumulative Review.

Status:

- This is the most complete current track.
- Remaining work is mostly standards verification, quality pass, balance pass, and optional enrichment.

## Build Order After V1 Hardening

1. Finish Grade 3 Math.
2. Finish Grade 6 Math.
3. Finish Grade 3 Vocabulary.
4. Quality-pass Grade 6 Vocabulary and add only missing units.
5. Quality-pass Grade 3 Spanish.
6. Build Grade 4 Spanish as the next sequential Spanish course.
7. Define and test the Grade 3 Spanish to Grade 4 Spanish handoff.
8. Add cumulative review lessons for remaining incomplete tracks.
9. Run `npm run content:validate`, `npm run db:seed:local`, and manual lesson QA.
10. After the currently scoped courses are complete, build Grade 3 French, Grade 4 French, Grade 3 Latin, and Grade 4 Latin as follow-on LOTE tracks.

Reasoning:

- Math is the most structurally important academic track and currently has the largest gaps.
- Grade 6 Vocabulary already has enough shape to use as a model for Grade 3 Vocabulary.
- Spanish is a level sequence rather than an academic-grade match. The Grade 3 Spanish course is already in place; the remaining Spanish work is Grade 3 quality review, Grade 4 buildout, and handoff behavior.
- French and Latin should come after the current Grade 3, Grade 4 Spanish, and Grade 6 scope so the app has one complete modern-language sequence and the core academic courses are stable before adding more LOTE tracks.

## Build Progress

- Grade 3 Math complete: added Place Value And Rounding, Multiplication Concepts, Division Concepts, Multiplication And Division Word Problems, Fractions, Measurement, Time, And Money, Data And Graphs, Geometry, Area, And Perimeter, and Mixed Problem Solving. Mad Minute remains the final fluency unit with stable lesson IDs.
- Grade 6 Math complete: added the remaining Ratios And Rates lessons plus Rational Number Operations, Fractions, Decimals, And Percents, Inequalities And Relationships, Coordinate Plane, Geometry, Statistics And Data, and Mixed Problem Solving. Expressions And Equations kept its existing lessons and IDs, and Mad Minute remains the final fluency unit with stable lesson IDs.
- Grade 3 Vocabulary complete: expanded Word Meanings, added Context Clues, renamed the Synonyms unit to Synonyms And Antonyms while keeping existing IDs stable, and added Multiple-Meaning Words, Prefixes And Suffixes, Roots And Word Families, Reference Skills, Figurative Language, Academic Reading Words, Writing And Revision Words, and Cumulative Review.
- Grade 6 Vocabulary quality pass complete: existing lessons stayed within the 8-12 question target and easy/hard flash-card pairs were preserved. Added one focused Research And Inquiry Vocabulary unit for the standards gap around inquiry questions, keywords, source evaluation, citation, paraphrase, plagiarism, primary/secondary sources, relevance, and bibliography.
- Shared flash-card support complete: added `mode: medium` for typed recognition cards so Spanish can use the planned Easy/Medium/Hard ladder.
- Grade 3 Spanish complete: expanded the actual repository content from Greetings and Colors into the full beginner Level I path with Classroom Words, Numbers And Calendar, People And Family, Likes And Dislikes, Food And Everyday Things, Places And Actions, Simple Sentences, and Cumulative Conversation Review. Vocabulary-focused units now include Easy, Medium, and Hard flash-card ladders.
- Grade 4 Spanish and handoff complete: added the full Spanish II / Level II path with 11 units and Easy, Medium, and Hard flash-card ladders in vocabulary-focused units. The Worker now unlocks Grade 4 Spanish when the current Grade 3 Spanish track is completed, keeps the rule scoped to Spanish, and recommends the first Grade 4 lesson after Grade 3 completion.
- French tracks complete: added Grade 3 French / French I with 10 units and Grade 4 French / French II with 11 units. Both tracks use the world-language Easy, Medium, and Hard flash-card ladder in reusable vocabulary units and mirror the practical Level I / Level II progression used by Spanish.

## Grade 3 Math Remaining Units

Target path:

1. Addition Basics
2. Subtraction Basics
3. Place Value And Rounding
4. Multiplication Concepts
5. Division Concepts
6. Multiplication And Division Word Problems
7. Fractions
8. Measurement, Time, And Money
9. Data And Graphs
10. Geometry, Area, And Perimeter
11. Mixed Problem Solving
12. Mad Minute

### Unit: Place Value And Rounding

Purpose:

- Build three-digit and four-digit place value fluency.
- Compare, order, and round numbers.

Suggested lessons:

- Hundreds, Tens, And Ones
- Compare Bigger Numbers
- Round To The Nearest Ten
- Round To The Nearest Hundred
- Place Value Word Problems

### Unit: Multiplication Concepts

Purpose:

- Connect equal groups, arrays, repeated addition, and multiplication sentences.

Suggested lessons:

- Equal Groups
- Arrays And Rows
- Skip Count To Multiply
- Multiplication Sentences
- Unknown Factor Pictures

### Unit: Division Concepts

Purpose:

- Connect sharing, grouping, and inverse multiplication.

Suggested lessons:

- Share Equally
- Make Equal Groups
- Division Sentences
- Fact Families
- Missing Number Division

### Unit: Multiplication And Division Word Problems

Purpose:

- Solve one-step and two-step word problems using multiplication and division.

Suggested lessons:

- Choose The Operation
- Draw A Model
- Two-Step Stories
- Missing Factor Stories
- Mixed Multiplication And Division Review

### Unit: Fractions

Purpose:

- Introduce unit fractions, equivalent fractions, comparisons, and fractions on number lines.

Suggested lessons:

- Equal Parts
- Unit Fractions
- Fractions On A Number Line
- Equivalent Fractions
- Compare Fractions With The Same Denominator
- Compare Fractions With The Same Numerator

### Unit: Measurement, Time, And Money

Purpose:

- Practice elapsed time, measurement units, and money contexts.

Suggested lessons:

- Tell Time To The Minute
- Elapsed Time
- Measure Length
- Liquid Volume And Mass
- Money Word Problems

### Unit: Data And Graphs

Purpose:

- Read, build, and interpret scaled graphs.

Suggested lessons:

- Picture Graphs
- Bar Graphs
- Line Plots
- Use Data To Answer Questions

### Unit: Geometry, Area, And Perimeter

Purpose:

- Recognize shapes, partition shapes, and solve area/perimeter problems.

Suggested lessons:

- Shape Attributes
- Quadrilaterals
- Find Perimeter
- Find Area With Unit Squares
- Area And Perimeter Word Problems

### Unit: Mixed Problem Solving

Purpose:

- Bring the year together before or after Mad Minute.

Suggested lessons:

- Mixed Operation Review
- Multi-Step Word Problems
- Math Vocabulary Review
- Grade 3 Mastery Challenge

## Grade 6 Math Remaining Units

Target path:

1. Ratios And Rates
2. Rational Number Operations
3. Fractions, Decimals, And Percents
4. Expressions And Equations
5. Inequalities And Relationships
6. Coordinate Plane
7. Geometry
8. Statistics And Data
9. Mixed Problem Solving
10. Mad Minute

### Unit: Ratios And Rates

Existing lessons:

- Ratio Tables
- Unit Rates

Suggested additions:

- Equivalent Ratios
- Double Number Lines
- Percent As A Rate Per 100
- Ratio Word Problems
- Graph Ratio Relationships

### Unit: Rational Number Operations

Purpose:

- Build fluency with positive rational numbers and operations.

Suggested lessons:

- Add And Subtract Decimals
- Multiply Decimals
- Divide Decimals
- Divide Fractions By Fractions
- Mixed Rational Operations

### Unit: Fractions, Decimals, And Percents

Purpose:

- Convert and compare rational forms.

Suggested lessons:

- Fraction Decimal Equivalents
- Percents And Benchmarks
- Compare Rational Numbers
- Real-World Percent Problems

### Unit: Expressions And Equations

Existing lessons:

- Expressions
- One-Step Equations

Suggested additions:

- Write Expressions From Words
- Evaluate Expressions
- Equivalent Expressions
- One-Step Equations With Rational Numbers
- Equation Word Problems

### Unit: Inequalities And Relationships

Purpose:

- Introduce inequalities and dependent relationships.

Suggested lessons:

- Write Inequalities
- Graph Inequalities
- Independent And Dependent Variables
- Tables, Rules, And Graphs

### Unit: Coordinate Plane

Purpose:

- Plot ordered pairs and solve coordinate problems.

Suggested lessons:

- Plot Points In Four Quadrants
- Distance On A Coordinate Plane
- Reflections And Symmetry
- Coordinate Word Problems

### Unit: Geometry

Purpose:

- Solve area, surface area, and volume problems.

Suggested lessons:

- Area Of Triangles
- Area Of Parallelograms And Trapezoids
- Composite Area
- Nets And Surface Area
- Volume Of Rectangular Prisms

### Unit: Statistics And Data

Purpose:

- Understand distributions and data summaries.

Suggested lessons:

- Dot Plots And Histograms
- Mean, Median, Mode, And Range
- Interquartile Range
- Describe Data Distributions
- Data Word Problems

### Unit: Mixed Problem Solving

Purpose:

- Spiral review and readiness check.

Suggested lessons:

- Ratio And Number Review
- Expressions And Geometry Review
- Data And Coordinate Review
- Grade 6 Math Mastery Challenge

## Grade 3 Vocabulary Remaining Units

Target path:

1. Word Meanings
2. Context Clues
3. Synonyms And Antonyms
4. Multiple-Meaning Words
5. Prefixes And Suffixes
6. Roots And Word Families
7. Reference Skills
8. Figurative Language
9. Academic Reading Words
10. Writing And Revision Words
11. Cumulative Review

### Unit: Word Meanings

Existing lessons:

- Big And Small Words
- Context Clues

Suggested additions:

- Choose The Best Definition
- Use Clues In A Sentence
- Match Words To Examples

### Unit: Context Clues

Purpose:

- Make context clue practice its own deeper unit.

Suggested lessons:

- Definition Clues
- Example Clues
- Contrast Clues
- Inference Clues
- Context Clues Mixed Review

### Unit: Synonyms And Antonyms

Existing lessons:

- Same Meaning
- Stronger Words

Suggested additions:

- Opposite Meaning
- Shade Of Meaning
- Pick The Precise Word
- Synonym And Antonym Review

### Unit: Multiple-Meaning Words

Purpose:

- Practice common homographs and meaning shifts by context.

Suggested lessons:

- One Word, Two Meanings
- Which Meaning Fits
- Homophones
- Multiple Meaning Word Review

### Unit: Prefixes And Suffixes

Purpose:

- Introduce common grade-level affixes.

Suggested lessons:

- Prefixes That Mean Not
- Prefixes That Mean Again Or Before
- Suffixes That Change Meaning
- Build A Word
- Affix Review

### Unit: Roots And Word Families

Purpose:

- Build early morphology habits without overloading terminology.

Suggested lessons:

- Word Families
- Base Words
- Related Words
- Root Meaning Review

### Unit: Reference Skills

Purpose:

- Use dictionaries, glossaries, alphabetical order, and guide words.

Suggested lessons:

- Alphabetical Order
- Guide Words
- Dictionary Entries
- Glossary Practice

### Unit: Figurative Language

Purpose:

- Introduce kid-friendly literary vocabulary.

Suggested lessons:

- Similes
- Metaphors
- Idioms
- Literal Or Figurative

### Unit: Academic Reading Words

Purpose:

- Teach words used in prompts and classroom reading.

Suggested lessons:

- Main Idea And Detail Words
- Character And Setting Words
- Sequence And Cause Words
- Evidence And Explain Words

### Unit: Writing And Revision Words

Purpose:

- Support sentence-level revision and precise language.

Suggested lessons:

- Vivid Verbs
- Precise Adjectives
- Combine Sentences
- Fix Repeated Words

### Unit: Cumulative Review

Purpose:

- Mix all Grade 3 vocabulary skills.

Suggested lessons:

- Mixed Context Review
- Word Parts Review
- Reading Vocabulary Review
- Grade 3 Vocabulary Mastery Challenge

## Grade 6 Vocabulary Remaining Work

This track is already broad and close to course-shaped. Do not expand it heavily until after a standards and quality pass.

Recommended remaining work:

- Verify every unit against the current Grade 6 ELAR vocabulary, reading, writing, and media expectations.
- Confirm each standard lesson has 8-12 scored questions.
- Check that every flash-card hard lesson has acceptable answer variants.
- Add more explanations where wrong answers expose a misconception.
- Add one optional unit only if the standards pass shows a real gap.

Possible optional units:

- Literary Analysis Vocabulary
- Research And Inquiry Vocabulary
- Poetry And Drama Terms
- Test-Ready Mixed Review

Quality pass checklist:

- No duplicated cards unless intentional for spaced practice.
- Easy and hard flash-card lessons are paired consistently.
- Word roots have enough transfer practice beyond memorization.
- Cumulative review covers all prior units.

## Grade 3 Spanish Quality Pass

The Grade 3 Spanish beginner course is already in place. Do not plan additional Grade 3 Spanish units unless the standards or QA pass shows a clear gap.

Texas Spanish I / Level I coverage to add or verify:

- Interpersonal communication: students ask and respond to simple questions about everyday life, school, family, preferences, needs, requests, alternatives, and simple plans.
- Interpretive communication: students identify key words, main ideas, and details from short age-appropriate authentic or classroom-authentic resources such as signs, labels, schedules, menus, calendars, classroom directions, songs, short notes, and mini-dialogues.
- Presentational communication: students use practiced words, phrases, and simple sentences to describe self, family, classroom objects, people, places, preferences, opinions, and familiar situations.
- Culture: students connect language to Spanish-speaking cultural products, practices, and perspectives, including greetings, politeness, forms of address, school routines, food routines, calendars, gestures, and register.
- Language control: students practice high-frequency verbs and functional chunks for I am, I have, I like, I need, I want, I go, I can, and simple should/must classroom expectations.
- Flash cards: vocabulary-focused sets should use the Spanish Easy/Medium/Hard ladder.

Recommended remaining work:

- Verify the course against the current elementary Languages Other Than English expectations.
- Add or revise Grade 3 Spanish lessons for any missing Level I coverage above, especially authentic-resource interpretation, cultural practices, needs/requests, simple plans, and supported opinions.
- Add Flashcard - Medium lessons to the existing Grade 3 Spanish course wherever a vocabulary set already has, or should have, Easy and Hard flash-card practice.
- Confirm Grade 3 Spanish flash-card sets follow the Spanish Easy/Medium/Hard ladder.
- Confirm every standard lesson has the intended scored-question count and answer variants.
- Confirm intro cards, prompts, translations, and explanations are age-appropriate for beginner Spanish.
- Confirm the cumulative conversation review marks readiness for Grade 4 Spanish.
- Run one manual lesson QA pass across the course, including mobile-width question rendering.

## Grade 4 Spanish Buildout

Grade 4 Spanish is the next sequential course after the existing Grade 3 beginner course. Add it under `src/content/curriculum/grade-04/03-spanish/` when authoring begins.

Every Grade 4 Spanish vocabulary-focused unit should include the Spanish flash-card ladder:

- Easy recognition from Spanish to English multiple choice.
- Medium typed English from Spanish.
- Hard typed Spanish from English.

Texas Spanish II / Level II coverage should extend the Spanish I foundation:

- Interpersonal communication: students ask and respond to questions with short connected exchanges, including reasons for preferences, needs, obligations, alternatives, and plans.
- Interpretive communication: students identify main ideas, supporting details, and familiar cultural context from short authentic resources such as schedules, menus, maps, ads, simple stories, announcements, messages, songs, videos, and classroom infographics.
- Presentational communication: students present short connected statements about themselves, school, family, community, routines, places, preferences, opinions, and planned activities.
- Culture: students compare familiar products, practices, and perspectives from Spanish-speaking communities with their own routines in age-appropriate ways.
- Language control: students move beyond isolated words into connected sentences using present-tense patterns, question words, connectors, time expressions, adjective agreement, and common irregular/high-frequency verbs.

Target path:

1. Grade 3 Review And Classroom Routines
2. Numbers, Dates, And Time
3. School And Supplies
4. People, Descriptions, And Feelings
5. Food, Preferences, And Polite Requests
6. Places And Directions
7. Present-Tense Action Patterns
8. Questions And Short Conversations
9. Culture And Authentic Resources
10. Reading And Listening In Spanish
11. Cumulative Conversation Review

### Unit: Grade 3 Review And Classroom Routines

Purpose:

- Refresh greetings, colors, common classroom phrases, and simple sentence patterns.
- Establish Grade 4 as the next step without assuming students remember every Grade 3 detail.

Suggested lessons:

- Quick Greeting Review
- Review Flash Cards Easy
- Review Flash Cards Medium
- Review Flash Cards Hard
- Classroom Direction Review
- Color And Object Review
- Useful Spanish In Class

### Unit: Numbers, Dates, And Time

Purpose:

- Extend number fluency and connect it to dates, schedules, and time expressions.

Suggested lessons:

- Numbers To 100
- Numbers Flash Cards Easy
- Numbers Flash Cards Medium
- Numbers Flash Cards Hard
- Days, Months, And Dates
- What Time Is It
- Schedule Words
- Calendar Conversation Review

### Unit: School And Supplies

Purpose:

- Expand school vocabulary and practice useful phrases around materials and activities.

Suggested lessons:

- School Supply Words
- School Flash Cards Easy
- School Flash Cards Medium
- School Flash Cards Hard
- Classes And Places
- I Have And I Need
- What Is In Your Backpack

### Unit: People, Descriptions, And Feelings

Purpose:

- Describe people with beginner-friendly adjectives and simple feeling phrases.

Suggested lessons:

- Family And Friend Review
- People Flash Cards Easy
- People Flash Cards Medium
- People Flash Cards Hard
- Describing People
- Feelings And States
- He, She, And They Sentences

### Unit: Food, Preferences, And Polite Requests

Purpose:

- Build useful food vocabulary and short preference/request exchanges.

Suggested lessons:

- Snack And Meal Words
- Food Flash Cards Easy
- Food Flash Cards Medium
- Food Flash Cards Hard
- I Like And I Do Not Like
- I Want And I Would Like
- Cafe Conversation

### Unit: Places And Directions

Purpose:

- Practice common places, movement words, and simple direction phrases.

Suggested lessons:

- School Places
- Places Flash Cards Easy
- Places Flash Cards Medium
- Places Flash Cards Hard
- Community Places
- Go To And Come From
- Direction Words

### Unit: Present-Tense Action Patterns

Purpose:

- Introduce high-frequency present-tense patterns through useful chunks before heavy grammar labels.

Suggested lessons:

- I Speak, Study, And Need
- Action Flash Cards Easy
- Action Flash Cards Medium
- Action Flash Cards Hard
- You And We Action Forms
- Common ER And IR Verbs
- Action Sentence Review

### Unit: Questions And Short Conversations

Purpose:

- Help students ask and answer predictable questions in short exchanges.
- Add simple reasons, alternatives, and plans to move from isolated answers toward connected exchanges.

Suggested lessons:

- What Is Your Name Review
- What Do You Like
- Where Are You Going
- Why And Because
- Making Simple Plans
- Question And Answer Practice

### Unit: Culture And Authentic Resources

Purpose:

- Practice interpreting age-appropriate authentic or classroom-authentic resources.
- Connect language to Spanish-speaking cultural products, practices, and perspectives.

Suggested lessons:

- Read A Simple Schedule
- Use A Menu
- Map And Direction Clues
- Celebrations And Calendars
- Culture Comparison Review

### Unit: Reading And Listening In Spanish

Purpose:

- Build confidence reading and listening to short Spanish notes, labels, messages, and mini-dialogues.

Suggested lessons:

- Read A Classroom Note
- Read A Simple Dialogue
- Listen For Key Words
- Use Context In Spanish
- Match Sentences To Meaning

### Unit: Cumulative Conversation Review

Purpose:

- Mix Grade 4 vocabulary, sentence patterns, culture, interpretation, reading, listening, and conversation.

Suggested lessons:

- School Day Conversation
- About Me And My Class
- Food And Place Review
- Culture And Resource Review
- Grade 4 Spanish Mastery Challenge

## Spanish Level Sequence

Do not build Grade 6 Spanish in this curriculum pass. The current product direction is:

1. Students start with Grade 3 Spanish.
2. When they complete Grade 3 Spanish, they should advance to Grade 4 Spanish.
3. Later Spanish levels can continue as sequential language levels, not necessarily as academic-grade-specific tracks.

Planning implications:

- Keep Grade 3 Spanish beginner-friendly and complete enough to serve every student.
- Ensure the Grade 3 Spanish mastery challenge clearly marks readiness for Grade 4 Spanish.
- Grade 4 Spanish is now added, and the app can unlock and recommend it after Grade 3 Spanish completion.

## Future French And Latin Buildout

Build these courses only after the currently scoped Grade 3, Grade 4 Spanish, and Grade 6 work is complete:

1. Grade 3 French, equivalent to Texas French I / LOTE Level I.
2. Grade 4 French, equivalent to Texas French II / LOTE Level II.
3. Grade 3 Latin, equivalent to Texas Latin I / Classical Languages Level I.
4. Grade 4 Latin, equivalent to Texas Latin II / Classical Languages Level II.

Current status:

- Grade 3 French is complete.
- Grade 4 French is complete.
- Grade 3 Latin remains.
- Grade 4 Latin remains.

Difficulty target:

- Grade 3 French should match the Grade 3 Spanish / Spanish I difficulty level.
- Grade 4 French should match the Grade 4 Spanish / Spanish II difficulty level.
- Grade 3 Latin should match the Grade 3 Spanish course in total lesson load, practice density, vocabulary expectations, cultural grounding, and novice progression, while using Latin-appropriate reading and grammar tasks instead of modern-language conversation as the main skill.
- Grade 4 Latin should match the Grade 4 Spanish course in total lesson load, interpretive challenge, culture expectations, and cumulative mastery, while extending Latin reading, morphology, syntax, and translation from Level I.

### Grade 3 French Buildout

Grade 3 French should be the French I / Level I beginner course. Use the same course size and practical difficulty as Grade 3 Spanish.

Texas French I / Level I coverage:

- Interpersonal communication: students ask and answer simple questions about greetings, names, classroom needs, family, preferences, food, places, and familiar routines.
- Interpretive communication: students identify key words, main ideas, and details from short age-appropriate French resources such as signs, classroom directions, labels, menus, calendars, schedules, songs, short notes, and mini-dialogues.
- Presentational communication: students use practiced words, phrases, and simple sentences to describe self, family, school, objects, places, likes, needs, and simple plans.
- Culture: students connect language to French-speaking cultural products, practices, and perspectives, including greetings, politeness/register, school routines, food routines, calendars, gestures, and everyday public signs.
- Language control: students practice high-frequency functional chunks for I am, I have, I like, I need, I want, I go, I can, and simple classroom expectations.

Target path:

1. Greetings And Polite Phrases
2. Colors And Classroom Objects
3. Numbers And Calendar
4. People And Family
5. Likes, Needs, And Food
6. Places And Actions
7. Simple Sentences
8. Culture And Everyday French
9. Reading And Listening In French
10. Cumulative Conversation Review

### Grade 4 French Buildout

Grade 4 French should be the French II / Level II follow-up course. Use the same course size and practical difficulty as Grade 4 Spanish.

Texas French II / Level II coverage:

- Interpersonal communication: students ask and answer questions in short connected exchanges, including reasons for preferences, needs, obligations, alternatives, and plans.
- Interpretive communication: students identify main ideas, supporting details, and cultural context from short French resources such as schedules, menus, maps, ads, simple stories, announcements, messages, songs, videos, and classroom infographics.
- Presentational communication: students present short connected statements about self, school, family, community, routines, places, preferences, opinions, and planned activities.
- Culture: students compare familiar products, practices, and perspectives from French-speaking communities with their own routines in age-appropriate ways.
- Language control: students move beyond isolated chunks into connected sentences using present-tense patterns, question words, connectors, time expressions, adjective agreement, and common high-frequency verbs.

Target path:

1. French I Review And Classroom Routines
2. Numbers, Dates, And Time
3. School And Supplies
4. People, Descriptions, And Feelings
5. Food, Preferences, And Polite Requests
6. Places And Directions
7. Present-Tense Action Patterns
8. Questions And Short Conversations
9. Culture And Authentic Resources
10. Reading And Listening In French
11. Cumulative Conversation Review

### Grade 3 Latin Buildout

Grade 3 Latin should be the Latin I / Classical Languages Level I beginner course. Match Grade 3 Spanish in approachable difficulty and lesson density, but align the skill work to classical-language TEKS.

Texas Latin I / Classical Languages Level I coverage:

- Interpretive reading: students identify Latin words, phrases, main ideas, and simple details in short adapted Latin sentences, labels, captions, mottoes, classroom texts, and mythology/history snippets.
- Grammar and morphology: students recognize noun/adjective agreement, basic cases used in simple sentences, present-tense verb forms, subject-verb agreement, word order clues, and common prefixes/roots.
- Translation and meaning-making: students translate short Latin phrases and sentences into natural English and use context to choose the best meaning.
- Culture: students connect Latin language to Roman daily life, mythology, geography, public spaces, family roles, school, food, celebrations, and Latin influence on English.
- Supporting communication: students read Latin aloud, pronounce classroom words, answer simple English comprehension questions about Latin texts, and write short Latin labels or sentence completions when it supports reading.

Target path:

1. Latin Sounds, Classroom Words, And Roman Greetings
2. Nouns, Gender, And Simple Sentences
3. Family, People, And Descriptions
4. Verbs And Everyday Actions
5. Places, Home, And School
6. Food, Animals, And Daily Life
7. Mythology And Roman Culture
8. Latin Roots In English
9. Reading Short Latin
10. Cumulative Latin I Review

### Grade 4 Latin Buildout

Grade 4 Latin should be the Latin II / Classical Languages Level II follow-up course. Match Grade 4 Spanish in course size and overall challenge, but emphasize stronger reading, morphology, syntax, translation, and cultural interpretation.

Texas Latin II / Classical Languages Level II coverage:

- Interpretive reading: students interpret longer adapted Latin passages, identify main ideas and supporting details, and use known grammar and context to infer meaning.
- Grammar and morphology: students extend case usage, adjective agreement, prepositional phrases, present/imperfect/perfect-style time contrasts where age-appropriate, infinitives, imperatives, and common irregular verbs.
- Translation and interpretation: students produce natural English translations of connected Latin sentences and explain how grammar choices shape meaning.
- Culture and connections: students compare Roman products, practices, and perspectives with their own culture and connect Latin roots, phrases, mythology, history, and geography to English and other subjects.
- Supporting communication: students read Latin aloud with confidence, answer comprehension questions, build short Latin sentence completions, and use Latin vocabulary accurately in context.

Target path:

1. Latin I Review And Reading Routines
2. Cases And Sentence Roles
3. Verbs Across Time
4. People, Places, And Descriptions
5. Roman Daily Life And Public Spaces
6. Mythology, Heroes, And Stories
7. Latin Roots, Phrases, And English Connections
8. Reading Adapted Latin Passages
9. Culture And History Through Texts
10. Cumulative Latin II Review

## Weekly School Vocabulary Integration

Do not build weekly school vocabulary into the permanent Grade 3 or Grade 6 vocabulary tracks. Use the v1 practice-set feature for school-specific words.

Recommended workflow:

- Parent creates a weekly vocabulary practice set for one child.
- Practice set is pinned above regular coursework.
- The set generates virtual flash-card practice lessons at runtime.
- The set expires or is archived after the school vocabulary test.
- Progress history remains available after archival.

Content guidance:

- Keep each weekly set to the actual school list.
- Include term, definition, sample sentence, and accepted answer variants.
- Add pronunciation or audio later only if it becomes useful.
- Avoid mixing school-list words into permanent cumulative review unless the word also belongs in the grade-level scope.

## Content Authoring Tests

Add or update tests as the curriculum grows:

- `npm run content:validate` passes before local seed.
- Content loader accepts every new unit and lesson.
- No duplicate track, unit, lesson, or question IDs.
- Every standard lesson has 8-12 scored questions unless explicitly exempted.
- Every multiple-choice and fill-blank answer appears in choices.
- Every world-language Medium flash-card has English accepted answers.
- Every world-language Hard flash-card has target-language accepted answers.
- World-language flash-card sets use Easy, Medium, and Hard consistently when introducing reusable vocabulary.
- Every track has at least one available first lesson.
- Grade 3 and Grade 6 path tests are updated intentionally, not by accident.
- Grade 3 Spanish coverage is checked against Texas Spanish I / Level I communication modes, culture, and authentic-resource expectations.
- Grade 4 Spanish coverage is checked against Texas Spanish II / Level II communication modes, culture, connected statements, and authentic-resource expectations.
- Spanish sequence tests verify Grade 3 Spanish completion can hand students to Grade 4 Spanish once that track exists.
- Grade 3 French coverage is checked against Texas French I / Level I communication modes, culture, and authentic-resource expectations once that track exists.
- Grade 4 French coverage is checked against Texas French II / Level II communication modes, culture, connected statements, and authentic-resource expectations once that track exists.
- Grade 3 Latin coverage is checked against Texas Latin I / Classical Languages Level I reading, grammar, translation, culture, and Latin-English connection expectations once that track exists.
- Grade 4 Latin coverage is checked against Texas Latin II / Classical Languages Level II reading, grammar, translation, culture, and connected-text expectations once that track exists.
- Seed script inserts missing progress rows without overwriting completion rows.
- Route tests continue to use generic kid shells rather than enumerating every child/track/lesson path.
- New subject tests update subject metadata and starter badge expectations when a subject is added.

Manual QA per completed track:

- Complete one standard lesson from each new unit.
- Complete each new question type pattern on mobile width.
- Complete one cumulative review.
- Verify Kid Home recommendation points to the first unfinished lesson.
- Verify Parent Dashboard progress updates.

## Documentation Updates While Building Curriculum

Update docs in the same goal as content changes:

- `docs/lesson-authoring.md`: update when adding new content organization rules, ID conventions, seed workflow, or authoring examples.
- `docs/question-types.md`: update when adding or changing question type patterns.
- `docs/run-locally.md`: update when local validation, seeding, or migration steps change.
- `docs/enrollment-model.md`: update when changing grade/subject visibility, overrides, or future track assignment behavior.
- `docs/practice-sets.md`: update when changing weekly vocabulary practice behavior.
- This file: update as units are completed or scope changes.

When a track is finished, mark the completed unit list here and add any final notes about deviations from the plan.
