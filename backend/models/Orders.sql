CREATE TABLE Orders (
    id SERIAL PRIMARY KEY,
    paymentId VARCHAR(255) NOT NULL UNIQUE,
    productId INTEGER NOT NULL REFERENCES Products(id),
    buyer VARCHAR(255) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_order_paymentId ON Orders (paymentId);
CREATE INDEX idx_order_productId ON Orders (productId);
CREATE INDEX idx_order_buyer ON Orders (buyer);
