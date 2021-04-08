let i = 0;
let speed = 50;
// const intro = 'After a few steps into the direction of the noise, you find yourself face to face with a wolf. It attacks!'
const intro = "bla bla bla";
const enter = "Press enter";

const typeWriter = (text) => {
  if (i < text.length) {
    document.getElementById("story").innerHTML += text.charAt(i);
    i++;
      if (text.charAt(i-1) === "!" || text.charAt(i-1) === "." || text.charAt(i-1) === "?") {
        setTimeout(typeWriter, 1200, text);
      } else {
        setTimeout(typeWriter, speed, text);
      };
  } else {
    document.querySelector(".enter").classList.remove("invisible");
  };
};

typeWriter(intro);

// Attack specs
const playerAgility = parseInt(document.getElementById('player-agility').innerHTML);
const playerStrength = parseInt(document.getElementById('player-strength').innerHTML);
const playerLife = parseInt(document.getElementById('player-life').innerHTML);

const wolfLife = parseInt(document.getElementById('wolf-life').innerHTML);
const wolfAgility = parseInt(document.getElementById('wolf-agility').innerHTML);
const wolfStrength = parseInt(document.getElementById('wolf-strength').innerHTML);;

// press enter
const player = document.getElementById("player");
const wolf = document.getElementById("wolf");
const round = document.querySelector(".round")
console.log(round);

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      if (round.innerHTML = "wolf") {
        wolf.classList.add("turn");
        document.querySelector(".invisible").classList.remove("invisible");
        const audio = new Audio('../../sound/dice.wav');
        audio.play();
        document.querySelector(".enter").classList.add("invisible");
        document.getElementById("story").classList.add("invisible");
        const wolfHitfactor = wolfAgility - playerAgility + Math.floor(Math.random()*18) - 9;
        // if wolfHitfactor => 0 than calculate damage and send response and press enter to move to next turn
        // if wolfHitFactor < 0 than send response and press enter to move to next turn
      }
    }
});

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

const fadeAndCreditMusic = () => {
  const audio = new Audio('../sound/music1.mp3');
  audio.play();
  unfade();
};
