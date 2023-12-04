var express = require('express');
var bodyParser = require('body-parser');
var RegisterRoute = require('./Routes/Register')
var LoginRoute = require('./Routes/Login')
var UsersRoute = require('./Routes/Users')
const cors = require("cors")

var app = express();

app.set("view engine", "ejs");

app.use(express.static("public"))
app.use(express.json())

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/register', RegisterRoute)
app.use('/login', LoginRoute)
app.use('/users', UsersRoute)


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`En ecoute sur le port : ${PORT}`)
  })