let i = 0;
let speed = 50;
const text = ["The endless forest lays arround you... which direction do you want to go?", "You can't stop here, keep walking!", "Trees everywhere, but no sign of life... You need to continue your journey!"];

if (document.getElementById("story") != null) {
  const typeWriter = (text) => {
    if (i < text.length) {
      document.getElementById("story").innerHTML += text.charAt(i);
      i++;
      if (text.charAt(i-1) === "!" || text.charAt(i-1) === "." || text.charAt(i-1) === "?") {
        setTimeout(typeWriter, 700, text);
      } else {
        setTimeout(typeWriter, speed, text);
      };
    };
  };
  typeWriter(text[Math.floor(Math.random() * 3)]);
};

// home button

document.addEventListener('keydown', () => {
  if (event.keyCode === 72) {
    window.open("startgame", "_self");
  };
});

// on-off sound with m key

document.addEventListener('keydown', function (event) {
  if (event.keyCode === 77) {
    document.getElementById('music-on').classList.toggle('invisible');
    document.getElementById('music-off').classList.toggle('invisible');
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    };
  }
});

// Random selection of design to display

let n = Math.floor(Math.random() * 4 + 1);
if (document.getElementById("forest" + n)) {
  document.getElementById("forest" + n).classList.remove('invisible');
};

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

// fade out function

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

// Play sound & fade in
const audio = new Audio(`../sound/forest${Math.floor(Math.random() * 5) + 1}.wav`);
audio.volume = 0.4;
audio.loop = true;

const fadeAndMusic = () => {
  audio.play();
  unfade();
};

const music = () => {
  audio.play();
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

// attribute new life and food to the 3 arrows form values
document.getElementById("lifeField").value = life;
document.getElementById("foodField").value = food;

document.getElementById("lifeFieldLeft").value = life;
document.getElementById("foodFieldLeft").value = food;

document.getElementById("lifeFieldRight").value = life;
document.getElementById("foodFieldRight").value = food;

if (eat) {
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
      if (life >= maxLife || food < 1 ) { document.getElementById('eat').classList.add('invisible') };
    } else {
      document.getElementById('eat').classList.add('invisible');
    };
  });

// eat by pressing e
  document.addEventListener('keydown', function (event) {
    if (event.keyCode === 69) {
      if (life < maxLife && food > 0) {
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
        if (life >= maxLife || food < 1 ) { document.getElementById('eat').classList.add('invisible') };
      } else {
        document.getElementById('eat').classList.add('invisible');
      };
    }
  });
};

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("inventory");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  };
};

if (document.getElementById('openModal')) {
  modal.style.display = "block";
};

// inventory by pressing i

document.addEventListener('keydown', function (event) {
  if (event.keyCode === 73) {
    if (modal.style.display === "block") {
      modal.style.display = "none";
    } else {
      modal.style.display = "block";
    };
  };
});

// Arrows

const button = new Audio('../sound/MenuButton1.wav');

document.addEventListener('keydown', function (event) {
  if (event.keyCode === 38) {
    button.play();
    fade();
    document.getElementById('arrow-up').classList.add('clicked');
  } else if (event.keyCode === 37) {
    button.play();
    fade();
    document.getElementById('arrow-left').classList.add('clicked');
  } else if (event.keyCode === 39) {
    button.play();
    fade();
    document.getElementById('arrow-right').classList.add('clicked');
  };
  setTimeout(function() {
    if (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39) {
      document.getElementById('arrow-up').click();
    };
  }, 500);
});
