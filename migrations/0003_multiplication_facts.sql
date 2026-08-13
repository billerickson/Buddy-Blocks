ALTER TABLE child_daily_activity
  ADD COLUMN practice_sessions_completed INTEGER NOT NULL DEFAULT 0;

CREATE TABLE multiplication_sessions (
  id TEXT PRIMARY KEY,
  child_profile_id TEXT NOT NULL,
  client_attempt_id TEXT NOT NULL,
  mode TEXT NOT NULL CHECK (mode IN ('practice', 'timed')),
  selected_factors_json TEXT NOT NULL,
  selection_key TEXT NOT NULL,
  duration_seconds INTEGER CHECK (duration_seconds IS NULL OR duration_seconds IN (60, 120)),
  input_method TEXT NOT NULL CHECK (input_method IN ('keyboard', 'voice', 'mixed')),
  started_at TEXT NOT NULL,
  completed_at TEXT NOT NULL,
  score_correct INTEGER NOT NULL,
  score_total INTEGER NOT NULL,
  xp_awarded INTEGER NOT NULL,
  UNIQUE (child_profile_id, client_attempt_id),
  FOREIGN KEY (child_profile_id) REFERENCES child_profiles(id) ON DELETE CASCADE
);

CREATE TABLE multiplication_fact_attempts (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  sequence_number INTEGER NOT NULL,
  factor INTEGER NOT NULL CHECK (factor BETWEEN 1 AND 12),
  multiplier INTEGER NOT NULL CHECK (multiplier BETWEEN 1 AND 12),
  answer INTEGER NOT NULL,
  is_correct INTEGER NOT NULL CHECK (is_correct IN (0, 1)),
  response_ms INTEGER,
  input_method TEXT NOT NULL CHECK (input_method IN ('keyboard', 'voice')),
  attempted_at TEXT NOT NULL,
  UNIQUE (session_id, sequence_number),
  FOREIGN KEY (session_id) REFERENCES multiplication_sessions(id) ON DELETE CASCADE
);

CREATE TABLE child_multiplication_mastery (
  child_profile_id TEXT NOT NULL,
  factor INTEGER NOT NULL CHECK (factor BETWEEN 1 AND 12),
  multiplier INTEGER NOT NULL CHECK (multiplier BETWEEN 1 AND 12),
  attempts INTEGER NOT NULL DEFAULT 0,
  correct INTEGER NOT NULL DEFAULT 0,
  correct_streak INTEGER NOT NULL DEFAULT 0,
  best_keyboard_response_ms INTEGER,
  last_response_ms INTEGER,
  last_input_method TEXT CHECK (last_input_method IS NULL OR last_input_method IN ('keyboard', 'voice')),
  last_practiced_at TEXT NOT NULL,
  PRIMARY KEY (child_profile_id, factor, multiplier),
  FOREIGN KEY (child_profile_id) REFERENCES child_profiles(id) ON DELETE CASCADE
);

CREATE INDEX idx_multiplication_sessions_child_completed
  ON multiplication_sessions(child_profile_id, completed_at DESC);
CREATE INDEX idx_multiplication_sessions_child_selection
  ON multiplication_sessions(child_profile_id, selection_key, score_correct DESC);
CREATE INDEX idx_multiplication_fact_attempts_session
  ON multiplication_fact_attempts(session_id, sequence_number);
CREATE INDEX idx_child_multiplication_mastery_child
  ON child_multiplication_mastery(child_profile_id, factor, multiplier);
