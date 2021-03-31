const express = require('express');
const app = express();
const mongoose = require('mongoose');
const setupController = require('./controllers/setupController');
const config = require('./config/dbconfig');

const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/js/start'));
app.use(express.static(__dirname + '/css-components/start'));
app.use(express.static(__dirname + '/js/credits'));
app.use(express.static(__dirname + '/css-components/credits'));

app.get('/', (req, res) => {
    res.render('index.html');
});

// Setting up database connection
mongoose.connect(config.getDbConnectionString(), { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Calling the Seed file
setupController(app);
// apiController(app);

app.listen(port, () => {
    console.log(`app launched on port ${port}`)
});
