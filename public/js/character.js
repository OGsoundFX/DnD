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
    console.log(text);
    document.getElementById("name").innerHTML += text.charAt(j);
    if (j < text.length)  j++;
    setTimeout(typeWriter, speed, text);
  }
};

typeWriter(askName);

// creating character
let character = {};

const storeName = string => {
  let name = document.getElementById('nameInput').value;
  character[string] = name;
};



document.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      if (document.getElementById("name").innerHTML === 'What is thy name?') {
        storeName("name");
        document.getElementById("name").innerHTML = "";
        document.getElementById("nameInput").value = "";
        j = 0;
        typeWriter(magicWord);

      } else if (document.getElementById("name").innerHTML === 'What is your magic word?') {
        storeName("magicWord");
        document.getElementById("name").innerHTML = "";
        document.getElementById("nameInput").value = "";
        j = 0;
        typeWriter(askFavoriteWeapon);
      } else if (document.getElementById("name").innerHTML === 'What is thy favorite weapon?') {
        storeName("weapon");
        document.getElementById("name").innerHTML = "";
        document.getElementById("nameInput").value = "";
        j = 0;
        typeWriter(askFavoriteMeal);
      } else if (document.getElementById("name").innerHTML === 'What is thy favorite meal?') {
        storeName("meal");
        document.querySelector("form").remove();
      }
      window.open("test.html", "_self");
    }
});
console.log(character);

