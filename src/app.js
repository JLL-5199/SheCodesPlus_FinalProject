// Showing current weather statistics

function showDate(timestamp) {
    let date = new Date(timestamp);
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
    let displayCity = document.querySelector("h1");
    let displayDate = document.querySelector("#today");
    let displayDescription = document.querySelector("#weather-description");
    let displayHumidity = document.querySelector("#humidity");
    let displayIcon = document.querySelector("#current-icon");
    let displayTemperature = document.querySelector("#degrees");
    let displayWind = document.querySelector("#wind");

    celsiusTemperature = Math.round(response.data.temperature.current);

    displayCity.innerHTML = response.data.city;
    displayDate.innerHTML = showDate(response.data.time * 1000);
    displayDescription.innerHTML = response.data.condition.description;
    displayHumidity.innerHTML = Math.round(response.data.temperature.humidity);
    displayIcon.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
    displayIcon.setAttribute("alt", response.data.condition.description);
    displayTemperature.innerHTML = Math.round(celsiusTemperature);
    displayWind.innerHTML = Math.round(response.data.wind.speed);
}

// Unit conversion Fahrenheit
function showFahrenheitData(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 1.8) + 32;
    let displayTemperature = document.querySelector("#degrees");
    displayTemperature.innerHTML = Math.round(fahrenheitTemperature);
    
}

//Unit conversion Celsius
function showCelsiusData(event) {
    event.preventDefault();
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    let displayTemperature = document.querySelector("#degrees");
    displayTemperature.innerHTML = Math.round(celsiusTemperature);
    
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitData);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusData);


// Search Engine functionality
function search(city) {
    let apiKey = "7a45btfdd9a2a5b0bb56a376f3of7ede";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

    axios.get(apiUrl).then(showTemperature);
}

function searchEngine(event) {
    event.preventDefault();
    let inputCity = document.querySelector("#search-city");

    search(inputCity.value);
    
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchEngine);