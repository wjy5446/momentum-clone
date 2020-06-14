const temperInfo = document.querySelector(".temperature");
const locationInfo = document.querySelector(".location");

const API_KEY = "72a5e5f820cce3978271001fc5c5f5fc";
const LOCATION = "location";
const WEATHER = "weather";

function saveInfo(key, value) {
  localStorage.setItem(key, value);
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("cant access!!");
}

function getCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

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

      saveInfo(LOCATION, place);
      saveInfo(WEATHER, temperture);

      temperInfo.innerHTML = `${temperture}`;
      locationInfo.innerHTML = `${place}`;
    });
}

function loadCoords() {
  const loadedLocation = localStorage.getItem(LOCATION);
  const loadedWeather = localStorage.getItem(WEATHER);

  if ((loadedWeather === null) | (loadedLocation === null)) {
    getCoords();
  } else {
    temperInfo.innerHTML = loadedWeather;
    locationInfo.innerHTML = loadedLocation;
  }
}

function init() {
  loadCoords();
}
init();
