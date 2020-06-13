const chatFirst = document.querySelector(".chat-wrapper-first");
const chatSecond = document.querySelector(".chat-wrapper-second");
const formName = document.querySelector(".bubble-chat__form-name");
const inputName = document.querySelector(".bubble-chat__input-name");
const nameInfo = document.querySelector(".name");

const USER_LS = "currentUser";

function handleSumitName(event) {
  event.preventDefault();

  const currentValue = inputName.value;
  saveName(currentValue);
  toggleDisplay();
}

function toggleDisplay() {
  chatFirst.classList.toggle("hiding");
  chatSecond.classList.toggle("hiding");
  nameInfo.innerText = currentUser;

}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  return currentUser;
}

function saveName(name) {
  localStorage.setItem(USER_LS, name);
}

function init() {
  const currentUser = loadName();

  if (currentUser === null) {
    chatFirst.classList.remove("hiding");
    chatSecond.classList.add("hiding");
  } else {
    chatSecond.classList.remove("hiding");
    chatFirst.classList.add("hiding");
    nameInfo.innerText = currentUser;
  }
}

formName.addEventListener("submit", handleSumitName);

init();
