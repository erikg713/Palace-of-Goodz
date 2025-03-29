-- Create the Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    pi_username VARCHAR(255) NOT NULL UNIQUE,
    wallet_address VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL, -- Ensure passwords are hashed before storing
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'user')) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_user_pi_username ON users (pi_username);
CREATE INDEX idx_user_wallet_address ON users (wallet_address);

-- Additional comments for clarity
-- pi_username: The username for the user
-- wallet_address: The wallet address associated with the user
-- password: The hashed password for the user
-- role: The role of the user (admin or user)
-- created_at: Timestamp of when the user was created
