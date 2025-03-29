CREATE TABLE payments (
    id SERIAL PRIMARY KEY,          -- Auto-incrementing unique identifier for each payment
    uid VARCHAR(255) NOT NULL,      -- User ID from Pi Network
    product_id VARCHAR(255) NOT NULL, -- ID of the product being purchased
    amount DECIMAL(10, 2) NOT NULL, -- Amount of Pi being transacted
    memo TEXT,                      -- Optional memo or description of the transaction
    payment_id VARCHAR(255) NOT NULL UNIQUE, -- Unique identifier for the Pi Network payment
    txid VARCHAR(255),              -- Transaction ID from the Pi Network blockchain
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp of when the payment was created
    -- Foreign key constraints
    CONSTRAINT fk_user FOREIGN KEY (uid) REFERENCES users(uid),
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Indexes for improving query performance
CREATE INDEX idx_uid ON payments(uid);
CREATE INDEX idx_product_id ON payments(product_id);
CREATE INDEX idx_txid ON payments(txid);
