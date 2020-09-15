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
      // window.open("start.html", "_self");


      fade();

      setTimeout(function(){ window.open("start.html", "_self"); }, 1000);
    }
});

// const playCreditMusic = () => {
//   const audio = new Audio('../sound/sound.mp3');
//   audio.play();
// };

