let i = 0;
let speed = 35;
const intro = 'You fell asleep and never woke up. When the snake bit you, you only felt a stinging pain in your dream, and faded away forever!'

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
}, 9000);


setTimeout(function() {
  window.open("../TheEnd", "_self")
}, 14000);
