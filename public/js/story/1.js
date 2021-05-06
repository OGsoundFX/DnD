let i = 0;
let speed = 50;
const story = 'You are walking in the woods when thee suddenly hear some rustling in some bushes nearby. Just a rabbit... but that growl sounds more like a... WOLF! What shall thee do! Quickly my Lord!'
const inputField = document.getElementById('inputText');

// If the player hasn't entered a invalid reply yet
if (document.getElementById("story") != null) {
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
      setTimeout(typeWriter, speed, text);
    };
  };

  typeWriter(story);

  setTimeout(function() {
    document.getElementById('form').classList.remove('invisible');

    // focus on input field directly at page load
    document.getElementById('inputText').select();
  }, 20500);

} else {
  document.getElementById('form').classList.remove('invisible');

  // focus on input field directly at page load
  document.getElementById('inputText').select();
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

// Play sound & fade in
const audio = new Audio('../sound/forest.wav');
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

// stop event listeners when in input field

inputField.addEventListener('keydown', function (event) {
  event.stopPropagation();
});
