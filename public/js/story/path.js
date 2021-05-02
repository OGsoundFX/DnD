let i = 0;
let speed = 25;
const introText = 'You are walking on the path, thinking that it has to lead to a village or something, when you hear footsteps behind you, and a deep menacing voice yelling: "Give us your belongings or die!". What will you do?';
const enter = "Press enter";

const typeWriter = (text) => {
  if (i < text.length) {
    document.getElementById("story").innerHTML += text.charAt(i);
    i++;
      if (text.charAt(i-1) === "!" || text.charAt(i-1) === "." || text.charAt(i-1) === "?") {
        setTimeout(typeWriter, 700, text);
      } else {
        setTimeout(typeWriter, speed, text);
      };
  } else {
    // setTimeout(function(){ document.querySelector(".text-font").innerHTML += `<p id='enter'>${enter}</p>`; }, 10);

  };
};

typeWriter(introText);

setTimeout(function() {
  document.getElementById('form').classList.remove('invisible');
}, 9000);

//fade in function

const unfade = () => {
    let op = 0.1;  // initial opacity
    let timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        const element = document.getElementById("body");
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 50);
}

// Play sound & fade in
const audio = new Audio('../sound/forest.wav');
audio.volume = 0.4;
audio.loop = true;

const fadeAndCreditMusic = () => {
  audio.play();
  unfade();
};

// on-off sound button

const sound = () => {
  document.getElementById('music-on').classList.toggle('invisible');
  document.getElementById('music-off').classList.toggle('invisible');
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  };
};

// eat action
const eat = document.getElementById('eat');
let food = parseInt(document.getElementById('food').innerHTML);
let life = parseInt(document.getElementById('player-life').innerHTML);
const maxLife = parseInt(document.getElementById('maxLife').innerHTML);

    document.getElementById("lifeField").value = life;
    document.getElementById("foodField").value = food;

eat.addEventListener('click', () => {
  if (life < maxLife) {
    food = food - 1;
    document.getElementById('food').innerHTML = food;
    if (life > (maxLife - 5)) {
      life = maxLife;
    } else {
      life = life + 5;
    };
    document.getElementById('player-life').innerHTML = life;
    document.getElementById("lifeField").value = life;
    document.getElementById("foodField").value = food;
    if (life >= maxLife || food < 1) { document.getElementById('eat').classList.add('invisible') };
  } else {
    document.getElementById('eat').classList.add('invisible');
  };
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("inventory");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
