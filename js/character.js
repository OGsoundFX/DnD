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
      let name = document.getElementById('nameInput').value;
      console.log(name);

    }
});



// storing character data


