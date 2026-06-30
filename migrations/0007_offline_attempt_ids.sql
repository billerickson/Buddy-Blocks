ALTER TABLE lesson_attempts ADD COLUMN client_attempt_id TEXT;
ALTER TABLE practice_set_attempts ADD COLUMN client_attempt_id TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_lesson_attempts_child_client_attempt
  ON lesson_attempts(child_profile_id, client_attempt_id)
  WHERE client_attempt_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_practice_set_attempts_child_client_attempt
  ON practice_set_attempts(child_profile_id, client_attempt_id)
  WHERE client_attempt_id IS NOT NULL;
