function updateWeather(data) {
    document.getElementById('temperature').innerText = data.temperature + '°C';
    document.getElementById('pressure').innerText = data.pressure + ' hPa';
    document.getElementById('humidity').innerText = data.humidity + '%';
}

async function fetchWeatherData() {
    try {
        const response = await fetch('data.txt');
        const text = await response.text();
        const [pressure, temperature, humidity] = text.split(',');

        const weatherData = {
            temperature: temperature.trim(),
            pressure: pressure.trim(),
            humidity: humidity.trim()
        };

        updateWeather(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Fetch weather data every second
setInterval(fetchWeatherData, 1000);
