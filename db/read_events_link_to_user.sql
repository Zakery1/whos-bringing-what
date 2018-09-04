SELECT events.id, events.event_id, events.event_name, events.cover_photo, events.description, events.place, events.city,
events.country, events.latitude, events.longitude, events.state, events.street, events.zip, events.start_time, events.creator_id
FROM users
JOIN invitations on(users.id = invitations.user_id)
JOIN events on(invitations.event_id = events.id)
WHERE users.auth0_id = ${auth0Id};

