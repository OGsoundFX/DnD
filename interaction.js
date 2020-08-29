let i = 0;
const txt = 'Lorem ipsum dummy text blabla.';
let speed = 50;

const typeWriter = () => {
  if (i < txt.length) {
    document.getElementById("demo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  };
};

typeWriter();


// const getInputValue = () => {
//   let inputVal = document.getElementById("first-entry").value;
//   return inputVal;
//         }

// let inputVal = getInputValue();


// Get the input field
// var input = document.getElementById("first-entry");

// // Execute a function when the user releases a key on the keyboard
// input.addEventListener("keyup", function(event) {
//   // Number 13 is the "Enter" key on the keyboard
//   if (event.keyCode === 13) {
//     // Cancel the default action, if needed
//     event.preventDefault();
//     // Trigger the button element with a click
//     // document.getElementById("myBtn").click();
//   }
// });

// console.log(input).value;

const storeName = (event) => {
  event.preventDefault();
  let name = document.getElementById('nameInput').value;
  console.log(name);
  return name;
};


document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('btn').addEventListener('click', storeName);
});
// document.getElementById('btn').addEventListener('click', storeName());

const printName = () => {
  console.log(name);
};


