function dosplayWeather(response) {

}

let apiKey = "93fe0a104f408de6497bde5628168f6f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Prilep&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayWeather);
