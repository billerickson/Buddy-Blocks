CREATE TABLE device_pairings (
  id TEXT PRIMARY KEY,
  code_hmac TEXT NOT NULL UNIQUE,
  poll_secret_hash TEXT NOT NULL,
  proposed_device_id TEXT NOT NULL,
  proposed_token_hash TEXT NOT NULL,
  source_fingerprint TEXT NOT NULL,
  hardware_model TEXT NOT NULL,
  hardware_revision TEXT NOT NULL,
  firmware_version TEXT NOT NULL,
  api_version INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'claimed', 'expired', 'cancelled')),
  claimed_child_profile_id TEXT,
  failed_claim_count INTEGER NOT NULL DEFAULT 0 CHECK (failed_claim_count BETWEEN 0 AND 20),
  failed_poll_count INTEGER NOT NULL DEFAULT 0 CHECK (failed_poll_count BETWEEN 0 AND 100),
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  claimed_at TEXT,
  FOREIGN KEY (claimed_child_profile_id) REFERENCES child_profiles(id) ON DELETE SET NULL
);

CREATE TABLE child_devices (
  id TEXT PRIMARY KEY,
  child_profile_id TEXT NOT NULL,
  name TEXT NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'revoked')),
  hardware_model TEXT NOT NULL,
  hardware_revision TEXT NOT NULL,
  firmware_version TEXT NOT NULL,
  api_version INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  last_seen_at TEXT,
  revoked_at TEXT,
  FOREIGN KEY (child_profile_id) REFERENCES child_profiles(id) ON DELETE CASCADE
);

CREATE TABLE device_pairing_claim_limits (
  source_fingerprint TEXT PRIMARY KEY,
  window_started_at TEXT NOT NULL,
  attempt_count INTEGER NOT NULL CHECK (attempt_count BETWEEN 1 AND 1000)
);

CREATE TABLE device_auth_failure_limits (
  source_fingerprint TEXT PRIMARY KEY,
  window_started_at TEXT NOT NULL,
  attempt_count INTEGER NOT NULL CHECK (attempt_count BETWEEN 1 AND 1000),
  last_attempt_at TEXT NOT NULL
);

CREATE TABLE child_content_revisions (
  child_profile_id TEXT PRIMARY KEY,
  flash_cards_revision INTEGER NOT NULL DEFAULT 0 CHECK (flash_cards_revision >= 0),
  updated_at TEXT NOT NULL,
  FOREIGN KEY (child_profile_id) REFERENCES child_profiles(id) ON DELETE CASCADE
);

CREATE TABLE flash_card_study_sessions (
  id TEXT PRIMARY KEY,
  child_profile_id TEXT NOT NULL,
  device_id TEXT NOT NULL,
  practice_set_id TEXT NOT NULL,
  client_attempt_id TEXT NOT NULL,
  content_revision INTEGER NOT NULL CHECK (content_revision >= 0),
  started_at TEXT NOT NULL,
  completed_at TEXT NOT NULL,
  received_at TEXT NOT NULL,
  unique_cards INTEGER NOT NULL CHECK (unique_cards >= 0),
  first_pass_got_it INTEGER NOT NULL CHECK (first_pass_got_it >= 0),
  total_reviews INTEGER NOT NULL CHECK (total_reviews >= 0),
  duration_seconds INTEGER NOT NULL CHECK (duration_seconds >= 0),
  payload_hash TEXT NOT NULL,
  FOREIGN KEY (child_profile_id) REFERENCES child_profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (device_id) REFERENCES child_devices(id) ON DELETE CASCADE,
  FOREIGN KEY (practice_set_id) REFERENCES practice_sets(id) ON DELETE CASCADE
);

CREATE TABLE flash_card_study_reviews (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  practice_set_card_id TEXT,
  card_fingerprint TEXT NOT NULL,
  rating TEXT NOT NULL CHECK (rating IN ('again', 'got_it')),
  shown_count INTEGER NOT NULL CHECK (shown_count BETWEEN 1 AND 1000),
  response_ms INTEGER CHECK (response_ms IS NULL OR response_ms BETWEEN 0 AND 600000),
  reviewed_at TEXT NOT NULL,
  FOREIGN KEY (session_id) REFERENCES flash_card_study_sessions(id) ON DELETE CASCADE,
  FOREIGN KEY (practice_set_card_id) REFERENCES practice_set_cards(id) ON DELETE SET NULL
);

CREATE INDEX idx_device_pairings_status_expires
  ON device_pairings(status, expires_at);
CREATE INDEX idx_device_pairings_proposed_device_created
  ON device_pairings(proposed_device_id, created_at DESC);
CREATE INDEX idx_device_pairings_source_created
  ON device_pairings(source_fingerprint, created_at DESC);
CREATE INDEX idx_child_devices_child_status
  ON child_devices(child_profile_id, status, updated_at DESC);
CREATE INDEX idx_child_devices_status_seen
  ON child_devices(status, last_seen_at);
CREATE INDEX idx_device_auth_failure_limits_last_attempt
  ON device_auth_failure_limits(last_attempt_at);
CREATE UNIQUE INDEX idx_flash_card_study_sessions_child_attempt
  ON flash_card_study_sessions(child_profile_id, client_attempt_id);
CREATE INDEX idx_flash_card_study_sessions_child_completed
  ON flash_card_study_sessions(child_profile_id, completed_at DESC);
CREATE INDEX idx_flash_card_study_reviews_session
  ON flash_card_study_reviews(session_id, reviewed_at);

ALTER TABLE multiplication_sessions
  ADD COLUMN device_payload_hash TEXT;
