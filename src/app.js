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
  let displayCity = document.querySelector("#display-city");
  displayCity.innerHTML = response.data.name;

  let displayCurrentDate = document.querySelector("#current-date");
  displayCurrentDate.innerHTML = formatDate(response.data.dt * 1000);


  let displayDescription = document.querySelector("#description");
  displayDescription.innerHTML = response.data.weather[0].description;

  let displayTemperature = document.querySelector("#degrees");
  displayCelsius=response.data.main.temp;
  displayTemperature.innerHTML = Math.round(displayCelsius);

  let displayIcon = document.querySelector("#main-icon");
  displayIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  displayIcon.setAttribute("alt", response.data.weather[0].description);

  let displayHumidity = document.querySelector("#humidity");
  displayHumidity.innerHTML = response.data.main.humidity;

  let displayWind = document.querySelector("#wind");
  displayWind.innerHTML = Math.round(response.data.wind.speed);

}

function displayForecast(response){
  let forcastElement=document.querySelector("#forecast");
  forcastElement.innerHTML=null;
  let forecast=null;

  for(let index=0; index <6; index++){
    forecast=response.data.list[index];
    forcastElement.innerHTML += `
    <div class="next-hours">
      <p>
        <h3>
          ${formatHours(forecast.dt*1000)}
        </h3>
        <div>
          <strong>
            ${Math.round(forecast.main.temp_max)}° / 
          </strong>
            ${Math.round(forecast.main.temp_min)}°
        </div>
        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
      </p>
    </div>
    `;
  }
}

function searchCity(city) {
  let apiKey = "93fe0a104f408de6497bde5628168f6f";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather"
  let apiUrl = `${apiEndPoint}?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}
let searchCityDisplay = document.querySelector("#search-form");
searchCityDisplay.addEventListener("submit", handleSubmit);

function searchLocation(position){
  let apiKey = "93fe0a104f408de6497bde5628168f6f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Prilep");

function changeFahrenheit(event){
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let temperatureElement=document.querySelector("#degrees");
  let fahrenheitTemperature=(displayCelsius * 9) / 5 + 32;
  temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}
let fahrenheit=document.querySelector("#deg-fahrenheit");
fahrenheit.addEventListener("click", changeFahrenheit);

function changeCelsius(event){
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperatureElement=document.querySelector("#degrees");
  temperatureElement.innerHTML=Math.round(displayCelsius);
}
let celsius=document.querySelector("#deg-celsius");
celsius.addEventListener("click", changeCelsius);

let displayCelsius=null;