// Define variables for elements in the HTML
let locationInput = document.getElementById('location-input');
const searchButton = document.getElementById('weatherForm');
const locationSpan = document.getElementById('location');
const temperatureSpan = document.getElementById('temperature');
const conditionSpan = document.getElementById('condition');
let weatherIcon = document.querySelector('.weather-icon img');
const inFahrenheit = document.querySelector('.fahrenheit');
const inCelsius = document.querySelector('.celsius');
let temperature;
let tempInCelsius;
let tempInFahrenheit;

// Event listener for the search button
searchButton.addEventListener('submit', (e) => {
    e.preventDefault();
    let location = locationInput.value;
   
    if (location.trim() === '') {
        alert('Please enter a location.');
        return;
    }

    // Replace 'YOUR_API_KEY' with your actual yr.no API key
    //const apiKey = 'YOUR_API_KEY';
    const apiKey = '82f7fc8dcaf25424134c685a20978535';



    // Construct the API URL
    //const apiUrl = `https://api.met.no/weatherapi/locationforecast/2.0/compact?query=${encodeURIComponent(location)}`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&APPID=82f7fc8dcaf25424134c685a20978535&units=metric`;
    

    // Fetch weather data from OpenWeatherMap API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Extract weather information from the API response
            temperature = data.main.temp;
            const condition = data.weather[0].description;
            tempInCelsius = true;
            weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            // Update the HTML with the weather information
            console.log(locationSpan.textContent = location)
            console.log(temperatureSpan.textContent = `${temperature}°C`)
            console.log(conditionSpan.textContent = condition)

            // You may also update the weather icon here if OpenWeatherMap provides image URLs
            // if (condition === 'ra')
           

        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
        locationInput.value = ''

        inFahrenheit.addEventListener('click', convertToFahrenhiet);
        inCelsius.addEventListener('click', convertToCelsius);
});

function convertToFahrenhiet () {
    if (tempInCelsius) {
        temperature = (temperature * 9/5) + 32;
        console.log(temperature);
        temperatureSpan.innerHTML = temperature.toFixed(2) + "°F";
        tempInFahrenheit = true;
        tempInCelsius = false;
    }
}

function convertToCelsius () {
    if (tempInFahrenheit) {
        temperature = (temperature - 32) * 5/9;
        console.log(temperature);
        temperatureSpan.innerHTML = temperature.toFixed(2) + "°C";
        tempInFahrenheit = false;
        tempInCelsius = true;
    }
}