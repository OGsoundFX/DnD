let i = 0;
let speed = 50;
const story1 = 'You are walking in the woods when thee suddenly hear some rustling in some bushes nearby. Just a rabbit... but that growl sounds more like a... WOLF! What shall thee do! Quickly my Lord!'
const enter = "Press enter";

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
    setTimeout(function(){ document.querySelector(".text-font").innerHTML += `<p id='enter'>${enter}</p>`; }, 10);

  };
};

typeWriter(story1);

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
  audio.loop = true;
  audio.play();
  unfade();
};
