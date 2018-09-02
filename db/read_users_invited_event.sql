SELECT users.id, users.username, users.profile_pic FROM users 
JOIN invitations on(users.id = invitations.user_id)
JOIN events on(invitations.event_id = events.id)
WHERE events.id = ${eventId};  