-- Drop tables to reset Database
DROP TABLE IF EXISTS users CASCADE; 
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS requesteditems CASCADE;
DROP TABLE IF EXISTS invitations CASCADE;

-- Users table to each user that has logged in
CREATE TABLE users (
id SERIAL PRIMARY KEY
, auth0_id TEXT
, email VARCHAR(100) 
, username VARCHAR(40) 
, profile_pic TEXT
);

-- Events given from Facebook
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
-- Creator id should match auth0_id from users table if user was creator of event
, creator_id TEXT
);


-- Inivitations table created to link users and events together
CREATE TABLE invitations (
id SERIAL PRIMARY KEY
, event_id INTEGER REFERENCES events(id)
, user_id INTEGER REFERENCES users(id)
);


CREATE TABLE requesteditems (
id SERIAL PRIMARY KEY
, name TEXT
, event_id INTEGER REFERENCES events(id)
, user_id INTEGER REFERENCES users(id)
, spokenfor BOOLEAN
);


-- Select ALL
SELECT * FROM users;
SELECT * FROM events;
SELECT * FROM requesteditems;
SELECT * FROM invitations;


-- Insert into Tests / Syntax 
INSERT INTO events
(event_id, event_name, cover_photo, description, place, city, country, latitude, longitude, state, zip, start_time, creator_id)
VALUES
();

INSERT INTO requesteditems 
(name, event_id, user_id, spokenfor)
VALUES
();

INSERT INTO invitations 
(event_id, user_id)
VALUES
();