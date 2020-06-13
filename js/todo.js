const KEYLISTTODO = "TODO";
const KEYLISTDONE = "DONE";

let listTodo = [];
let listDone = [];

const formTask = document.querySelector(".bubble-chat__form-info");
const inputTask = document.querySelector(".bubble-chat__input-info");
const ulListTodo = document.querySelector(".board__todo");
const ulListDone = document.querySelector(".board__done");

/////////////////////////
// Handle Function
////////////////////////

function handleSubmit(event) {
  event.preventDefault();
  const inputValue = inputTask.value;
  const objKeyValue = generateItem(inputValue, "todo");

  if (inputValue === "") {
    return;
  }
  listTodo.push(objKeyValue);
  saveToLocalStorage(KEYLISTTODO, listTodo);
  drawItem(objKeyValue, "todo");

  inputTask.value = null;
}

function handleDelBtn(event) {
  const btn = event.target;
  const li = btn.parentNode.parentNode;

  const infoLi = li.id.split("-");

  li.remove();

  if (infoLi[0] === "todo") {
    listTodo = listTodo.filter((item) => item.id !== parseInt(infoLi[1], 10));
    saveToLocalStorage(KEYLISTTODO, listTodo);
  } else if (infoLi[0] === "done") {
    listDone = listDone.filter((item) => item.id !== parseInt(infoLi[1], 10));
    saveToLocalStorage(KEYLISTDONE, listDone);
  }
}

function handleDoneBtn(event) {
  const btn = event.target;
  const li = btn.parentNode.parentNode;

  const infoLi = li.id.split("-");
  const text = li.querySelector("span").innerText;

  li.remove();
  listTodo = listTodo.filter((item) => item.id !== parseInt(infoLi[1], 10));
  saveToLocalStorage(KEYLISTTODO, listTodo);

  const objKeyValue = generateItem(text, "done");
  listDone.push(objKeyValue);
  saveToLocalStorage(KEYLISTDONE, listDone);
  drawItem(objKeyValue, "done");
}

function handleRedoBtn(event) {
  const btn = event.target;
  const li = btn.parentNode.parentNode;

  const infoLi = li.id.split("-");
  console.log(li);
  const text = li.querySelector("span").innerText;

  li.remove();
  listDone = listDone.filter((item) => item.id !== parseInt(infoLi[1], 10));
  saveToLocalStorage(KEYLISTDONE, listDone);

  const objKeyValue = generateItem(text, "todo");
  listTodo.push(objKeyValue);
  saveToLocalStorage(KEYLISTTODO, listTodo);
  drawItem(objKeyValue, "todo");
}

/////////////////////////
// UTIL
/////////////////////////

function generateItem(text, type) {
  let listItem = [];
  let lastId = -1;

  if (type === "todo") {
    listItem = listTodo;
  } else if (type === "done") {
    listItem = listDone;
  }

  if (listItem.length > 0) {
    lastId = listItem[listItem.length - 1].id;
  } else {
    lastId = -1;
  }

  const objKeyValue = {
    id: lastId + 1,
    text: text,
  };

  return objKeyValue;
}

function drawItem(item, type) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const btns = document.createElement("div");
  const btn1 = document.createElement("button");
  const btn2 = document.createElement("button");

  li.classList.add("list__item");

  span.innerText = item.text;
  btn1.innerText = "❌";
  btn1.addEventListener("click", handleDelBtn);

  if (type === "todo") {
    btn2.innerText = "✅";
    btn2.addEventListener("click", handleDoneBtn);
  } else if (type === "done") {
    btn2.innerText = "↩️";
    btn2.addEventListener("click", handleRedoBtn);
  }

  li.appendChild(span);
  li.appendChild(btns);
  btns.appendChild(btn1);
  btns.appendChild(btn2);
  li.id = type + "-" + item.id;

  if (type === "todo") {
    ulListTodo.appendChild(li);
  } else if (type === "done") {
    ulListDone.appendChild(li);
  }
}

function drawItems(items, type) {
  if (items !== null) {
    for (let i = 0; i < items.length; i++) {
      drawItem(items[i], type);
    }
  }
}

/////////////////////////
// UTIL LOCALSTORAGE
/////////////////////////

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromLocalStorage(key) {
  const listItems = localStorage.getItem(key);

  if (listItems !== null) {
    const parsedListItems = JSON.parse(listItems);
    return parsedListItems;
  } else {
    return [];
  }
}

function init() {
  listTodo = loadFromLocalStorage(KEYLISTTODO);
  listDone = loadFromLocalStorage(KEYLISTDONE);

  drawItems(listTodo, "todo");
  drawItems(listDone, "done");
}

formTask.addEventListener("submit", handleSubmit);

init();
