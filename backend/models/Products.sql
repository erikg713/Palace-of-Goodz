CREATE TABLE Products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price > 0),
    seller VARCHAR(255) NOT NULL,
    imageUrl TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_product_name ON Products (name);
CREATE INDEX idx_product_price ON Products (price);
CREATE INDEX idx_product_seller ON Products (seller);
