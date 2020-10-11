let j = 0;
let speed = 50;
const askName = 'What is thy name?'

const enter = "Press enter";

const typeWriter = (text) => {
  document.getElementById("name").innerHTML += text.charAt(j);
  j++;
  setTimeout(typeWriter, speed, text);
};

typeWriter(askName);


// creating character

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {


      const storeName = (event) => {
        event.preventDefault();
        let name = document.getElementById('nameInput').value;
        character["name"] = name;
        console.log(name);
        return character;
      };


      document.addEventListener('DOMContentLoaded', ()=>{
          document.getElementById('btn').addEventListener('click', storeName);
          document.getElementById('btn').addEventListener('click', printName);
      });

      const printName = () => {
        console.log(character);
      };
    }
});


// storing character data

var requirejs = require('requirejs');

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});

let name = "Maria";
let password = "whatever";

requirejs(['name', 'password'],
function   (name,   password) {
    //foo and bar are loaded according to requirejs
    //config, but if not found, then node's require
    //is used to load the module.

});


const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const dbFileName = "database/players.json";
const adapter = new FileSync(dbFileName)
const db = low(adapter)

// Add another entry
db.get('players')
.push({
  "name": "Bob",
  "password": "theloser",
  "luck": "4",
  "magic": "18",
  "strength": "25",
  "experience": "5",
  "money": "100",
  "life": "12"
    })
.write();
