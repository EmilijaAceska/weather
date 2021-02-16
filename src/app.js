function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function displayWeather(response) {
  console.log(response.data);
  let displayCity = document.querySelector("#display-city");
  displayCity.innerHTML = response.data.name;

  let displayCurrentDate = document.querySelector("#current-date");
  displayCurrentDate.innerHTML = formatDate(response.data.dt * 1000);


  let displayDescription = document.querySelector("#description");
  displayDescription.innerHTML = response.data.weather[0].description;

  let displayCelsius = document.querySelector("#deg-celsius");
  displayCelsius.innerHTML = Math.round(response.data.main.temp);

  let displayIcon = document.querySelector("#main-icon");
  displayIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  displayIcon.setAttribute("alt", response.data.weather[0].description);

  let displayHumidity = document.querySelector("#humidity");
  displayHumidity.innerHTML = response.data.main.humidity;

  let displayWind = document.querySelector("#wind");
  displayWind.innerHTML = Math.round(response.data.wind.speed);

}

let apiKey = "93fe0a104f408de6497bde5628168f6f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Prilep&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayWeather);
