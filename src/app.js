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

    return `<em>Last updated: ${day} ${hours}:${minutes}</em>`;
}

//Get the Forecast API
function seekForecast(coordinates) {
    let apiKey = `7a45btfdd9a2a5b0bb56a376f3of7ede`;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showForecast);
}

// Displaying all the data for given city

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


    seekForecast(response.data.coordinates)
}

//Displaying Forecast in HTML
function forecastFormatDate(timestamp) {
    let date = new Date(timestamp * 1000);

    let calendarDate = date.getDate();
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let month = date.getMonth();
    let year = date.getFullYear();

    return `${days[day]} ${calendarDate}.${month+1}.${year}`;
}

function showForecast(response) {
    let dailyForecast = response.data.daily;

    let forecastSection = document.querySelector("#forecast");

    let forecastHTML = ``;
    dailyForecast.forEach(function (forecastDay, index) {
        if (index < 5 ){
        forecastHTML = forecastHTML + `
            <div class="row forecast-day">
                <div class="col-6 forecast-date">
                    <h3>${forecastFormatDate(forecastDay.time)}</h3>
                </div>
                <div class="col-2">
                    <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" alt="${forecastDay.condition.icon}">
                </div>
                <div class="col-4 forecast-temperature">
                    <p>Max: ${Math.round(forecastDay.temperature.maximum)} <br> Min: ${Math.round(forecastDay.temperature.minimum)}</p>
                </div>
            </div>`;
        }
    })

    forecastSection.innerHTML = forecastHTML;
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
    let apiKey = `7a45btfdd9a2a5b0bb56a376f3of7ede`;
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showTemperature);
}

function searchEngine(event) {
    event.preventDefault();
    let inputCity = document.querySelector("#search-city");

    search(inputCity.value);
    
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchEngine);