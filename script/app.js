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

function getWeeklyForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "ad6adba1de9c56cc7cb494546cf33bc9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "ad6adba1de9c56cc7cb494546cf33bc9";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displayForecast);
}

// search Location
function searchLocation(position) {
  let apiKey = "ad6adba1de9c56cc7cb494546cf33bc9";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayForecast);
}

function getCurrentPositon(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayForecast() {
  let temp = document.querySelector("#sun");
  temp.innerHTML = `20°C`;
}
//Location Buttons
let cityBttn = document.querySelector("#location");
cityBttn.addEventListener("click", getCurrentPositon);

let searchBttn = document.querySelector("#search-form");
searchBttn.addEventListener("submit", searchCity);
