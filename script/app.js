let now = new Date();
let currentTime = document.querySelector(".currentTime");
let currentDate = document.querySelector(".currentDate");
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let months = [
  "Jan.",
  "Feb.",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let hour = now.getHours();
let day = days[now.getDay()];
let date = now.getDate();
let month = months[now.getMonth()];
let year = now.getFullYear();
let minutes = now.getMinutes();
if (minutes < 10) {
  currentTime.innerHTML = `${hour}:0${minutes} ${day}, `;
} else {
  currentTime.innerHTML = `${hour}:${minutes} ${day}, `;
}
currentDate.innerHTML = `${date}. ${month}. ${year}`;

function displayDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let dayName = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = dayName[date.getDay()];

  return day;
}

function displayForecast(response) {
  let forecastData = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecastData.forEach(function (forecastday, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${displayDate(forecastday.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastday.weather[0].icon
          }@4x.png"
          alt=""
          width=""
          class="img-forecast"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastday.temp.max
          )}°</span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastday.temp.min
          )}°</span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
function hourlyForecast(response) {
  let hourlyForecastData = response.data.hourly;
  let hourlyForecastElement = document.querySelector("#hourly-forecast");

  let hourlyForecastHTML = `<div class="row">`;
  forecastData.forEach(function (forecasthour, index) {
    if (index < 6) {
      hourlyForecastHTML =
        hourlyForecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${displayTime(forecasthour.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecasthour.weather[0].icon
          }@4x.png"
          alt=""
          width=""
          class="img-hourlyForecast"
        />
        <div class="weather-hourly-forecast-temperatures">
          <span class="weather-hourly-forecast-temperature"> ${Math.round(
            forecasthour.temp.max
          )}°</span>
        </div>
      </div>
  `;
    }
  });

  hourlyForecastHTML = hourlyForecastHTML + `</div>`;
  hourlyForecastElement.innerHTML = hourlyForecastHTML;
  console.log(hourlyForecastHTML);
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

function getWeeklyForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  let icon = document.querySelector("#icon");
  console.log(response.data);
  document.querySelector("#currentCity").innerHTML = response.data.name;
  celciusTemp = response.data.main.temp;
  document.querySelector("#sun").innerHTML = ` ${Math.round(celciusTemp)}°C`;
  document.querySelector("#windSpeed").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("#humidityPercent").innerHTML = `
    ${response.data.main.humidity} %`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  celciusMaxTemp = response.data.main.temp_max;
  document.querySelector("#maxTemp").innerHTML = `${Math.round(
    celciusMaxTemp
  )}°C`;
  celciusMinTemp = response.data.main.temp_min;
  document.querySelector("#minTemp").innerHTML = `${Math.round(
    celciusMinTemp
  )}°C -`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  getWeeklyForecast(response.data.coord);
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
