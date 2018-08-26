DROP TABLE IF EXISTS users CASCADE; 
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS requesteditems CASCADE;
DROP TABLE IF EXISTS invitations CASCADE;

CREATE TABLE users (
id SERIAL PRIMARY KEY
, auth0_id TEXT
, email VARCHAR(100) 
, username VARCHAR(40) UNIQUE
, profile_pic TEXT
);

CREATE TABLE events (
id SERIAL PRIMARY KEY
, event_id TEXT
, event_name TEXT
, cover_photo TEXT
, description TEXT
, place TEXT
, start_time INTEGER
, user_id INTEGER REFERENCES users(id)
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

INSERT INTO users 
(auth0_id,email,username,profile_pic)
VALUES
('123abc','gmail@andrew.com','andrew','http://www.readersdigest.ca/wp-content/uploads/2013/03/6-facts-to-know-before-owning-a-puppy.jpg')
, ('123ade', 'gmail@zak.com', 'zak', 'https://snworksceo.imgix.net/dtc/10ec0a64-8f9d-46d9-acee-5ef9094d229d.sized-1000x1000.jpg');

INSERT INTO events 
(event_id, event_name, cover_photo, description, place, start_time, user_id)
VALUES 
('5', 'BBQ', 'https://s3-media4.fl.yelpcdn.com/bphoto/ZMi0ykSsPismX_M-0cT6lw/o.jpg', 'Grilled Jellyfish for Abraham', 'at my place', 5, 1);

INSERT INTO requesteditems 
(name, event_id, user_id, spokenfor)
VALUES
('jellyfish', 1, 1, false)
, ('pizza', 1, 2, true);

INSERT INTO invitations 
(event_id, user_id)
VALUE
(1,1)
, (1,2);

-- Select ALL
SELECT * FROM users;
SELECT * FROM events;
SELECT * FROM requesteditems;
SELECT * FROM invitations;