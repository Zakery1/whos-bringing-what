INSERT INTO requesteditems 
(name, event_id, user_id, spokenfor)
VALUES
(${name}, ${eventId}, ${userId}, ${spokenfor})
RETURNING *;
