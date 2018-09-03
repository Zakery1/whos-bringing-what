SELECT events.id, events.event_id, events.creator_id, events.event_name FROM users
JOIN invitations on(users.id = invitations.user_id)
JOIN events on(invitations.event_id = events.id)
WHERE users.auth0_id = ${auth0Id};