const express = require("express");
const massive = require("massive");
const session = require("express-session");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());


massive(process.env.CONNECTION_STRING).then(database => {
    app.set('db', database)
}).catch(error => {
    console.log('Error with Massive', error)
})

PORT = process.env.PORT;
app.listen(PORT, () => console.log('Server is sailing on port ' + PORT + ' ⛵'))
