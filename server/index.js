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

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false, 
    resave: false
  }));
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))
// app.use(express.static( `${__dirname}/../build`));


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

// app.get('*', (req, res)=>{
//     res.sendFile(path.join(__dirname, '../build/index.html'));
//   })

PORT = process.env.PORT;
app.listen(PORT, () => console.log('Server is sailing on port ' + PORT + ' ⛵'))
