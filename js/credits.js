// change page

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      window.open("start.html", "_self");
    }
});

const playCreditMusic = () => {
  const audio = new Audio('../sound/sound.mp3');
  audio.play();
};



const unfade = () => {
    let op = 0.1;  // initial opacity
    let timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        const element = document.getElementById("body")
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 50);
}
