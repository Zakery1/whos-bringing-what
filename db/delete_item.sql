DELETE FROM requesteditems 
WHERE id = ${itemId}
RETURNING *;