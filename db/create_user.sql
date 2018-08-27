INSERT INTO users
(auth0_id, email, username, profile_pic)
VALUES
(${auth0id}, ${email}, ${username}, ${profilePicture})
RETURNING *;