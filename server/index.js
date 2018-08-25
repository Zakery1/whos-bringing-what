const express = require("express");
const massive = require("massive");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require('path');
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(express.static( `${__dirname}/../build`));


massive(process.env.CONNECTION_STRING).then(database => {
    app.set('db', database)
}).catch(error => {
    console.log('Error with Massive', error)
})

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
  })

PORT = process.env.PORT;
app.listen(PORT, () => console.log('Server is sailing on port ' + PORT + ' ⛵'))
