CREATE TABLE IF NOT EXISTS hosted_interest_emails (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  source TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_hosted_interest_emails_created_at
  ON hosted_interest_emails(created_at);
