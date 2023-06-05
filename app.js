// Set the API key for the weather API
const WEATHER_API_KEY = '227a1e141c5ac1eec0e855c49fd664fe';

// Get references to HTML elements
const form = document.querySelector('#searchForm');
const displayInfo = document.querySelector('article');
const temperature = document.querySelector('#temperature');
const description = document.querySelector('#description');
const humidity = document.querySelector('#humidity');
const windspeed = document.querySelector('#windspeed')
const image = document.querySelector('#displayImage')
const headerMessage = document.querySelector('.header Message1')
const cityName = document.querySelector('cityNameDisplay')

// Fetch weather data from the weather API and update the webpage with the data
async function fetchWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${WEATHER_API_KEY}`)
    const data = await response.json()

    // Update the webpage with the fetched weather data
    temperature.innerText = data.main.temp + '° F';
    humidity.innerText = data.main.humidity + '%  Humidity';
    windspeed.innerText = data.wind.speed + ' MPH Winds';
    description.innerText = 'Description: ' + data.weather[0].description;
}

// Fetch image data from the teleport API and update the webpage with the image
async function fetchImage(city) {
    const response = await fetch(`https://api.teleport.org/api/urban_areas/slug:${city.toLowerCase()}/images/`)
    const data = await response.json()

    // Update the webpage with the fetched image data
    image.src = data.photos[0].image.mobile
}

// Listen for the form submission and fetch the weather and image data for the entered city
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const city = form.elements.query.value
    await fetchWeather(city);
    await fetchImage(city);
    cityName.innerText = city
})
