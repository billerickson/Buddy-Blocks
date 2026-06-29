CREATE INDEX IF NOT EXISTS idx_tracks_grade_subject_sort
  ON tracks(grade_level, subject, sort_order);

CREATE INDEX IF NOT EXISTS idx_tracks_subject_grade
  ON tracks(subject, grade_level);

CREATE INDEX IF NOT EXISTS idx_lessons_unit_sort
  ON lessons(unit_id, sort_order);

CREATE INDEX IF NOT EXISTS idx_child_lesson_progress_child_lesson
  ON child_lesson_progress(child_profile_id, lesson_id);

CREATE INDEX IF NOT EXISTS idx_child_track_progress_child_track
  ON child_track_progress(child_profile_id, track_id);

CREATE INDEX IF NOT EXISTS idx_child_subject_levels_child_subject
  ON child_subject_levels(child_profile_id, subject);
