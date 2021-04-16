let i = 0;
let speed = 25;
const introText = 'You are still disoriented, but your instinct tells you that you cannot stay here much longer. You notice a path to your right, maybe it leads somewhere. But it might be safer to walk through the thick forest that lays in front of you. What will you do?';
// const introText = "blablabla"; // for testing purposes
const enter = "Press enter";

const typeWriter = (text) => {
  if (i < text.length) {
    document.getElementById("story").innerHTML += text.charAt(i);
    i++;
      if (text.charAt(i-1) === "!" || text.charAt(i-1) === "." || text.charAt(i-1) === "?") {
        setTimeout(typeWriter, 700, text);
      } else {
        setTimeout(typeWriter, speed, text);
      };
  } else {
    setTimeout(function(){ document.querySelector(".text-font").innerHTML += `<p id='enter'>${enter}</p>`; }, 10);

  };
};

typeWriter(introText);

setTimeout(function() {
  document.getElementById('form').classList.remove('invisible');
}, 9000);

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

const fadeAndCreditMusic = () => {
  const audio = new Audio('../sound/music1.mp3');
  audio.play();
  unfade();
};
