CREATE TABLE IF NOT EXISTS practice_sets (
  id TEXT PRIMARY KEY,
  child_profile_id TEXT NOT NULL,
  subject TEXT NOT NULL DEFAULT 'vocabulary',
  title TEXT NOT NULL,
  source TEXT,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('draft', 'active', 'archived')),
  pinned INTEGER NOT NULL DEFAULT 0,
  starts_at TEXT,
  expires_at TEXT,
  archived_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (child_profile_id) REFERENCES child_profiles(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS practice_set_cards (
  id TEXT PRIMARY KEY,
  practice_set_id TEXT NOT NULL,
  term TEXT NOT NULL,
  definition TEXT,
  example TEXT,
  accepted_answers_json TEXT,
  sort_order INTEGER NOT NULL,
  FOREIGN KEY (practice_set_id) REFERENCES practice_sets(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS practice_set_attempts (
  id TEXT PRIMARY KEY,
  child_profile_id TEXT NOT NULL,
  practice_set_id TEXT NOT NULL,
  started_at TEXT NOT NULL,
  completed_at TEXT NOT NULL,
  score_correct INTEGER NOT NULL,
  score_total INTEGER NOT NULL,
  xp_awarded INTEGER NOT NULL,
  hearts_remaining INTEGER NOT NULL,
  FOREIGN KEY (child_profile_id) REFERENCES child_profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (practice_set_id) REFERENCES practice_sets(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS practice_card_attempts (
  id TEXT PRIMARY KEY,
  practice_set_attempt_id TEXT NOT NULL,
  practice_set_card_id TEXT,
  is_correct INTEGER NOT NULL,
  answer_json TEXT NOT NULL,
  attempted_at TEXT NOT NULL,
  FOREIGN KEY (practice_set_attempt_id) REFERENCES practice_set_attempts(id) ON DELETE CASCADE,
  FOREIGN KEY (practice_set_card_id) REFERENCES practice_set_cards(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_practice_sets_child_status
  ON practice_sets(child_profile_id, status, pinned, expires_at);

CREATE INDEX IF NOT EXISTS idx_practice_set_cards_set_sort
  ON practice_set_cards(practice_set_id, sort_order);

CREATE INDEX IF NOT EXISTS idx_practice_set_attempts_child_set
  ON practice_set_attempts(child_profile_id, practice_set_id, completed_at);
