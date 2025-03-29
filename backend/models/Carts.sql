-- Table to store carts information
CREATE TABLE Carts (
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE, -- Foreign key reference to Users table
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp of cart creation
);

-- Table to store products within carts
CREATE TABLE CartProducts (
    id SERIAL PRIMARY KEY,
    cartId INTEGER NOT NULL REFERENCES Carts(id) ON DELETE CASCADE, -- Foreign key reference to Carts table
    productId INTEGER NOT NULL REFERENCES Products(id), -- Foreign key reference to Products table
    quantity INTEGER NOT NULL DEFAULT 1, -- Quantity of the product
    UNIQUE (cartId, productId) -- Unique constraint to prevent duplicate products in a cart
);

-- Indexes for performance
CREATE INDEX idx_cart_userId ON Carts (userId);
CREATE INDEX idx_cartProducts_cartId ON CartProducts (cartId);
CREATE INDEX idx_cartProducts_productId ON CartProducts (productId);
