const API_KEY = "eb4962083f40fb1edf6da816c65096b0"; // Replace with your OpenWeatherMap API key
const weatherDataDiv = document.getElementById('weatherData');
const currentLocationWeatherDiv = document.getElementById('currentLocationWeather');
const fetchWeatherButton = document.getElementById('fetchWeather');

// Fetch weather for user-inputted location
fetchWeatherButton.addEventListener('click', () => {
    const locationInput = document.getElementById('locationInput').value;
    if (locationInput) {
        getWeather(locationInput);
    } else {
        alert('Please enter a city name.');
    }
});

// Fetch weather for current location
function getCurrentLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            getWeatherByCoordinates(latitude, longitude);
        }, () => {
            alert('Unable to retrieve your location.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Fetch weather data by city name
function getWeather(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=eb4962083f40fb1edf6da816c65096b0&units=metric`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => displayWeather(data, weatherDataDiv))
        .then(weatherDataDiv.style.opacity =1)
        .catch(error => {
            weatherDataDiv.innerHTML = `<p>${error.message}</p>`;
        });
}

// Fetch weather data by coordinates
function getWeatherByCoordinates(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Unable to retrieve weather data');
            }
            return response.json();
        })
        .then(data => displayWeather(data, currentLocationWeatherDiv))
        .catch(error => {
            currentLocationWeatherDiv.innerHTML = `<p>${error.message}</p>`;
        });
}

// Display weather data
function displayWeather(data, targetDiv) {
    const { name, main, weather } = data;
    console.log(data)
    targetDiv.innerHTML = ` 
        <div style="font-size: 5vh; margin-top:5px; display:flex; margin:0px 250px; gap:5px; "> ${name}<h1 > ${data.sys.country}</h1></div>
        <p style="font-size: 3vh; margin-top:20px; font-weight:500">${main.temp}°C</p>
        <p> feels like :${main.feels_like}°C</p>
        <p> ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind speeds: ${data.wind.speed}km/h</p>
        <p>pressure: ${main.pressure}</p>
    `;
}

// Call the function to get current location weather on page load
getCurrentLocationWeather();