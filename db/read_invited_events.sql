SELECT events.id, event_name, cover_photo, description, place, city, country, latitude, longitude, state, street, zip, start_time FROM events
JOIN invitations ON invitations.event_id = events.id 
WHERE invitations.user_id = $1;