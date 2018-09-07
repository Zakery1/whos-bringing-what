SELECT * FROM users
WHERE auth0_id = (SELECT creator_id FROM events where id = ${eventId})
LIMIT 1;