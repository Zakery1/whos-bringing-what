const express = require("express");
const expressGraphQL = require("express-graphql");
const massive = require("massive");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const c = require('./controller/controller');
const uC = require('./controller/user_controller');
const schema = require("./schema")
require("dotenv").config();

// var session = require('express-session');
var RedisStore = require('connect-redis')(session);
const app = express();

app.use(bodyParser.json());
app.use(session({
    store: new RedisStore( {url: process.env.REDIS_URL} ),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false, 
    resave: false
  }));
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))
app.use(express.static( `${__dirname}/../build`));


massive(process.env.CONNECTION_STRING).then(database => {
    app.set('db', database)
}).catch(error => {
    console.log('Error with Massive', error)
})

// Server request to login
app.get('/auth/callback', uC.login);

// Server request to get user data to display on Navbar
app.get('/api/user-data', checkLoggedIn, c.readUser);

// Middleware to check if user is logged in
function checkLoggedIn(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.json({
        username: '',
        profilePicture: '',
        userId: 0
       });
    }
  }

// Server request to logout 
app.post('/api/auth/logout', uC.logout);


// Server request to get all Created Events through user 
app.get('/api/createdEvents', c.readCreatedEvents);

// Server request to get all Invited Events through user 
app.get('/api/invitedEvents', c.readInvitedEvents);

// Server request to get an event through eventId
app.get('/api/event/:eventId', c.readEvent);

// Server request to get an event through eventId
app.get('/api/requestedItems/:eventId', c.readRequestedItems);

// Server request to POST requestedItems by Creator of Event
app.post('/api/post_requestedItem/:eventId', uC.createRequestedItem);

// Server request to DELETE requestedItems by Creator of Event
app.delete('/api/delete_requestedItem/:itemId/:eventId', uC.deleteRequestedItem);

// Server request to UPDATE requestedItems by Creator of Event
app.patch('/api/patch_requestedItem/:itemId/:eventId', uC.updateRequestedItem);

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
  })

PORT = process.env.PORT;
app.listen(PORT, () => console.log('Server is sailing on port ' + PORT + ' ⛵'))
