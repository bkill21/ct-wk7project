//This is my api key
const _WEATHERAPIKEY = '227a1e141c5ac1eec0e855c49fd664fe'
const form = document.querySelector('#searchForm');

// HTML -> objects
const displayInfo = document.querySelector('article');
const temperature = document.querySelector('#temperature');
const description = document.querySelector('#description');
const humidity = document.querySelector('#humidity');
const windspeed = document.querySelector('#windspeed')
const image = document.querySelector('#displayImage')
const headerMessage = document.querySelector('.header Message1')
const cityName = document.querySelector('cityNameDisplay')

// grab the API data
async function grabData(cityInput) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&appid=${_WEATHERAPIKEY}`)
    let res = await response.json()

    temperature.innerText = res.main.temp + '° F';
    humidity.innerText = res.main.humidity + '%  Humidity';
    windspeed.innerText = res.wind.speed + ' MPH Winds';
    description.innerText = 'Description: ' + res.weather[0].description;
}

async function grabImage(cityInput) {
    const response = await fetch(`https://api.teleport.org/api/urban_areas/slug:${cityInput.toLowerCase()}/images/`)
    let res = await response.json()
    // console.log(res.photos[0].image.web)
    image.src = res.photos[0].image.mobile
}

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const cityInput = form.elements.query.value
    grabData(cityInput);
    grabImage(cityInput);
    cityName.innerText = cityInput
})