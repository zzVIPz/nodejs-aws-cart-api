-- Insert test data into carts table
INSERT INTO carts (id, user_id, created_at, updated_at, status)
VALUES 
('550e8400-e29b-41d4-a716-446655440000', '123e4567-e89b-12d3-a456-426614174000', '2023-07-20', '2023-07-20', 'OPEN'),
('550e8400-e29b-41d4-a716-446655440001', '123e4567-e89b-12d3-a456-426614174001', '2023-07-21', '2023-07-21', 'ORDERED');

-- Insert test data into cart_items table
INSERT INTO cart_items (cart_id, product_id, count)
VALUES 
('550e8400-e29b-41d4-a716-446655440000', '123e4567-e89b-12d3-a456-426614174002', 2),
('550e8400-e29b-41d4-a716-446655440001', '123e4567-e89b-12d3-a456-426614174003', 1);