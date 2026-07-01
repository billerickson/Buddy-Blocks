CREATE TABLE parents (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT UNIQUE,
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  parent_id TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (parent_id) REFERENCES parents(id) ON DELETE CASCADE
);

CREATE TABLE child_profiles (
  id TEXT PRIMARY KEY,
  parent_id TEXT NOT NULL,
  slug TEXT NOT NULL,
  display_name TEXT NOT NULL,
  avatar_key TEXT NOT NULL,
  level_band TEXT,
  grade_level INTEGER NOT NULL CHECK (grade_level BETWEEN 1 AND 12),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  hearts_remaining INTEGER NOT NULL DEFAULT 5,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE (parent_id, slug),
  FOREIGN KEY (parent_id) REFERENCES parents(id) ON DELETE CASCADE
);

CREATE TABLE tracks (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  subject TEXT NOT NULL,
  grade_level INTEGER NOT NULL CHECK (grade_level BETWEEN 1 AND 12),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  color TEXT NOT NULL,
  accent TEXT NOT NULL,
  sort_order INTEGER NOT NULL
);

CREATE TABLE units (
  id TEXT PRIMARY KEY,
  track_id TEXT NOT NULL,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  UNIQUE (track_id, slug),
  FOREIGN KEY (track_id) REFERENCES tracks(id) ON DELETE CASCADE
);

CREATE TABLE lessons (
  id TEXT PRIMARY KEY,
  unit_id TEXT NOT NULL,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  xp_base INTEGER NOT NULL DEFAULT 10,
  kind TEXT NOT NULL DEFAULT 'standard' CHECK (kind IN ('standard', 'mad-minute')),
  config_json TEXT,
  UNIQUE (unit_id, slug),
  FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE CASCADE
);

