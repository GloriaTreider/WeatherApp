// Define variables for elements in the HTML
const locationSpan = document.getElementById('location');
const conditionSpan = document.getElementById('condition');
let weatherIcon = document.querySelector('.weather-icon img');
const searchButton = document.getElementById('weatherForm');
let temperature;
let tempInCelsius;
let tempInFahrenheit;
let locationInput = document.getElementById('location-input');
const temperatureSpan = document.getElementById('temperature');
const inFahrenheit = document.querySelector('.fahrenheit');
const inCelsius = document.querySelector('.celsius');

window.addEventListener('load', function () {
    let cookie = getCookie('savedLocation');
    let ip = fetchIPAddress();
    if (!cookie && !ip) {
       return;
    } else if (cookie) {
        getCookie('savedLocation');
    } else {
        fetchIPAddress();
    }
})


// Event listener for the search button
searchButton.addEventListener('submit', (e) => {
    e.preventDefault();
    let location = locationInput.value;
    if (location.trim() === '') {
        alert('Please enter a location.');
        return;
    }
    fetchLongLat(location);
    setCookie('savedLocation', location.split(' ').join('%20'));

});

async function fetchIPAddress() {
    try {
        const ipApiKey = process.env.IPSTACK_API_KEY;
        const ipApi = `http://api.ipstack.com/check?access_key=${ipApiKey}`
        const response = await fetch(ipApi);
        const data = await response.json();
        fetchLongLat(`${data.city} + ${data.region_name}`);
    } catch (error) {
        console.error(error)
    }

}

async function fetchLongLat(location) {
    try {
        const api = `https://geocode.maps.co/search?q=${location}`
        const response = await fetch(api);
        const data = await response.json();
        console.log(data);
        console.log(data[0].lat, data[0].lon);
        fetchWeather(data[0].lat, data[0].lon, data[0].display_name);
    } catch (error) {
        console.error(error);
    }

}


async function fetchWeather(lat, lon, location) {

    // Replace 'YOUR_API_KEY' with your actual yr.no API key

    const apiKey = process.env.OPEN_WEATHER_API_KEY;

    // Construct the API URL
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

    try {
        // Fetch weather data from OpenWeatherMap API
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data)
        // Extract weather information from the API response
        temperature = data.main.temp;
        const condition = data.weather[0].description;
        tempInCelsius = true;
        tempInFahrenheit = false;
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        // Update the HTML with the weather information
        console.log(locationSpan.textContent = location)
        console.log(temperatureSpan.textContent = `${temperature}°C`)
        console.log(conditionSpan.textContent = condition)

        // You may also update the weather icon here if OpenWeatherMap provides image URLs
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
    locationInput.value = ''
    inFahrenheit.addEventListener('click', convertToFahrenhiet);
    inCelsius.addEventListener('click', convertToCelsius);
}

function convertToFahrenhiet() {
    if (tempInCelsius) {
        temperature = (temperature * 9 / 5) + 32;
        console.log(temperature);
        temperatureSpan.innerHTML = temperature.toFixed(2) + "°F";
        tempInFahrenheit = true;
        tempInCelsius = false;
    }
}

function convertToCelsius() {
    if (tempInFahrenheit) {
        temperature = (temperature - 32) * 5 / 9;
        console.log(temperature);
        temperatureSpan.innerHTML = temperature.toFixed(2) + "°C";
        tempInFahrenheit = false;
        tempInCelsius = true;
    }
}

function setCookie(cname, value) {
    return localStorage.setItem(cname, value)
}

function getCookie(cname) {
    return localStorage.getItem(cname);
}