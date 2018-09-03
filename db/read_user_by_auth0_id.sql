SELECT * FROM users
WHERE auth0_id = ${auth0Id}
LIMIT 1;