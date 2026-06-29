# QA Testing

## Round 1

1. Previously, when inside a kid profile, clicking the "Buddy Blocks" logo at the top took you to their dashboard (ex: /kid/Reagan), but now it takes me to the parent dashboard. Can you restore the previous functionality? It might have been lost/reverted in a recent change.

2. Can you check all lessons and make sure the answers are mixed up? On the Grade 6 Vocabulary > Context And Reference Skills > Easy Context Cards, the answer to every question was (A) the first choice.

3. On the "Match each word to an example" question type, if you press the wrong word and match it to something else, there's no way to undo your selection and select the correct word. They should be able to undo the selection without submitting the wrong answer.

4. On French 1, the second question of the first lesson asked "how do you write 'goodbye' in French" when that word had not been shown/taught yet. It should start with flashcards before asking them to use the words. Can you review all lessons in Spanish 1, French 1, Latin 1, Spanish 2, French 2, and Latin 2 to ensure flash cards appear before the questions that ask how to use/spell those words?

5. On the main kid dashbaord (ex: /kid/ada) show the cards in 3 columns instead of 4 columns on desktop.

6. We need to divide the current tracks into two groups: scholastic (ex: math, vocabulary) and foundation (ex: Spanish, French, latin). Scholastic tracks are based on your actual grade level, while foundation tracks start you from the beginning regardless of your grade level. This will replace the "grade override" functionality we currently have in place. Grade 3 Spanish becomes Spanish 1, and they can only progress to Spanish 2 once completing all lessons in Spanish 1. This likely requires refactoring lots of code while also maintaining the existing data for completed tasks, since the students have used Grade 3 Spanish already. Instead of "Grade 3 Spanish" we will have "Spanish 1"

7. Review the v2-curriculum-plan and update it with regard to the new 'foundation' track functionality. 

8. Create docs/curriculum-summary.md file summarizing the tracks. Break it down by "scholastic" and "foundation". Each track should have a bulleted list showing all expected grades/levels and their current status. Ex: Math would have "Grade 3 (complete), Grade 4 (empty), Grade 5 (empty), Grade 6 (complete)... We'll use this as reference for future runs to build out more course work. It should also include the v2-curriculum-plan tracks. 