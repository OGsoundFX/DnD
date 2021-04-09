let i = 0;
let speed = 50;
const intro = 'After a few steps into the direction of the noise, you find yourself face to face with a wolf. It attacks!'
// const intro = "bla bla bla"; // for testing purposes
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
    wolf.classList.add("turn");
  };
};

typeWriter(intro);

// Attack specs
let playerAgility = parseInt(document.getElementById('player-agility').innerHTML);
let playerStrength = parseInt(document.getElementById('player-strength').innerHTML);
let playerLife = parseInt(document.getElementById('player-life').innerHTML);
// let playerLife = 2; // for testing purposes
const playerWeapon = document.getElementById('player-weapon').innerHTML

let wolfLife = parseInt(document.getElementById('wolf-life').innerHTML);
let wolfAgility = parseInt(document.getElementById('wolf-agility').innerHTML);
let wolfStrength = parseInt(document.getElementById('wolf-strength').innerHTML);;

// press enter
const player = document.getElementById("player");
const wolf = document.getElementById("wolf");
const round = document.querySelector(".round");

// Refactored functions for the turn phase
const roleDice = () => {
  document.querySelector(".dice").classList.remove("invisible");
  const audio = new Audio('../../sound/dice.wav');
  audio.play();
  document.querySelector(".enter").classList.add("invisible");
  document.getElementById("story").classList.add("invisible");
};

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      if (round.innerHTML === "wolf") {
        roleDice();
        // calculating whether the wolf hit or missed
        const wolfHitfactor = wolfAgility - playerAgility + Math.floor(Math.random()*18) - 9;
        if (wolfHitfactor >= 0) {
          const damage = Math.floor(wolfStrength / playerStrength * Math.floor(Math.random()*6)) + 1;
          playerLife -= damage;

          setTimeout(function(){
            document.querySelector(".dice").classList.add("invisible");
            // if dead !
            if (playerLife <= 0) {
              document.getElementById("story").innerHTML = `You received <span style="color: #f68105">${damage}</span> points of damage, your are DEAD!`;
              document.getElementById("story").classList.remove("invisible");
              const audio1 = new Audio('../../sound/player-wound.wav');
              const audio2 = new Audio('../../sound/death.wav');
              audio1.play();
              audio2.play();
              setTimeout(function(){
                window.open("startgame", "_self");
              }, 2000);
            } else {

              document.getElementById("story").innerHTML = `The wolf manages to get a nasty bite off of you, you lose <span style="color: #f68105">${damage}</span> life points!`;
              document.getElementById("story").classList.remove("invisible");
              document.getElementById('player-life').innerHTML = playerLife;
              document.getElementById('player-life').classList.add('new-life-score');

              wolf.classList.remove("turn");
              player.classList.add("turn");
              const audio = new Audio('../../sound/player-wound.wav');
              audio.play();

              setTimeout(function(){
                // document.getElementById('player-life').classList.remove('new-life-score');
                player.classList.add("turn");
                document.querySelector(".enter").classList.remove("invisible");
                document.getElementById("story").innerHTML += "</br>It is your turn to attack";
              }, 1000);
            };


          }, 1000);
          round.innerHTML = "player";

        } else {
          setTimeout(function(){
            document.querySelector(".dice").classList.add("invisible");
            document.getElementById("story").innerHTML = "Somehow you managed to evade the wolf's attack and you can hear the jaws smack just an inch away from your ear! It is your turn to attack!";
            document.getElementById("story").classList.remove("invisible");
            document.querySelector(".enter").classList.remove("invisible");
            wolf.classList.remove("turn");
            player.classList.add("turn");
          }, 1000);
          round.innerHTML = "player";
        };

      } else if (round.innerHTML === "player") {
        roleDice();
        const playerHitfactor =  playerAgility - wolfAgility + Math.floor(Math.random()*18) - 9;
        if (playerHitfactor >= 0) {
          const damage = Math.floor(playerStrength / wolfStrength * Math.floor(Math.random()*6));
          wolfLife -= damage;

          setTimeout(function(){
            document.querySelector(".dice").classList.add("invisible");
            // if Wolf dead
            if (wolfLife <=0 ) {
              const audio1 = new Audio('../../sound/player-wound.wav');
              const audio2 = new Audio('../../sound/victory.wav');
              audio1.play();
              audio2.play();
              document.getElementById("story").innerHTML = `Bravo! You kill the wolf with <span style="color: #f68105">${damage}</span> points of damage!`;
              document.getElementById("story").classList.remove("invisible");
              document.getElementById('wolf-life').innerHTML = wolfLife;
              document.getElementById('wolf-life').classList.add('new-life-score');
              round.innerHTML = "victory";
              setTimeout(function(){
                document.getElementById("story").innerHTML += "</br>Are you ready for your next achievment?";
                document.getElementById("lifeField").value = playerLife;
                document.getElementById("form").classList.remove('invisible');
              }, 1000);
            } else {
              document.getElementById("story").innerHTML = `You hit the wolf with your ${playerWeapon} and cause the wolf <span style="color: #f68105">${damage}</span> life points!`;
              document.getElementById("story").classList.remove("invisible");
              document.getElementById('wolf-life').innerHTML = wolfLife;
              document.getElementById('wolf-life').classList.add('new-life-score');
              player.classList.remove("turn");
              const audio = new Audio('../../sound/player-wound.wav');
              audio.play();
              setTimeout(function(){
                wolf.classList.add("turn");
                document.querySelector(".enter").classList.remove("invisible");
                document.getElementById("story").innerHTML += "</br>It is the wolf's turn to attack";
              }, 1000);
            };
          }, 1000);
          round.innerHTML = "wolf";

          // make the new life points go orange and blinking after 2 seconds of Timeout
        } else {
          setTimeout(function(){
            document.querySelector(".dice").classList.add("invisible");
            document.getElementById("story").innerHTML = "You missed! The wolf is boucing on you!";
            document.getElementById("story").classList.remove("invisible");
            document.querySelector(".enter").classList.remove("invisible");
            wolf.classList.add("turn");
            player.classList.remove("turn");
          }, 1000);
          round.innerHTML = "wolf";
        };
      } else if (round.innerHTML === "victory") {
        console.log("you win");

        // ALL THIS PART SEEMS UNECESARY

        // find a way to update the player info: life and new level
        // needs to redirect to StoryController and create a new route "upadteCombat"
        // possibly needs to create a form in the ejs, and maybe make the player submit
        // not sure that can be done with "enter" action
      };
    };
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
