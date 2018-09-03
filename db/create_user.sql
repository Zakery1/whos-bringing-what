INSERT INTO users
(auth0_id, email, username, profile_pic)
VALUES
(${auth0Id}, ${email}, ${username}, ${profilePicture})
RETURNING *;