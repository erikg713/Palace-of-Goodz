CREATE TABLE Products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price > 0),
    seller UUID NOT NULL,
    imageUrl TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_product_name ON Products (name);
CREATE INDEX idx_product_price ON Products (price);

-- Separate Seller table
CREATE TABLE Sellers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Adding foreign key constraint
ALTER TABLE Products
ADD CONSTRAINT fk_seller
FOREIGN KEY (seller) REFERENCES Sellers(id);
