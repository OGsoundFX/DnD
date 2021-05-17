let i = 0;
let speed = 35;
const intro = 'You found a place to hide, behind a bush. But you feel a sudden stinging pain on your butt! You barely have time to realise that you sat on the most venomous scorpion in the Kingdom, when your entire body convluses in extreme pain, and your consciousness fades away...'

const typeWriter = (text) => {
  if (i < text.length) {
    document.getElementById("story").innerHTML += text.charAt(i);
    i++;
    if (text.charAt(i-1) === "!" || text.charAt(i-1) === "." || text.charAt(i-1) === "?") {
      setTimeout(typeWriter, 600, text);
    } else {
      setTimeout(typeWriter, speed, text);
    };
  };
};

typeWriter(intro);


setTimeout(function() {
  document.getElementById('snake').classList.add('invisible');
  document.getElementById('dead').classList.remove('invisible');
}, 18000);


setTimeout(function() {
  window.open("../TheEnd", "_self")
}, 23000);
