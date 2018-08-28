DELETE FROM requesteditems 
WHERE id = $1
RETURNING *;