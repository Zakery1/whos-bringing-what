SELECT events.id, events.event_id, event_name, cover_photo, description, place, start_time, events.user_id FROM invitations
JOIN events ON invitations.event_id = events.id 
WHERE invitations.user_id = $1;