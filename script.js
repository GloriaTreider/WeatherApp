// Define variables for elements in the HTML
const locationInput = document.getElementById('location-input');
const searchButton = document.getElementById('search-button');
const locationSpan = document.getElementById('location');
const temperatureSpan = document.getElementById('temperature');
const conditionSpan = document.getElementById('condition');
let weatherIcon = document.querySelector('.weather-icon img');

// Event listener for the search button
searchButton.addEventListener('click', () => {
    const location = locationInput.value;
   
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
            const temperature = data.main.temp;
            const condition = data.weather[0].description;
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
});