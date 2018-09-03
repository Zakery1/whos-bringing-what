UPDATE requesteditems 
SET spokenfor = true, user_id = ${userId}
WHERE id = ${itemId} 