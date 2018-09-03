UPDATE requesteditems 
SET spokenfor = false, user_id = (SELECT users.id FROM users JOIN events ON events.creator_id = users.auth0_id WHERE events.id = ${eventId})
WHERE event_id = ${eventId} AND user_id = ${userId};