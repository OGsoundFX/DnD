const express = require('express');
const app = express();
const mongoose = require('mongoose');
const setupController = require('./controllers/setupController');
const characterController = require('./controllers/characterController');
const startGameController = require('./controllers/startGameController');
const storyController = require('./controllers/storyController');
const maxLifeController = require('./controllers/maxLifeController');
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

app.get('/startgame', (req, res) => {
    res.render('startgame');
});

app.get('/story/0', (req, res) => {
    res.render('story/0');
});

app.get('/designs', (req, res) => {
  res.render('designs');
});

app.get('/TheEnd', (req, res) => {
    res.render('playerDead');
});

app.get('/story/strawberryField', (req, res) => {
    res.render('story/strawberryField');
});

app.get('/story/key', (req, res) => {
    res.render('story/key');
});

app.get('/story/dungeon', (req, res) => {
    res.render('story/dungeon');
});

characterController(app);
startGameController(app);
storyController(app);
maxLifeController(app);

// Setting up database connection
mongoose.connect(config.getDbConnectionString(), { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Calling the Seed file
setupController(app);

app.listen(port, () => {
    console.log(`app launched on port ${port}`)
});
