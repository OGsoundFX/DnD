// credits button

document.addEventListener('keydown', () => {
  if (event.keyCode === 67) {
    window.open("TheEnd", "_self");
  };
});

// scoreboard button

document.addEventListener('keydown', () => {
  if (event.keyCode === 83) {
    window.open("scoreboard", "_self");
  };
});

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
    }, 75);
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
      setTimeout(function(){ window.open("start", "_self"); }, 1500);
    } else {
      const loadGame = document.getElementById('load-game');
      const menu = document.querySelector('.menu');
      loadGame.classList.remove('hide');
      menu.classList.add('hide');

      // Focus on first field
      setTimeout(function() {
        const inputField = document.getElementById('nameInput');
        const magicInput = document.getElementById('magicInput');
        document.getElementById('nameInput').select();

        // prevent key command when in field
        inputField.addEventListener('keydown', function (event) {
          event.stopPropagation();
        });

        magicInput.addEventListener('keydown', function (event) {
          event.stopPropagation();
        });
      }, 100);
    }
  }
});

// Play sound & fade in

const playSound = () => {
  const audio = new Audio(`../sound/error${Math.floor(Math.random() * 3) + 1}.wav`);
  audio.play();
};


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("how-to");

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

// how to play by pressing p

document.addEventListener('keydown', function (event) {
  if (event.keyCode === 80) {
    if (modal.style.display === "block") {
      modal.style.display = "none";
    } else {
      modal.style.display = "block";
    };
  };
});
