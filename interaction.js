let i = 0;
let speed = 50;
const introText = 'You just woke up in the woods with a mighty headache! You have no recollection of how you ended up here. Yet you can not wait in this forest for your memory to come back, as you can sense danger lurking all around. While your head is pounding underneath your helmet, you gather your strength and your courage to start your quest and retrieve your identity!';
const enter = "Press enter";

const typeWriter = (text) => {
  if (i < text.length) {
    document.getElementById("intro").innerHTML += text.charAt(i);
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

typeWriter(introText);


// change page

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      window.open("character.html");
    }
});
