DROP TABLE IF EXISTS users CASCADE; 

CREATE TABLE users (
id SERIAL PRIMARY KEY
, auth0_id TEXT
, email VARCHAR(100) 
, username VARCHAR(40) UNIQUE
, profile_pic TEXT
);

-- Dummy Data

INSERT INTO users 
(auth0_id,email,username,profile_pic)
VALUES
('123abc','gmail@andrew.com','andrew','http://www.readersdigest.ca/wp-content/uploads/2013/03/6-facts-to-know-before-owning-a-puppy.jpg');