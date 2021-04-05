let j = 0;
let speed = 50;
const askName = 'What is thy name?';
const magicWord = 'What is thy magic word?';
const askFavoriteWeapon = 'What is thy favorite weapon?';
const askFavoriteMeal = 'What is thy favorite meal?';

const typeWriter = (text) => {
  if (j < text.length) {
    document.getElementById("name").innerHTML += text.charAt(j);
    if (j < text.length)  j++;
    setTimeout(typeWriter, speed, text);
  } else {
    document.getElementById("enter").classList.remove('display');
    document.querySelector(".cursor").classList.remove('display');
  }
};

typeWriter(askName);

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
      document.getElementById("enter").classList.add('display');
      document.querySelector(".cursor").classList.add('display');
      if (document.getElementById("name").innerHTML === 'What is thy name?') {
        storeName();
        document.getElementById("name").innerHTML = "";
        document.getElementById("nameInput").value = "";
        j = 0;
        typeWriter(magicWord);

      } else if (document.getElementById("name").innerHTML === 'What is thy magic word?') {
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
      document.getElementById('submit').name = character;
    }
});

