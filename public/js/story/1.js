let i = 0;
let speed = 25;
const story = 'You are walking in the woods when thee suddenly hear some rustling in some bushes nearby. Just a rabbit... but that growl sounds more like a... WOLF! What shalt thou do! Quickly my Lord!'
const inputField = document.getElementById('inputText');

// fade out function

const fade = (id) => {
    let op = 1;  // initial opacity
    let timer = setInterval(function () {
        const element = document.getElementById(id);
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

// typewritter

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

// Loading error sound
const error = new Audio(`../sound/error${Math.floor(Math.random() * 3) + 1}.wav`);
// replace chapterOne with actual content THE FIRST TIME THE PAGE LOADS
// otherwise load WRONG ANSWER page

if (document.getElementById("fail") != null) {
  document.getElementById('storyContent').classList.remove('invisible');
  document.getElementById('chapterOne').classList.add('invisible');
  document.getElementById('menu').classList.remove('invisible');
  setTimeout(function() {
    music();
    document.getElementById("unfadeContent").style.opacity = 1;
  }, 50);
} else {
  setTimeout(function() {
    fade("chapterOne");
  }, 3000);

  setTimeout(function() {
    document.getElementById('storyContent').classList.remove('invisible');
    document.getElementById('chapterOne').classList.add('invisible');
    document.getElementById('menu').classList.remove('invisible');
    music();
    unfade("unfadeContent");
  }, 5000);
};

// Loading Intro Music
const introMusic = new Audio('../sound/level1.wav');
const playIntroMusic = () => {
  introMusic.play();
};

// If the player hasn't entered a invalid reply yet
if (document.getElementById("story") != null) {
  playIntroMusic();
  setTimeout(function() {
    typeWriter(story);
  }, 6500);

  setTimeout(function() {
    document.getElementById('form').classList.remove('invisible');

    // focus on input field directly at page load
    document.getElementById('inputText').select();
  }, 22000);

} else {
  error.play();
  document.getElementById('form').classList.remove('invisible');

  // focus on input field directly at page load
  document.getElementById('inputText').select();
};


//fade in function

const unfade = (id) => {
    let op = 0.1;  // initial opacity
    let timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        const element = document.getElementById(id);
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 50);
}

// sound fade in

const unfadeVolume = (audio) => {
    audio.volume = 0.05;  // initial volume
    let timer = setInterval(function () {
        if (audio.volume >= 0.4){
            clearInterval(timer);
        }
        audio.volume += audio.volume * 0.1;
    }, 50);
}

// Play sound & fade in

const audio = new Audio(`../sound/forest${Math.floor(Math.random() * 5) + 1}.wav`);
const contrabass = new Audio('../sound/introWolf.wav');
audio.volume = 0.4;
audio.loop = true;
contrabass.loop = true;

const fadeAndMusic = () => {
  contrabass.play();
  audio.play();
  unfade();
};

const music = () => {
  contrabass.play();
  audio.play();
  unfadeVolume(audio);
};

// on-off sound button
const sound = () => {
  document.getElementById('music-on').classList.toggle('invisible');
  document.getElementById('music-off').classList.toggle('invisible');
  if (audio.paused) {
    contrabass.play();
    audio.play();
  } else {
    contrabass.pause();
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
      contrabass.play();
      audio.play();
    } else {
      contrabass.pause();
      audio.pause();
    };
  }
});

// stop event listeners when in input field

inputField.addEventListener('keydown', function (event) {
  event.stopPropagation();
});
