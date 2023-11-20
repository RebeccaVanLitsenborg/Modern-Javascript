const button = document.querySelector('#submit-search');
const inputField = document.querySelector('#cityName');

import API from "./config.js";

const cityNameContainer = document.querySelector('.city-info')
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
    const card = createCardElement(i);
    container.appendChild(card);

    const imageBox = createImageBox(card);
    createCardImg(imageBox, weatherData.day.condition.icon);

    const contentBox = createContentBox(card);
    createCardHeader(contentBox, dayOfTheWeek);
    createTempDescription(contentBox, weatherData.day.condition.text);

    const currentTempBox = createCurrentTempBox(contentBox);
    createCurrentTemp(currentTempBox, weatherData.day.avgtemp_c);

    const minMaxTemperatures = createMinMaxTemperatures(contentBox);
    createMinMaxTempHeader(minMaxTemperatures);
    createMinMaxTemp(minMaxTemperatures, 'Min', weatherData.day.mintemp_c);
    createMinMaxTemp(minMaxTemperatures, 'Max', weatherData.day.maxtemp_c);
}

function createCardElement(i) {
    const card = document.createElement('div');
    card.classList.add("card");
    if (i === 0) card.classList.add("main-card");
    return card;
}

function createImageBox(card) {
    const imageBox = document.createElement('div');
    imageBox.classList.add("imgBx");
    card.appendChild(imageBox);
    return imageBox;
}

function createCardImg(imageBox, iconSrc) {
    const cardImg = document.createElement('img');
    cardImg.src = iconSrc;
    imageBox.appendChild(cardImg);
}

function createContentBox(card) {
    const contentBox = document.createElement("div");
    contentBox.classList.add("contentBx");
    card.appendChild(contentBox);
    return contentBox;
}

function createCardHeader(contentBox, dayOfTheWeek) {
    const cardHeader = document.createElement("h2");
    cardHeader.innerHTML = dayOfTheWeek;
    contentBox.appendChild(cardHeader);
}

function createTempDescription(contentBox, conditionText) {
    const tempDescription = document.createElement("h4");
    tempDescription.innerHTML = conditionText;
    contentBox.appendChild(tempDescription);
}

function createCurrentTempBox(contentBox) {
    const currentTempBox = document.createElement("div");
    currentTempBox.classList.add("color");
    contentBox.appendChild(currentTempBox);
    return currentTempBox;
}

function createCurrentTemp(currentTempBox, avgTemp) {
    const currentTempHeader = document.createElement("h3");
    currentTempHeader.innerHTML = "Temp:";
    currentTempBox.appendChild(currentTempHeader);

    const currentTemp = document.createElement("span");
    currentTemp.classList.add("current-temp");
    currentTemp.innerHTML = avgTemp + "°C";
    currentTempBox.appendChild(currentTemp);
}

function createMinMaxTemperatures(contentBox) {
    const minMaxTemperatures = document.createElement("div");
    minMaxTemperatures.classList.add("details");
    contentBox.appendChild(minMaxTemperatures);
    return minMaxTemperatures;
}

function createMinMaxTempHeader(minMaxTemperatures) {
    const minMaxTempHeader = document.createElement("h3");
    minMaxTempHeader.innerHTML = "More:";
    minMaxTemperatures.appendChild(minMaxTempHeader);
}

function createMinMaxTemp(minMaxTemperatures, label, temp) {
    const tempElement = document.createElement("span");
    tempElement.classList.add(label.toLowerCase() + "-temp");
    tempElement.innerHTML = temp + "°C";
    minMaxTemperatures.appendChild(tempElement);
}

async function handleButtonClick() {
    // Get the city name from the input field
    const theNameOfTheCity = inputField.value.trim();

    if (theNameOfTheCity) {
        try {
            // Fetch weather data
            const data = await fetchWeatherData(theNameOfTheCity);

            cityNameContainer.textContent = `${data.location.name}, ${data.location.country}`;

            // Loop to create cards
            const container = document.querySelector('.container');
            for (let i = 0; i < 7; i++) {
                const date = new Date()
                const dayOfTheWeek = weekdays[(date.getDay() + i) % 7]
                createCard(container, dayOfTheWeek, data.forecast.forecastday[i]);
            }
        } catch (error) {
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