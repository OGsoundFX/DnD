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

const audio = new Audio('../sound/victory.wav');

const fadeAndMusic = (id) => {
  audio.play();
  unfade(id);
};

// go to bamsfx.com
document.addEventListener('keydown', () => {
  if (event.keyCode === 66) {
    window.open('https://www.bamsfx.com', '_blank');
  };
});
