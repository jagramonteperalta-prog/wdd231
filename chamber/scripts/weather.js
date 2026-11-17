const currentTemp = document.querySelector('#current-temp');
const weatherDescription = document.querySelector('#weather-description');
const forecastContainer = document.querySelector('#forecast-container');

const url = "https://api.openweathermap.org/data/2.5/weather?lat=18.4861&lon=-69.9312&units=imperial&appid=ebc48022ba51a51af4f0210086c12e4c";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=18.4861&lon=-69.9312&units=imperial&appid=ebc48022ba51a51af4f0210086c12e4c";

async function apiFetch() {
    try {
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw new Error(await response.text());
        }

    } catch (error) {
        console.error(error);
    }
}

async function forecastFetch() {
    try {
        const response = await fetch(forecastUrl);

        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

apiFetch();
forecastFetch();

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    weatherDescription.textContent = data.weather[0].description;
}

function displayForecast(data) {
    const forecast = [
        data.list[8],
        data.list[16],
        data.list[24]
    ];

    console.log(forecast);

    forecast.forEach(day => {
        const article = document.createElement('article');

        console.log(`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`);

        article.innerHTML = `
            <h4>${new Date(day.dt * 1000).toLocaleDateString()}</h4>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="${day.weather[0].description}">
            <p>Temperature: ${day.main.temp}&deg;F</p>
            <p>${day.weather[0].description}</p>
        `;
        forecastContainer.appendChild(article);
    });
}