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
    setTimeout(function(){ window.open("startgame", "_self"); }, 1000);
  }
});


// Play sound & fade in
const audio = new Audio('../sound/endcredit.mp3');
// audio.volume = 1;
audio.loop = true;

const fadeAndMusic = () => {
  audio.play();
  unfade();
};

// change colour

const changeColour = color => {
  document.getElementById('body').style.color = color;
  document.getElementById('body').style.textShadow = `0 0 9px ${color}`;
  document.getElementById('credits').style.color = color;
  document.getElementById('credits').style.textShadow = `0 0 9px ${color}`;
};

setTimeout(function() {
  document.getElementById('body').classList.add('ease');
  document.getElementById('credits').classList.add('ease');
}, 2000);

const selectColor = () => {
  console.log(document.getElementById('body').classList.contains("green"));
  if (document.getElementById('body').classList.contains("green")) {
    changeColour("orange");
    document.getElementById('body').classList.remove("green");
    document.getElementById('body').classList.add("orange");
  } else if (document.getElementById('body').classList.contains("orange")) {
    changeColour("red");
    document.getElementById('body').classList.remove("orange");
    document.getElementById('body').classList.add("red");
  } else if (document.getElementById('body').classList.contains("red")) {
    changeColour("yellow");
    document.getElementById('body').classList.add("yellow");
    document.getElementById('body').classList.remove("red");
  } else if (document.getElementById('body').classList.contains("yellow")) {
    changeColour("purple");
    document.getElementById('body').classList.remove("yellow");
    document.getElementById('body').classList.add("purple");
  } else if (document.getElementById('body').classList.contains("purple")) {
    changeColour("grey");
    document.getElementById('body').classList.remove("purple");
    document.getElementById('body').classList.add("grey");
  } else if (document.getElementById('body').classList.contains("grey")) {
    changeColour("pink");
    document.getElementById('body').classList.remove("grey");
    document.getElementById('body').classList.add("pink");
  } else if (document.getElementById('body').classList.contains("pink")) {
    changeColour("blue");
    document.getElementById('body').classList.remove("pink");
    document.getElementById('body').classList.add("blue");
  } else if (document.getElementById('body').classList.contains("blue")) {
    changeColour("green");
    document.getElementById('body').classList.remove("blue");
    document.getElementById('body').classList.add("green");
  };
};

setTimeout(function() {
  selectColor();
}, 2000);

setInterval(selectColor, 12000)

