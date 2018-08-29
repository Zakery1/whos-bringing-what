INSERT INTO events 
(event_id, event_name, cover_photo, description, place, city, country, latitude, longitude, state, street, zip, start_time, creator_id)
VALUES 
(${eventId}, ${eventName}, ${eventPhoto}, ${description}, ${place}, ${city}, ${country}, ${latitude}, ${longitude}, ${state}, ${street}, ${zip}, ${startTime}, ${creatorId})
RETURNING *;
