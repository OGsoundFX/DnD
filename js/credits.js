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

