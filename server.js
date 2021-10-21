/////////////////////////// DEPENDENCIES //////////////////////////////////////

const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const session = require('express-session')

/////////////////////////// CONFIGURATION ////////////////////////////////////

const app = express ();
const db = mongoose.connection;
require('dotenv').config()
const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.MONGODB_URI;

//////////////////////////// DATABASE ////////////////////////////////////////

mongoose.connect(MONGODB_URI);

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//////////////////////////// MIDDELWARE //////////////////////////////////////

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('/feed')
})

//////////////////////////// CONTROLLERS //////////////////////////////////////

const feedController = require('./controllers/feed_controller.js')
app.use('/feed', feedController)

//////////////////////////// CONNECTION //////////////////////////////////////

app.listen(PORT, () => console.log( 'Listening on port:', PORT));
