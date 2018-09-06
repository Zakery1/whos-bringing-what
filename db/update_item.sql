UPDATE requesteditems 
SET name = ${name}
WHERE id = ${itemId}
RETURNING *;