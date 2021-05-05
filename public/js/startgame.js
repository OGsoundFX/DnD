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
};

const fade = () => {
    let op = 1;  // initial opacity
    let timer = setInterval(function () {
        const element = document.getElementById("body");
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

const start = document.getElementById('start');
const load = document.getElementById('load');
const menuButton1 = new Audio('../sound/MenuButton1.wav');
const menuButton2 = new Audio('../sound/MenuButton2.wav');
const menuIn = new Audio('../sound/MenuIn.wav');

document.addEventListener('keydown', function (event) {
  if (event.keyCode === 40) {
// down
    start.classList.remove("highlight");
    load.classList.add("highlight");
    menuButton1.play();
  } else if (event.keyCode === 38) {
// up
    load.classList.remove("highlight");
    start.classList.add("highlight");
    menuButton1.play();
  }
});

document.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    if (start.classList.contains("highlight")) {
      menuIn.play();
      fade();
      setTimeout(function(){ window.open("start", "_self"); }, 1000);
    } else {
      const loadGame = document.getElementById('load-game');
      const menu = document.querySelector('.menu');
      loadGame.classList.remove('hide');
      menu.classList.add('hide');

      // Focus on first field
      const inputField = document.getElementById('nameInput');
      document.getElementById('nameInput').select();
    }
  }
});

// Play sound & fade in

const playSound = () => {
  const audio = new Audio('../sound/sound.mp3');
  audio.play();
};
