let j = 0;
let speed = 50;
const askName = 'What is thy name?';
const magicWord = 'What is your magic word?';
const askFavoriteWeapon = 'What is thy favorite weapon?';
const askFavoriteMeal = 'What is thy favorite meal?';

// fetching DB Character Model
// const Character = require('.../models/characterModel');

const enter = "Press enter";

const typeWriter = (text) => {
  if (j < text.length) {
    document.getElementById("name").innerHTML += text.charAt(j);
    if (j < text.length)  j++;
    setTimeout(typeWriter, speed, text);
  }
};

typeWriter(askName);

// creating character
// let character = {};

// const storeName = string => {
//   let name = document.getElementById('nameInput').value;
//   character[string] = name;
// };

let character = "";
const storeName = () => {
  let name = document.getElementById('nameInput').value;
  if (character === "") {
    character = name;
  } else {
    character = character + ',' + name;
  }
};


document.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      if (document.getElementById("name").innerHTML === 'What is thy name?') {
        storeName();
        document.getElementById("name").innerHTML = "";
        document.getElementById("nameInput").value = "";
        j = 0;
        typeWriter(magicWord);

      } else if (document.getElementById("name").innerHTML === 'What is your magic word?') {
        storeName();
        document.getElementById("name").innerHTML = "";
        document.getElementById("nameInput").value = "";
        j = 0;
        typeWriter(askFavoriteWeapon);
      } else if (document.getElementById("name").innerHTML === 'What is thy favorite weapon?') {
        storeName();
        document.getElementById("name").innerHTML = "";
        document.getElementById("nameInput").value = "";
        j = 0;
        typeWriter(askFavoriteMeal);
      } else if (document.getElementById("name").innerHTML === 'What is thy favorite meal?') {
        storeName();
        document.querySelector("form").remove();
      }
      document.getElementById('trying').name = character;
    }
});

