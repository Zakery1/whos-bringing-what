DELETE FROM invitations 
WHERE event_id = ${eventId} AND user_id = ${userId};