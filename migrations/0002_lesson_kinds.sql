ALTER TABLE lessons ADD COLUMN kind TEXT NOT NULL DEFAULT 'standard' CHECK (kind IN ('standard', 'mad-minute'));
ALTER TABLE lessons ADD COLUMN config_json TEXT;
