let i = 0;
let speed = 50;
const introText = 'You just woke up in the woods with a mighty headache! You have no recollection of how you ended up here. Yet you can not wait in this forest for your memory to come back, as you can sense danger lurking all around. While your head is pounding underneath your helmet, you gather your strength and your courage to start your quest and retrieve your identity!';
const hello = "hello";
const enter = "Press enter";

const askName = 'What is thy name?'

const typeWriter = (text) => {
  if (i < text.length) {
    document.getElementById("intro").innerHTML += text.charAt(i);
    i++;
      if (i === 50 || 80 || 100) {
        setTimeout(typeWriter, speed, text);
      } else {
        setTimeout(typeWriter, speed, text);
      };
  } else {
    setTimeout(function(){ document.querySelector(".text-font").innerHTML += `<p id='enter'>${enter}</p>`; }, 1500);

  };
};
// typeWriter(introText);

class ChainAble {
  firstMethod() {
    console.log('This is the First Method');
    return this;
  }

  secondMethod() {
    console.log('This is the Second Method');
    return this;
  }

  thirdMethod() {
    console.log('This is the Third Method');
    return this;
  }
}

const chainableInstance = new Chainable()
chainableInstance
  .firstMethod()
  .secondMethod()
  .thirdMethod();

// Console Output
// This is the First Method
// This is the Second Method
// This is the Third Method


// creating character

let character = {};

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
