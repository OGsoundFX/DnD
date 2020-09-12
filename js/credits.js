let i = 0;
let speed = 50;
const introText = 'Credits: Music: Olivier Girardot';
const enter = "Press enter";

const typeWriter = (text) => {
  if (i < text.length) {
    document.getElementById("credits").innerHTML += text.charAt(i);
    i++;
      if (text.charAt(i-1) === "!" || text.charAt(i-1) === "." || text.charAt(i-1) === ":") {
        setTimeout(typeWriter, 1200, text);
      } else {
        setTimeout(typeWriter, speed, text);
      };
  } else {
    setTimeout(function(){ document.querySelector(".text-font").innerHTML += `<p id='enter'>${enter}</p>`; }, 10);

  };
};

typeWriter(introText);


// change page

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      window.open("index.html");
    }
});
