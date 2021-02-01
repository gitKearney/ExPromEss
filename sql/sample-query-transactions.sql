SELECT
   t.transaction_id
  ,tp.product_id
  ,p.title
  ,tp.product_price
  ,tp.created_at
FROM transactions AS t
INNER JOIN transaction_products AS tp ON t.transaction_id = tp.transaction_id
INNER JOIN products AS p ON tp.product_id = p.product_id
WHERE t.transaction_id = '12345678-1234-1234-1234-123456789000'