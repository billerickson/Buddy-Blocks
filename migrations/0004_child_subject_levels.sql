CREATE TABLE IF NOT EXISTS child_subject_levels (
  id TEXT PRIMARY KEY,
  child_profile_id TEXT NOT NULL,
  subject TEXT NOT NULL,
  grade_level INTEGER NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE (child_profile_id, subject),
  FOREIGN KEY (child_profile_id) REFERENCES child_profiles(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_child_subject_levels_child ON child_subject_levels(child_profile_id);

INSERT INTO child_subject_levels (id, child_profile_id, subject, grade_level, updated_at)
SELECT 'subject_level_' || id || '_spanish', id, 'spanish', 3, strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
FROM child_profiles
WHERE slug = 'reagan'
ON CONFLICT(child_profile_id, subject) DO UPDATE SET
  grade_level = excluded.grade_level,
  updated_at = excluded.updated_at;
