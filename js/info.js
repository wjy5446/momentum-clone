const temperInfo = document.querySelector(".temperature");
const locationInfo = document.querySelector(".location");

const API_KEY = "72a5e5f820cce3978271001fc5c5f5fc";
const COORDS = "coords";
const WEATHER = "weather";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperture = json.main.temp;
      const place = json.name;
      temperInfo.innerHTML = `${temperture}`;
      locationInfo.innerHTML = `${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };

  saveCoords(coordsObj);
}

function handleGeoError() {
  console.log("cant access!!");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  const loadedWeather = localStorage.getItem(WEATHER);
  if (loadedCoords === null) {
    askForCoords();
  } 
  
  if (loadedWeather === null) {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
  
}

function init() {
  loadCoords();
}
init();
