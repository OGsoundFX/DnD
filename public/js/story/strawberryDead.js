let i = 0;
let speed = 35;
const intro = 'You fell asleep and never woke up. When the snake bit you, you only felt a stinging pain in your dream, and faded away forever!'

const typeWriter = (text) => {
  if (i < text.length) {
    document.getElementById("story").innerHTML += text.charAt(i);
    i++;
    if (text.charAt(i-1) === "!" || text.charAt(i-1) === "." || text.charAt(i-1) === "?") {
      setTimeout(typeWriter, 600, text);
    } else {
      setTimeout(typeWriter, speed, text);
    };
  };
};

typeWriter(intro);

// load sounds
const dead = new Audio('../sound/boom.wav');
const music = new Audio('../sound/youDie.mp3');
const scream = new Audio('../sound/death.wav');
music.volume = 0.5;
music.play();
scream.play();

dead.volume = 0;
dead.play();

setTimeout(function() {
  dead.volume = 1;
}, 3000);

setTimeout(function() {
  dead.play();
  document.getElementById('snake').classList.add('invisible');
  document.getElementById('dead').classList.remove('invisible');
}, 9000);


setTimeout(function() {
  window.open("../TheEnd", "_self")
}, 14000);
