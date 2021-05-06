let i = 0;
let speed = 50;
const introText = 'You just woke up in the woods with a mighty headache! You have no recollection of how you ended up here. Yet you can not wait in this forest for your memory to come back, as you can sense danger lurking all around. While your head is pounding underneath your helmet, you gather your strength and your courage to start your quest and retrieve your identity!';
const enter = "Press enter";

const typeWriter = (text) => {
  if (i < text.length) {
    document.getElementById("intro").innerHTML += text.charAt(i);
    i++;
      if (text.charAt(i-1) === "!" || text.charAt(i-1) === "." || text.charAt(i-1) === "?") {
        setTimeout(typeWriter, 1200, text);
      } else {
        setTimeout(typeWriter, speed, text);
      };
  } else {
    setTimeout(function(){ document.getElementById("enter").innerHTML += `<p id='enter'>${enter}</p>`; }, 1000);

  };
};

typeWriter(introText);

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

// change page

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      fade();
      setTimeout(function(){ window.open("character?#", "_self"); }, 1000);
    }
});


// Play sound & fade in

const audio = new Audio('../sound/music1.mp3');
audio.loop = true;
audio.volume = 0.4;

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
