// OpenWeatherMap API
const apiKey = '66f8534b5acd24072fcb2691319613f0'; // Replace with your OpenWeatherMap API key
const city = 'Delhi'; // Replace with your desired city

// Elements
const cityInput = document.getElementById('city-input');
const fetchWeatherBtn = document.getElementById('fetch-weather');
const weatherContainer = document.getElementById('weather-container');
const loading = document.getElementById('loading');
const weatherDetails = document.getElementById('weather-details');
const weatherError = document.getElementById('weather-error');

// Fetch weather based on the user input
fetchWeatherBtn.addEventListener('click', function () {
  const city = cityInput.value;
  if (city) {
    fetchWeather(city);
  } else {
    alert('Please enter a city name!');
  }
});

// Function to fetch weather data
function fetchWeather(city) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  // Show loading spinner
  loading.style.display = 'block';
  weatherDetails.style.display = 'none';
  weatherError.textContent = '';

  fetch(apiURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found!');
      }
      return response.json();
    })
    .then(data => {
      // Hide loading spinner
      loading.style.display = 'none';
      weatherDetails.style.display = 'block';

      // Display weather data
      document.getElementById('city').textContent = data.name;
      document.getElementById('temperature').textContent = data.main.temp;
      document.getElementById('humidity').textContent = data.main.humidity;
      document.getElementById('weather-description').textContent = data.weather[0].description;
    })
    .catch(error => {
      // Hide loading spinner
      loading.style.display = 'none';
      weatherError.textContent = error.message;
    });
}

// Simulate fetching DHT11 sensor data from the backend
function fetchSensorData() {
  // In a real project, you would fetch from your Raspberry Pi server
  // This is a simulated example
  const sensorData = {
    temperature: 25.5,
    humidity: 60
  };

  document.getElementById('sensor-temp').textContent = sensorData.temperature;
  document.getElementById('sensor-humidity').textContent = sensorData.humidity;
}

// Run to load the sensor data (assuming it's available instantly)
fetchSensorData();
