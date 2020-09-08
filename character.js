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

let character = {};

const storeName = (event) => {
  event.preventDefault();
  let name = document.getElementById('nameInput').value;
  character["name"] = name;
  console.log(name);
  return character;
};


// document.addEventListener('DOMContentLoaded', ()=>{
//     document.getElementById('btn').addEventListener('click', storeName);
//     document.getElementById('btn').addEventListener('click', printName);
// });

// const printName = () => {
//   console.log(character);
// };
