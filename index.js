const express = require('express');
const app = express();
const mongoose = require('mongoose');
const setupController = require('./controllers/setupController');
const characterController = require('./controllers/characterController');
const config = require('./config/dbconfig');

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies

const port = process.env.PORT || 8088;

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

// Routes

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/start', (req, res) => {
    res.render('start');
});

app.get('/character', (req, res) => {
    res.render('character');
});

app.get('/test', (req, res) => {
    res.render('test');
});

// app.post('/save/character', (req, res) => {

// });

characterController(app);

// Setting up database connection
mongoose.connect(config.getDbConnectionString(), { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Calling the Seed file
setupController(app);

app.listen(port, () => {
    console.log(`app launched on port ${port}`)
});
