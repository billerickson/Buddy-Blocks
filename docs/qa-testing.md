# QA Testing

## Round 1

1. Previously, when inside a kid profile, clicking the "Buddy Blocks" logo at the top took you to their dashboard (ex: /kid/Reagan), but now it takes me to the parent dashboard. Can you restore the previous functionality so it goes to the kid's dashboard?

   - Root cause: kid pages are served from generated static shell routes like `/kid/shell/`, so the Astro layout could not know the real child slug when rendering the logo link.
   - Fix: kid shells now mark the brand link and rewrite it in the browser to the current `/kid/:slug/` dashboard URL while keeping a safe static fallback.
   - Verified: ran `npm run check` and `npm run build`; inspected the generated kid shell HTML for the rewrite hook.

2. Can you check all lessons and make sure the answers are mixed up? On the Grade 6 Vocabulary > Context And Reference Skills > Easy Context Cards, the answer to every question was (A) the first choice. I think there was also a lesson in Grade 3 that had the same issue.

   - Root cause: many authored lessons store choice answers in source order with the correct answer first, and the lesson player displayed that source order directly.
   - Fix: the lesson queue now deterministically shuffles choice arrays per question and rebalances any lesson that would still show every correct answer in the same position.
   - Verified: `npm test -- tests/lesson-flow.test.ts`, `npm test`, `npm run check`, `npm run content:validate`, and a full curriculum scan through `prepareLessonQueue` showing 0 lessons with all correct answers in slot A.

3. On the "Match each word to an example" question type, if you press the wrong word and match it to something else, there's no way to undo your selection and select the correct word. They should be able to undo the selection without submitting the wrong answer.

   - Root cause: the lesson player disabled left-side match buttons once they had any match, so an incorrect pair could not be cleared before submitting.
   - Fix: clicking an already matched left-side item now clears that pair and selects the item again so the student can choose a different match.
   - Verified: `npm test -- tests/match-pairs.test.ts`, `npm test`, and `npm run check`.

4. On French 1, the second question of the first lesson asked "how do you write 'goodbye' in French" when that word had not been shown/taught yet. It should start with flashcards before asking them to use the words. Can you review all lessons in Spanish 1, French 1, Latin 1, Spanish 2, French 2, and Latin 2 to ensure flash cards appear before the questions that ask how to use/spell those words?

   - Root cause: language lessons are loaded by filename order, and several Spanish/French/Latin units had practice lessons numbered before their flash-card ladders.
   - Fix: Spanish, French, and Latin units now load flash-card lessons first when a unit includes them, preserving existing lesson IDs while changing the in-app lesson sequence.
   - Verified: `npm test -- tests/curriculum.test.ts`, `npm test`, `npm run check`, `npm run content:validate`, and a language-unit audit showing 0 units with practice lessons before available flash cards.

5. On the main kid dashbaord (ex: /kid/ada) show the cards in 3 columns instead of 4 columns on desktop.

   - Root cause: `.track-grid` used a 240px minimum column width, allowing four cards to fit inside the desktop app shell.
   - Fix: increased the responsive minimum to 300px with a mobile-safe `min(100%, 300px)` guard, so the 1180px shell tops out at three columns.
   - Verified: `npm run check` and `npm run build`.

6. We need to divide the current tracks into two groups: scholastic (ex: math, vocabulary) and foundation (ex: Spanish, French, latin). Scholastic tracks are based on your actual grade level, while foundation tracks start you from the beginning regardless of your grade level. This will replace the "grade override" functionality we currently have in place. Grade 3 Spanish becomes Spanish 1, and they can only progress to Spanish 2 once completing all lessons in Spanish 1. This likely requires refactoring lots of code while also maintaining the existing data for completed tasks, since the students have used Grade 3 Spanish already. Instead of "Grade 3 Spanish" we will have "Spanish 1"

7. Review the v2-curriculum-plan and update it with regard to the new 'foundation' track functionality. 

8. Create docs/curriculum-summary.md file summarizing the tracks. Break it down by "scholastic" and "foundation". Each track should have a bulleted list showing all expected grades/levels and their current status. Ex: Math would have "Grade 3 (complete), Grade 4 (empty), Grade 5 (empty), Grade 6 (complete)... We'll use this as reference for future runs to build out more course work. It should also include the v2-curriculum-plan tracks. 
