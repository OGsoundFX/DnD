let i = 0;
let speed = 25;
const introText = 'You are still disoriented, but your instinct tells you that you cannot stay here much longer. You notice a path to your right, maybe it leads somewhere. But it might be safer to walk through the thick forest that lays in front of you. What will you do?';
// const introText = "blablabla"; // for testing purposes
// const invalidAnswer = ['Sorry Sire, your mumbling was not comprehensible. Try again!', 'What was that? Please state your intentions clearly!', '??? You better hurry and take the path or the forest! Which one will it be?'];

// If the player hasn't entered a invalid reply yet
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

  typeWriter(introText);

  setTimeout(function() {
    document.getElementById('form').classList.remove('invisible');
  }, 9000);
} else {
  document.getElementById('form').classList.remove('invisible');
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

// eat action
const eat = document.getElementById('eat');
let food = parseInt(document.getElementById('food').innerHTML);
let life = parseInt(document.getElementById('player-life').innerHTML);

eat.addEventListener('click', () => {
  if (life < 25) {
    food = food - 1;
    document.getElementById('food').innerHTML = food;
    if (life > 20) {
      life = 25;
    } else {
      life = life + 5;
    };
    document.getElementById('player-life').innerHTML = life;
    document.getElementById("lifeField").value = life;
    document.getElementById("foodField").value = food;
    if (life >= 25) { document.getElementById('eat').classList.add('invisible') };
  } else {
    document.getElementById('eat').classList.add('invisible');
  };
});
