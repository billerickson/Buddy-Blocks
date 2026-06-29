PRAGMA foreign_keys = OFF;

DELETE FROM question_attempts;
DELETE FROM lesson_attempts;
DELETE FROM child_daily_activity;
DELETE FROM child_track_progress;
DELETE FROM child_lesson_progress;
DELETE FROM child_subject_levels;
DELETE FROM questions;
DELETE FROM lessons;
DELETE FROM units;
DELETE FROM tracks;
DELETE FROM child_profiles;
DELETE FROM sessions;
DELETE FROM parents;

PRAGMA foreign_keys = ON;
