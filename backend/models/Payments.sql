CREATE TABLE payments (
    id SERIAL PRIMARY KEY,          -- Auto-incrementing unique identifier for each payment
    uid VARCHAR(255) NOT NULL,      -- User ID from Pi Network
    product_id VARCHAR(255) NOT NULL, -- ID of the product being purchased
    amount DECIMAL(10, 2) NOT NULL, -- Amount of Pi being transacted
    memo TEXT,                      -- Optional memo or description of the transaction
    payment_id VARCHAR(255) NOT NULL UNIQUE, -- Unique identifier for the Pi Network payment
    txid VARCHAR(255),              -- Transaction ID from the Pi Network blockchain
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp of when the payment was created
);
