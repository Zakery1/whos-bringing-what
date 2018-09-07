const express = require("express");
const expressGraphQL = require('express-graphql');
const massive = require("massive");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const c = require('./controller/controller');
const uC = require('./controller/user_controller');
const schema = require("./schema")
const sgMail = require('@sendgrid/mail'); //sendgrid library to send emails 


require("dotenv").config();

// var session = require('express-session');
var RedisStore = require('connect-redis')(session);
const app = express();

// Comment out when deploying site live
// app.use((req, res, next) => {
//       res.header("Access-Control-Allow-Origin", "*");
//       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//       next();
// });

app.use(bodyParser.json());
app.use(session({
    store: new RedisStore( {url: process.env.REDIS_URL} ),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false, 
    resave: false
  }));

app.use(cors()); //utilize Cors so the browser doesn't restrict data, without it Sendgrid  not send!

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

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);


// Welcome page of the express server: 
app.get('/', (req, res) => {
    res.send("Welcome to the Sendgrid Emailing Server"); 
});

//SendGrid Emailer
app.get('/send-email', (req,res) => {
    
    //Get Variables from query string in the search bar
    const { recipient, sender, topic, text } = req.query; 

    //Sendgrid Data Requirements
    const msg = {
        to: 'whosbringingwhat@yahoo.com',  //recipient
        from: sender,
        subject: topic,
        text: text,
       
    }

    //Send Email
    sgMail.send(msg)
    .then((msg) => console.log(text));
});

// Server request to login
app.get('/auth/callback', uC.login);

// Server request to get user data to display on Navbar
app.get('/api/user-data', checkLoggedIn, c.readUserBySession);

// Server request to get user info 
app.get('/api/user-info/:userId', c.readUser);

// Server request to get user info 
app.get('/api/user-event/:eventId', c.readUserWithEventId);

// Server request to get user data for auth0_id 
app.get('/api/user', checkLoggedIn, c.readUserWithAuth0Id)

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

// Server request to get all users that are invited to a certain event
app.get('/api/users_invited_event/:eventId', c.readUsersInvitedEvent)


// Server request to get all Created Events through user 
app.get('/api/created_events', c.readCreatedEvents);

// Server request to get all Invited Events through user 
app.get('/api/invited_events', c.readInvitedEvents);

// Server request to get an event through eventId
app.get('/api/event/:eventId', c.readEvent);

// Server request to get an event through eventId
app.get('/api/requested_items/:eventId', c.readRequestedItems);

// Server request to POST requestedItems by Creator of Event
app.post('/api/post_requested_item/:eventId/:userId', uC.createRequestedItem);

// Server request to DELETE requestedItems by Creator of Event
app.delete('/api/delete_requested_item/:itemId', uC.deleteRequestedItem);

// Server request to UPDATE requestedItems by Creator of Event
app.patch('/api/patch_requested_item/:itemId', uC.updateRequestedItem);

// Server request to Assign item to user
app.patch('/api/patch_spoken_for_item/:eventId/:userId/:itemId', uC.updateSpokenForItem)

// Server request to Un-assign item to user
app.patch('/api/patch_assigned_item/:eventId/:itemId', uC.unassignItem)

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
  })

PORT = process.env.PORT;
app.listen(PORT, () => console.log('Server is sailing on port ' + PORT + ' ⛵'))

module.exports = app;