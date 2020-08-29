let i = 0;
const txt = 'Lorem ipsum dummy text blabla.';
let speed = 50;

const typeWriter = () => {
  if (i < txt.length) {
    document.getElementById("demo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  };
};

typeWriter();
