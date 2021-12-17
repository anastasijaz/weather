let now = new Date();
let currentDate = document.querySelector(".currentDate");
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let hour = now.getHours();
let day = days[now.getDay()];
let date = now.getDate();
let month = months[now.getMonth()];
let year = now.getFullYear();
let minutes = now.getMinutes();
if (minutes < 10) {
  currentDate.innerHTML = `${hour}:0${minutes} ${day}, ${date}. ${month}. ${year}`;
} else {
  currentDate.innerHTML = `${hour}:${minutes} ${day}, ${date}. ${month}. ${year}`;
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "ad6adba1de9c56cc7cb494546cf33bc9";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displayWeatherCondition);
}

// search Location
function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeatherCondition);
}

function getCurrentPositon(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayWeatherCondition(response) {
  document.querySelector("#currentCity").innerHTML = response.data.name;
  celciusTemp = response.data.main.temp;
  document.querySelector("#sun").innerHTML = ` ${Math.round(celciusTemp)}°C`;
  document.querySelector("#windSpeed").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("#humidityPercent").innerHTML = `
    ${response.data.main.humidity} %`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  celciusMaxTemp = response.data.main.temp_max;
  document.querySelector("#maxTemp").innerHTML = `${Math.round(
    celciusMaxTemp
  )}°C`;
  celciusMinTemp = response.data.main.temp_min;
  document.querySelector("#minTemp").innerHTML = `${Math.round(
    celciusMinTemp
  )}°C`;
}

//convert metric to imperial
function metricToImperial(event) {
  let TempElement = document.querySelector("#sun");
  let TempMaxElement = document.querySelector("#maxTemp");
  let TempMinElement = document.querySelector("#minTemp");

  let FahrenheitTemperatur = (celciusTemp * 9) / 5 + 32;
  let FahrenheitMaxTemperatur = (celciusMaxTemp * 9) / 5 + 32;
  let FahrenheitMinTemperatur = (celciusMinTemp * 9) / 5 + 32;

  TempElement.innerHTML = `${Math.round(FahrenheitTemperatur)}°F`;
  TempMaxElement.innerHTML = `${Math.round(FahrenheitMaxTemperatur)}°F`;
  TempMinElement.innerHTML = `${Math.round(FahrenheitMinTemperatur)}°F`;
}
function ImperialToMetric(event) {
  document.querySelector("#sun").innerHTML = `${Math.round(celciusTemp)}°C`;
  document.querySelector("#maxTemp").innerHTML = `${Math.round(
    celciusMaxTemp
  )}°C`;
  document.querySelector("#minTemp").innerHTML = `${Math.round(
    celciusMinTemp
  )}°C`;
}
//Temp Buttons
let FahrenheitBnt = document.querySelector("#imperial-value");
FahrenheitBnt.addEventListener("click", metricToImperial);

let CelciusBnt = document.querySelector("#metric-value");
CelciusBnt.addEventListener("click", ImperialToMetric);

let celciusTemp = null;
let celciusMaxTemp = null;
let celciusMinTemp = null;
//Buttons
let cityBttn = document.querySelector("#location");
cityBttn.addEventListener("click", getCurrentPositon);

let searchBttn = document.querySelector("#search-form");
searchBttn.addEventListener("submit", searchCity);

//hourly and weekly
//function searchLocationHourlyWeekly(position) {
//let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
//  let lat = position.coords.latitude;
//let long = position.coords.longitude;
// let exclude = "alert, minutely";
//let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${exclude}&appid=${apiKey}`;
//axios.get(url).then(displayWeatherCondition);
//}
//function getCurrentPositonHourlyWeekly(event) {
//event.preventDefault();
//navigator.geolocation.getCurrentPosition(searchLocationHourlyWeekly);
//}
//function displayHourlyWeatherConditons(event) {
//document.querySelector("#time-1").innerHTML=;
//}