CREATE TABLE questions (
  id TEXT PRIMARY KEY,
  lesson_id TEXT NOT NULL,
  type TEXT NOT NULL,
  prompt TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  explanation TEXT,
  hint TEXT,
  sort_order INTEGER NOT NULL,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

CREATE TABLE lesson_attempts (
  id TEXT PRIMARY KEY,
  child_profile_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  client_attempt_id TEXT,
  started_at TEXT NOT NULL,
  completed_at TEXT NOT NULL,
  score_correct INTEGER NOT NULL,
  score_total INTEGER NOT NULL,
  xp_awarded INTEGER NOT NULL,
  hearts_remaining INTEGER NOT NULL,
  FOREIGN KEY (child_profile_id) REFERENCES child_profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

CREATE TABLE question_attempts (
  id TEXT PRIMARY KEY,
  lesson_attempt_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  is_correct INTEGER NOT NULL,
  answer_json TEXT NOT NULL,
  attempted_at TEXT NOT NULL,
  FOREIGN KEY (lesson_attempt_id) REFERENCES lesson_attempts(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

CREATE TABLE child_lesson_progress (
  id TEXT PRIMARY KEY,
  child_profile_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'locked' CHECK (status IN ('locked', 'available', 'completed')),
  completed_at TEXT,
  best_score_correct INTEGER NOT NULL DEFAULT 0,
  best_score_total INTEGER NOT NULL DEFAULT 0,
  UNIQUE (child_profile_id, lesson_id),
  FOREIGN KEY (child_profile_id) REFERENCES child_profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

CREATE TABLE child_track_progress (
  id TEXT PRIMARY KEY,
  child_profile_id TEXT NOT NULL,
  track_id TEXT NOT NULL,
  current_unit_id TEXT,
  current_lesson_id TEXT,
  lessons_completed INTEGER NOT NULL DEFAULT 0,
  xp_total INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL,
  UNIQUE (child_profile_id, track_id),
  FOREIGN KEY (child_profile_id) REFERENCES child_profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (track_id) REFERENCES tracks(id) ON DELETE CASCADE,
  FOREIGN KEY (current_unit_id) REFERENCES units(id) ON DELETE SET NULL,
  FOREIGN KEY (current_lesson_id) REFERENCES lessons(id) ON DELETE SET NULL
);

CREATE TABLE child_daily_activity (
  id TEXT PRIMARY KEY,
  child_profile_id TEXT NOT NULL,
  activity_date TEXT NOT NULL,
  lessons_completed INTEGER NOT NULL DEFAULT 0,
  xp_earned INTEGER NOT NULL DEFAULT 0,
  UNIQUE (child_profile_id, activity_date),
  FOREIGN KEY (child_profile_id) REFERENCES child_profiles(id) ON DELETE CASCADE
);

CREATE TABLE practice_sets (
  id TEXT PRIMARY KEY,
  child_profile_id TEXT NOT NULL,
  subject TEXT NOT NULL DEFAULT 'vocabulary',
  title TEXT NOT NULL,
  source TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'active', 'archived')),
  pinned INTEGER NOT NULL DEFAULT 0,
  starts_at TEXT,
  expires_at TEXT,
  archived_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (child_profile_id) REFERENCES child_profiles(id) ON DELETE CASCADE
);

CREATE TABLE practice_set_cards (
  id TEXT PRIMARY KEY,
  practice_set_id TEXT NOT NULL,
  term TEXT NOT NULL,
  definition TEXT,
  example TEXT,
  accepted_answers_json TEXT,
  sort_order INTEGER NOT NULL,
  FOREIGN KEY (practice_set_id) REFERENCES practice_sets(id) ON DELETE CASCADE
);

CREATE TABLE practice_set_attempts (
  id TEXT PRIMARY KEY,
  child_profile_id TEXT NOT NULL,
  practice_set_id TEXT NOT NULL,
  client_attempt_id TEXT,
  started_at TEXT NOT NULL,
  completed_at TEXT NOT NULL,
  score_correct INTEGER NOT NULL,
  score_total INTEGER NOT NULL,
  xp_awarded INTEGER NOT NULL,
  hearts_remaining INTEGER NOT NULL,
  FOREIGN KEY (child_profile_id) REFERENCES child_profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (practice_set_id) REFERENCES practice_sets(id) ON DELETE CASCADE
);

CREATE TABLE practice_card_attempts (
  id TEXT PRIMARY KEY,
  practice_set_attempt_id TEXT NOT NULL,
  practice_set_card_id TEXT,
  is_correct INTEGER NOT NULL,
  answer_json TEXT NOT NULL,
  attempted_at TEXT NOT NULL,
  FOREIGN KEY (practice_set_attempt_id) REFERENCES practice_set_attempts(id) ON DELETE CASCADE,
  FOREIGN KEY (practice_set_card_id) REFERENCES practice_set_cards(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_parents_username ON parents(username);
CREATE INDEX IF NOT EXISTS idx_parents_email ON parents(email);
CREATE INDEX IF NOT EXISTS idx_sessions_parent_id ON sessions(parent_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_child_profiles_parent_id ON child_profiles(parent_id);
CREATE INDEX IF NOT EXISTS idx_child_profiles_parent_status ON child_profiles(parent_id, status, display_name);
CREATE INDEX IF NOT EXISTS idx_tracks_grade_subject_sort ON tracks(grade_level, subject, sort_order);
CREATE INDEX IF NOT EXISTS idx_tracks_subject_grade ON tracks(subject, grade_level);
CREATE INDEX IF NOT EXISTS idx_units_track_id ON units(track_id);
CREATE INDEX IF NOT EXISTS idx_lessons_unit_id ON lessons(unit_id);
CREATE INDEX IF NOT EXISTS idx_lessons_unit_sort ON lessons(unit_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_questions_lesson_id ON questions(lesson_id);
CREATE INDEX IF NOT EXISTS idx_lesson_attempts_child ON lesson_attempts(child_profile_id, completed_at);
CREATE UNIQUE INDEX IF NOT EXISTS idx_lesson_attempts_child_client_attempt
  ON lesson_attempts(child_profile_id, client_attempt_id)
  WHERE client_attempt_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_child_lesson_progress_child_lesson
  ON child_lesson_progress(child_profile_id, lesson_id);
CREATE INDEX IF NOT EXISTS idx_child_track_progress_child_track
  ON child_track_progress(child_profile_id, track_id);
CREATE INDEX IF NOT EXISTS idx_child_daily_activity_child ON child_daily_activity(child_profile_id, activity_date);
CREATE INDEX IF NOT EXISTS idx_practice_sets_child_status
  ON practice_sets(child_profile_id, status, pinned, expires_at);
CREATE INDEX IF NOT EXISTS idx_practice_set_cards_set_sort
  ON practice_set_cards(practice_set_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_practice_set_attempts_child_set
  ON practice_set_attempts(child_profile_id, practice_set_id, completed_at);
CREATE UNIQUE INDEX IF NOT EXISTS idx_practice_set_attempts_child_client_attempt
  ON practice_set_attempts(child_profile_id, client_attempt_id)
  WHERE client_attempt_id IS NOT NULL;
