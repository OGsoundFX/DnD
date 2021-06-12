let i = 0;
let speed = 25;
const story = 'The coward that you are climbs the first tree that you find, while the wolf almost manages to bite your butt! But you clumsily lose your grip and fall from the tree. Desoriented, you look around, and see the wolf laying on the ground with your sword in its heart! You lucky coward gain 5 points of chance and lose 5 points of courage!'

// load music
const treeMusic = new Audio('../sound/fallfromtree.wav');
const fall = new Audio('../sound/treeFalling.wav');
treeMusic.loop = true;
treeMusic.play();
fall.play();

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

// press enter
setTimeout(function(){
  // document.getElementById("enter").classList.remove('invisible');
  document.getElementById('form').classList.remove('invisible');
  document.getElementById('button').select();
}, 13000);

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

typeWriter(story);

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
audio.volume = 0.4;
audio.loop = true;

const fadeAndMusic = () => {
  audio.play();
  unfade();
};

const music = () => {
  audio.play();
  unfadeVolume(audio);
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

// eat action
const eat = document.getElementById('eat');
let food = parseInt(document.getElementById('food').innerHTML);
let life = parseInt(document.getElementById('player-life').innerHTML);
const maxLife = parseInt(document.getElementById('maxLife').innerHTML);

document.getElementById("lifeField").value = life;
document.getElementById("foodField").value = food;

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
