CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    piUsername VARCHAR(255) NOT NULL UNIQUE,
    walletAddress VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'user')) DEFAULT 'user',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_user_piUsername ON Users (piUsername);
CREATE INDEX idx_user_walletAddress ON Users (walletAddress);
