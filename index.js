const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// trying stuff with lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const dbFileName = "database/players.json";
const adapter = new FileSync(dbFileName)
const db = low(adapter)

// Add another entry
db.get('players')
.push({
  "name": "Jane",
  "password": "thelover",
  "luck": "4",
  "magic": "18",
  "strength": "25",
  "experience": "5",
  "money": "100",
  "life": "12"
    })
.write();

// path is a node command, you can do stuff like this:
// var filename = path.basename('/Users/Refsnes/demo_path.js');
// console.log(filename);

// loading requirejs
var requirejs = require('requirejs');

// load espress
const app = express();

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// redirect to a folder instead of printing stuff directly froö this file
app.use(express.static(path.join(__dirname, '/')));

// or create a route and print stuff
app.get('/', (req, res) => {
    // will print this directly to the home page of your app
    // res.send("Second message, OMG it's working!");
    // If you leave blank it will redirect to the index.html located at '/'
});

app.listen(process.env.PORT || 4000, () => {
    console.log('Server started on port 4000');
})
