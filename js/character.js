let j = 0;
let speed = 50;
const askName = 'What is thy name?';
const askFavoriteWeapon = 'What is thy favorite weapon?';

const enter = "Press enter";

const typeWriter = (text) => {
  document.getElementById("name").innerHTML += text.charAt(j);
  if (j < text.length)  j++;
  setTimeout(typeWriter, speed, text);
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
        typeWriter(askFavoriteWeapon);

      } else {
        storeName("weapon");
      }
      console.log(character);
    }
});

// document.addEventListener('DOMContentLoaded', ()=>{
//     document.getElementById('btn').addEventListener('click', storeName);
//     document.getElementById('btn').addEventListener('click', typeWriter(askFavoriteWeapon));
//     // typeWriter(askFavoriteWeapon);

// });
