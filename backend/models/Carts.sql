CREATE TABLE Carts (
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL REFERENCES Users(id),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE CartProducts (
    id SERIAL PRIMARY KEY,
    cartId INTEGER NOT NULL REFERENCES Carts(id) ON DELETE CASCADE,
    productId INTEGER NOT NULL REFERENCES Products(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    UNIQUE (cartId, productId)
);

-- Indexes for performance
CREATE INDEX idx_cart_userId ON Carts (userId);
CREATE INDEX idx_cartProducts_cartId ON CartProducts (cartId);
CREATE INDEX idx_cartProducts_productId ON CartProducts (productId);
