SELECT * FROM users
WHERE auth0_id = $1 
LIMIT 1;