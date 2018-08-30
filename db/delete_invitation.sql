DELETE FROM invitations 
WHERE event_id = $1 AND user_id = $2;