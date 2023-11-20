const button = document.querySelector('#submit-search');
const inputField = document.querySelector('#cityName');
// Check if script is read by the browser!
console.log("script is running")
// import data from different files
import API from "./config.js";

// getting my container element
const cityNameContainer = document.querySelector('.city-info')
// Weekdays listed in the order used by the Date object in JavaScript
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Check if weekdays are correctly displayed
console.log(weekdays);
// check if API is correctly imported
console.log(API)

async function fetchWeatherData(cityName) {
    try {
        const response = await fetch("http://api.weatherapi.com/v1/forecast.json?key=" + API.key + "&q=" + cityName + "&days=7&aqi=no&alerts=no");
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

function createCard(container, dayOfTheWeek, weatherData, i) {
    const card = document.createElement('div');
    card.classList.add("card");

    if (i === 0) card.classList.add("main-card");
    container.appendChild(card);

    const imageBox = document.createElement('div');
    imageBox.classList.add("imgBx");
    card.appendChild(imageBox);

    const cardImg = document.createElement('img');
    cardImg.src = weatherData.day.condition.icon;
    imageBox.appendChild(cardImg);

    const contentBox = document.createElement("div");
    contentBox.classList.add("contentBx");
    card.appendChild(contentBox);

    const cardHeader = document.createElement("h2");
    cardHeader.innerHTML = dayOfTheWeek;
    contentBox.appendChild(cardHeader);

    console.log(weatherData.day.condition.text);
    const tempDescription = document.createElement("h4");
    tempDescription.innerHTML = weatherData.day.condition.text;
    contentBox.appendChild(tempDescription);

    const currentTempBox = document.createElement("div");
    currentTempBox.classList.add("color");
    contentBox.appendChild(currentTempBox);

    const currentTempHeader = document.createElement("h3");
    currentTempHeader.innerHTML = "Temp:"
    currentTempBox.appendChild(currentTempHeader);

    const currentTemp = document.createElement("span");
    currentTemp.classList.add("current-temp");
    currentTemp.innerHTML = weatherData.day.avgtemp_c + "°C";
    currentTempBox.appendChild(currentTemp);

    const minMaxTemperatures = document.createElement("div");
    minMaxTemperatures.classList.add("details");
    contentBox.appendChild(minMaxTemperatures);

    const minMaxTempHeader = document.createElement("h3");
    minMaxTempHeader.innerHTML = "More:"
    minMaxTemperatures.appendChild(minMaxTempHeader);

    const minTemp = document.createElement("span");
    minTemp.classList.add("min-temp")
    minTemp.innerHTML = weatherData.day.mintemp_c + "°C";
    minMaxTemperatures.appendChild(minTemp);

    const maxTemp = document.createElement("span");
    maxTemp.classList.add("max-temp")
    maxTemp.innerHTML = weatherData.day.maxtemp_c + "°C";
    minMaxTemperatures.appendChild(maxTemp);
}

async function handleButtonClick() {
    // Get the city name from the input field
    const theNameOfTheCity = inputField.value.trim();

    if (theNameOfTheCity) {
        try {
            // Fetch weather data
            const data = await fetchWeatherData(theNameOfTheCity);

            // Update the UI with fetched data
            cityNameContainer.textContent = `${data.location.name}, ${data.location.country}`;

            // Loop to create cards
            const container = document.querySelector('.container');
            for (let i = 0; i < 7; i++) {
                const date = new Date()
                const dayOfTheWeek = weekdays[(date.getDay() + i) % 7]
                createCard(container, dayOfTheWeek, data.forecast.forecastday[i]);
            }
        } catch (error) {
            // Handle errors during weather data fetching
            console.error("An unexpected error occurred:", error);
        }
    }
}

inputField.addEventListener('keyup', function (event) {
    if (event.code === 'Enter') {
        handleButtonClick();
    }
});

button.addEventListener('click', function () {
    handleButtonClick();
});

// This is a weather web application made for educational purposes. Please do not commercialize this project in any way whatsoever.
// Made by a BeCode technical coach whom had a lot of fun making "bad code", and improved by the very learners of this class.
// I want to mention that this is a fully working app, but can be optimized by: 
// cleaning up, 
// refactoring the code, 
// renaming the variables, 
// removing redundant code,
// removing unnecessary comments,
// storing information into variables for easier and more readable use 