-- Create carts table
CREATE TABLE carts (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    status VARCHAR(8) CHECK (status IN ('OPEN', 'ORDERED')) NOT NULL
);

-- Create cart_items table
CREATE TABLE cart_items (
    cart_id UUID REFERENCES carts(id),
    product_id UUID,
    count INTEGER,
    PRIMARY KEY (cart_id, product_id)
);