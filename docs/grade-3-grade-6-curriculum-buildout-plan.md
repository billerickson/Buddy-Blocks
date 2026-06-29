# Grade 3 and Grade 6 Curriculum Buildout Plan

This document plans the remaining course content needed after v1 hardening. It is intentionally separate from the architecture plan in `docs/v1-hardening-and-scaling-plan.md`.

The goal is to finish the Grade 3 and Grade 6 core academic courses currently represented in the app:

- Math
- Vocabulary

Spanish is different from Math and Vocabulary. For now, all students start with the Grade 3 Spanish sequence, then move into the already-built Grade 4 Spanish sequence when they finish it. Do not build out a separate Grade 6 Spanish course as part of this plan.

The current curriculum should stay compact, playful, and practice-heavy. Each lesson should remain small enough for a kid to complete in one sitting, while the full track should provide a coherent school-year path.

## Standards Source

Use the current Texas Essential Knowledge and Skills (TEKS) as the alignment source before final authoring. TEA describes TEKS as the state standards for what students should know and be able to do, and provides chapter links for English Language Arts and Reading, Mathematics, Languages Other Than English, and grade-level elementary compilations.

Primary source:

- https://tea.texas.gov/academics/curriculum-standards/teks-review/texas-essential-knowledge-and-skills

Do not treat this planning document as final standards alignment. Before writing each major unit, verify the relevant current TEKS chapter or grade-level PDF and adjust the unit scope.

## Authoring Pattern

Use the existing Buddy Blocks lesson style:

- One skill per lesson.
- 8-12 scored questions for standard lessons.
- `xpBase: 10` unless a special lesson design needs a different value.
- Mix question types instead of repeating only multiple choice.
- Use short explanations to teach common misconceptions.
- Keep IDs stable once seeded.
- Update `docs/lesson-authoring.md` and `docs/question-types.md` when new content patterns appear.

Recommended unit shape:

- 4-8 standard lessons per core unit.
- 1 mixed review lesson at the end of major clusters.
- 1 cumulative review or mastery challenge near the end of each track.
- Mad Minute can remain a standalone fluency unit in Math.

## Current Snapshot

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

- Greetings: 2 lessons.
- Colors: 2 lessons.

Status:

- Starter language exposure.
- Needs a year-long novice path with classroom words, numbers, people, preferences, and simple present-tense patterns.

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
5. Finish Grade 3 Spanish.
6. Confirm the Grade 3 Spanish completion path hands students to Grade 4 Spanish.
7. Add cumulative review lessons for each completed track.
8. Run full content validation, local seed, and manual lesson QA.

Reasoning:

- Math is the most structurally important academic track and currently has the largest gaps.
- Grade 6 Vocabulary already has enough shape to use as a model for Grade 3 Vocabulary.
- Spanish is a level sequence rather than an academic-grade match: students begin at Grade 3 Spanish and continue to Grade 4 Spanish after completion.

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

## Grade 3 Spanish Remaining Units

Target path:

1. Greetings
2. Colors
3. Classroom Words
4. Numbers And Calendar
5. People And Family
6. Likes And Dislikes
7. Food And Everyday Things
8. Places And Actions
9. Simple Sentences
10. Cumulative Conversation Review

### Unit: Greetings

Existing lessons:

- Hello And Goodbye
- Polite Phrases

Suggested additions:

- Ask How Someone Is
- Introduce Yourself
- Greeting Review

### Unit: Colors

Existing lessons:

- Color Words
- Color Sentences

Suggested additions:

- Color Agreement Starter
- Describe Objects By Color
- Color Review

### Unit: Classroom Words

Purpose:

- Make Spanish useful during school routines.

Suggested lessons:

- Classroom Objects
- Listen And Point Words
- Teacher Directions
- I Need Phrases

### Unit: Numbers And Calendar

Purpose:

- Practice numbers, days, months, and simple dates.

Suggested lessons:

- Numbers 1-20
- Numbers 20-100
- Days Of The Week
- Months And Dates
- Calendar Review

### Unit: People And Family

Purpose:

- Name people and describe relationships.

Suggested lessons:

- Family Words
- Friends And People
- He, She, And They Starter
- Describe A Person

### Unit: Likes And Dislikes

Purpose:

- Build simple personal expression.

Suggested lessons:

- Me Gusta
- No Me Gusta
- Favorite Things
- Ask What Someone Likes

### Unit: Food And Everyday Things

Purpose:

- Add useful nouns and polite requests.

Suggested lessons:

- Snack Words
- Drink Words
- I Want Phrases
- Please And Thank You Review

### Unit: Places And Actions

Purpose:

- Combine places, movement, and simple present-tense actions.

Suggested lessons:

- School Places
- Home And Community Places
- Common Action Verbs
- Where Are You Going

### Unit: Simple Sentences

Purpose:

- Build short sentences from known vocabulary.

Suggested lessons:

- I Am Sentences
- I Have Sentences
- I Go Sentences
- Question And Answer Practice

### Unit: Cumulative Conversation Review

Purpose:

- Mix listening, speaking, matching, and sentence building.

Suggested lessons:

- Greeting Conversation
- Classroom Conversation
- About Me Conversation
- Grade 3 Spanish Mastery Challenge

## Spanish Level Sequence

Do not build Grade 6 Spanish in this curriculum pass. The current product direction is:

1. All students start with Grade 3 Spanish.
2. When they complete Grade 3 Spanish, they advance to Grade 4 Spanish.
3. Later Spanish levels can be added as sequential language levels, not necessarily as academic-grade-specific tracks.

Planning implications:

- Keep Grade 3 Spanish beginner-friendly and complete enough to serve every student.
- Ensure the Grade 3 Spanish mastery challenge clearly marks readiness for the next Spanish level.
- After v1 hardening, verify the app can recommend or unlock Grade 4 Spanish after Grade 3 Spanish completion.
- If a `grade-06/03-spanish` track remains in the content tree, treat it as existing starter content, not part of the current buildout scope.

## Weekly School Vocabulary Integration

Do not build weekly school vocabulary into the permanent Grade 3 or Grade 6 vocabulary tracks. After v1 hardening adds practice sets, use that feature for school-specific words.

Recommended workflow:

- Parent creates a weekly vocabulary practice set for one child.
- Practice set is pinned above regular coursework.
- The set uses flash-card easy and hard modes.
- The set expires or is archived after the school vocabulary test.
- Progress history remains available after archival.

Content guidance:

- Keep each weekly set to the actual school list.
- Include term, definition, sample sentence, and accepted answer variants.
- Add pronunciation or audio later only if it becomes useful.
- Avoid mixing school-list words into permanent cumulative review unless the word also belongs in the grade-level scope.

## Content Authoring Tests

Add or update tests as the curriculum grows:

- Content loader accepts every new unit and lesson.
- No duplicate track, unit, lesson, or question IDs.
- Every standard lesson has 8-12 scored questions unless explicitly exempted.
- Every multiple-choice and fill-blank answer appears in choices.
- Every hard flash-card has accepted answers.
- Every track has at least one available first lesson.
- Grade 3 and Grade 6 path tests are updated intentionally, not by accident.
- Spanish sequence tests verify Grade 3 Spanish completion can hand students to Grade 4 Spanish.
- Seed script inserts missing progress rows without overwriting completion rows.

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
- This file: update as units are completed or scope changes.

When a track is finished, mark the completed unit list here and add any final notes about deviations from the plan.
