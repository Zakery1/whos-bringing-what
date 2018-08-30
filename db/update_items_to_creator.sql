UPDATE requesteditems 
SET spokenfor = false, user_id = (SELECT users.id FROM users JOIN events ON events.creator_id = users.auth0_id WHERE events.id = $1)
WHERE event_id = $1 AND user_id = $2;