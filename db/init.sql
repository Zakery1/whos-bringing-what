DROP TABLE IF EXISTS users CASCADE; 
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS requesteditems CASCADE;
DROP TABLE IF EXISTS invitations CASCADE;

CREATE TABLE users (
id SERIAL PRIMARY KEY
, auth0_id TEXT
, email VARCHAR(100) 
, username VARCHAR(40) 
, profile_pic TEXT
);

CREATE TABLE events (
id SERIAL PRIMARY KEY
, event_id TEXT
, event_name TEXT
, cover_photo TEXT
, description TEXT
, place TEXT
, city TEXT
, country TEXT
, latitude DECIMAL
, longitude DECIMAL
, state TEXT 
, street TEXT 
, zip TEXT  
, start_time TEXT
, creator_id TEXT
);

CREATE TABLE requesteditems (
id SERIAL PRIMARY KEY
, name TEXT
, event_id INTEGER REFERENCES events(id)
, user_id INTEGER REFERENCES users(id)
, spokenfor BOOLEAN
);

CREATE TABLE invitations (
id SERIAL PRIMARY KEY
, event_id INTEGER REFERENCES events(id)
, user_id INTEGER REFERENCES users(id)
);

-- Dummy Data



-- Have to insert users then log in for INSERT INTO events to work
INSERT INTO events 
(event_id, event_name, cover_photo, description, place, start_time, user_id)
VALUES 


INSERT INTO requesteditems 
(name, event_id, user_id, spokenfor)
VALUES
('jellyfish', 1, 1, false)
, ('pizza', 1, 2, true)
, ('fireworks', 2, 1, false)
, ('cheese sticks', 3, 1, false)
, ('cups', 4, 4, false);

INSERT INTO invitations 
(event_id, user_id)
VALUES
(1,1)
, (1,2)
, (2,3)
, (3,3)
, (4,4)
, (1,4);

-- Select ALL
SELECT * FROM users;
SELECT * FROM events;
SELECT * FROM requesteditems;
SELECT * FROM invitations;