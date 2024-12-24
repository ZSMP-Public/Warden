CREATE TABLE linking_requests
(
    hash           VARCHAR(64) PRIMARY KEY,
    discord_id     VARCHAR(20) NOT NULL,
    created_at     TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    minecraft_uuid VARCHAR(36),
    status         VARCHAR(20) DEFAULT 'pending',
    expires_at     TIMESTAMP
);

CREATE TABLE linked_accounts
(
    discord_id     VARCHAR(20) PRIMARY KEY,
    minecraft_uuid VARCHAR(36) UNIQUE NOT NULL,
    linked_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_linking_requests_status ON linking_requests (status);
CREATE INDEX idx_linking_requests_expires_at ON linking_requests (expires_at);