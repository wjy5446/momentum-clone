const character = document.querySelector(".content-bottom__character");
const IMG_NUMBER = 3;

function handleLaod() {
  console.log("finished loading");
}

function paintImage(imgNumber) {
  const pathImage = `momumtum-clone/img/${imgNumber + 1}.jpg`;
  character.style.backgroundImage = `url("${pathImage}")`;
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
