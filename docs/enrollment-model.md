# Grade And Enrollment Model

Buddy Blocks uses two track groups:

- Scholastic tracks use the child's global `grade_level`. Math and Vocabulary are scholastic.
- Foundation tracks start every child at the first available level regardless of global grade. Spanish, French, Latin, Grammar, Logic, Rhetoric, Literature, History And Civics, and Memory Work are foundation.

For the current family setup, this means:

- Reagan is globally Grade 6 and sees Grade 6 scholastic tracks plus available level 1 foundation tracks.
- Ada is globally Grade 3 and sees Grade 3 scholastic tracks plus available level 1 foundation tracks.
- Bill is a Grade 6 test profile and sees Grade 6 scholastic tracks plus available level 1 foundation tracks.

The old per-subject grade override API has been removed from the app surface. Existing `child_subject_levels` rows can remain in the database for historical compatibility, but track access no longer reads them.

## Foundation Sequence Behavior

Foundation tracks still use the existing `grade_level` column as their stored level order:

- Grade 3 language tracks are level 1 courses, titled Spanish 1, French 1, and Latin 1.
- Grade 4 language tracks are level 2 courses, titled Spanish 2, French 2, and Latin 2.
- Grade 3 v2 classical tracks are level 1 courses, titled Grammar I, Logic I, Rhetoric I, Classical Literature I, History And Civics I, and Memory Work I.
- A level 2 foundation track becomes visible only after the same child completes every lesson in level 1 for that subject.
- Existing lesson, track, and progress IDs are preserved, so completed Grade 3 Spanish work continues to count toward Spanish 1.

Kid Home groups visible tracks into Scholastic and Foundation sections. Completed foundation tracks remain accessible, and the next foundation level can become the recommended lesson after it unlocks.

## Future Assignment Layer

Do not add assignment tables unless product requirements change. A future `child_track_assignments` layer could support pinned review tracks, multiple active tracks in one subject, or custom special courses. Until then, use the scholastic/foundation model for track visibility and practice sets for temporary school vocabulary.
