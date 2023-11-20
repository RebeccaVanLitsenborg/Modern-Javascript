const button = document.querySelector('#submit-search');
const inputField = document.querySelector('#cityName');
// Check if script is read by the browser!
console.log("script is running")
// import data from different files
/*import WMO_CODES from "./wmo_codes.js";*/
import API from "./config.js";


//getting my container element
const cityNameContainer = document.querySelector('.city-info')
// Weekdays listed in the order used by the Date object in javascript
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// In case I want to switch to a different format:
/*const weekdays2 = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];*/
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

async function handleButtonClick() {
    // Get the city name from the input field
    const theNameOfTheCity = inputField.value.trim();

    if (theNameOfTheCity) {
        try {
            // Fetch weather data and update the UI
            const data = await fetchWeatherData(theNameOfTheCity);
            cityNameContainer.textContent = `${data.location.name}, ${data.location.country}`;
            container.innerHTML = ''; // Clear existing content in the container
        } catch (error) {
            // Handle errors during weather data fetching
            console.error("An unexpected error occurred:", error);
        }
    }
}
                // Create cards for each days (first 5 days) of the week.
                // if I want to have 7 days, I just need to augment the number in the loop condition from 5 to 7
                for(let i= 0; i < 5; i++) {

                    // get the container again for add the cards
                    const div = document.querySelector('.container');

                    // d = date
                    const d = new Date()
                    // console.log(weekdays[(d.getDay() + i) % 7])
                    // dow = dateOfWeek
                    const dow = weekdays[(d.getDay() + i) % 7]
                
                    // Create the elements with Data
                    const card = document.createElement('div');
                    card.classList.add("card");
                    
                    // if it's the first element (index === 0), add a second class: "main-card" for unique styling
                    if (i === 0) card.classList.add("main-card");
                
                    div.appendChild(card);
                
                    const initialContentBeforeSlideAnimation = document.createElement('div');
                    initialContentBeforeSlideAnimation.classList.add("imgBx");
                    card.appendChild(initialContentBeforeSlideAnimation);
                    

                    const cardImg = document.createElement('img');
                    cardImg.src = data.forecast.forecastday[i].day.condition.icon;
                    cardImg.alt = "Icon describing the following weather: " + data.forecast.forecastday[i].day.condition.text;
                    initialContentBeforeSlideAnimation.appendChild(cardImg);

                    const contentBox = document.createElement("div");
                    contentBox.classList.add("contentBx");
                    card.appendChild(contentBox);
                
                    const dowContentBeforeSliderAnimation = document.createElement("h2");
                    dowContentBeforeSliderAnimation.innerHTML = dow;
                    contentBox.appendChild(dowContentBeforeSliderAnimation);
                
                    console.log(data.forecast.forecastday[i].day.condition.text);
                    const tempDescription = document.createElement("h4");
                    tempDescription.innerHTML = data.forecast.forecastday[i].day.condition.text;
                    contentBox.appendChild(tempDescription);
                
                    const currentTempBox = document.createElement("div");
                    currentTempBox.classList.add("color");
                    contentBox.appendChild(currentTempBox)
                
                    const currentTempHeader = document.createElement("h3");
                    currentTempHeader.innerHTML = "Temp:"
                    currentTempBox.appendChild(currentTempHeader);
                
                    const currentT = document.createElement("span");
                    currentT.classList.add("current-temp");

                    // OLD structure from different API
                    // let averageTemp = (result.daily.temperature_2m_min[i] + result.daily.temperature_2m_max[i]) / 2;
                    // if(i === 0) averageTemp = result.current.temperature_2m;

                // NEW structure:
                currentT.innerHTML = data.forecast.forecastday[i].day.avgtemp_c + "°C";
                currentTempBox.appendChild(currentT);
            
                const minMax = document.createElement("div");
                minMax.classList.add("details");
                contentBox.appendChild(minMax);
            
                const minMaxTempHeader = document.createElement("h3");
                minMaxTempHeader.innerHTML = "More:"
                minMax.appendChild(minMaxTempHeader);
            
                const minT = document.createElement("span");
                minT.classList.add("min-temp")
                minT.innerHTML = data.forecast.forecastday[i].day.mintemp_c  + "°C";
                minMax.appendChild(minT);
            
                const maxT = document.createElement("span");
                maxT.classList.add("max-temp")
                maxT.innerHTML = data.forecast.forecastday[i].day.maxtemp_c + "°C";
                minMax.appendChild(maxT);
                };
            

            for(let i= 0; i < 5; i++) {
                const container = document.querySelector('.container');

                const date = new Date()
                // console.log(weekdays[(date.getDay() + i) % 7])
                const dayOfTheWeek = weekdays[(date.getDay() + i) % 7]
            
                // Create the elements with Data
                const card = document.createElement('div');
                card.classList.add("card");
            
                if (i === 0) card.classList.add("main-card");
            
                container.appendChild(card);
            
                const imageBox = document.createElement('div');
                imageBox.classList.add("imgBx");
                card.appendChild(imageBox);
            
                const cardImg = document.createElement('img');
                cardImg.src = data.forecast.forecastday[i].day.condition.icon;
                imageBox.appendChild(cardImg);
                
                const contentBox = document.createElement("div");
                contentBox.classList.add("contentBx");
                card.appendChild(contentBox);
            
                const cardHeader = document.createElement("h2");
                cardHeader.innerHTML = dayOfTheWeek;
                contentBox.appendChild(cardHeader);
            
                console.log(data.forecast.forecastday[i].day.condition.text);
                const tempDescription = document.createElement("h4");
                tempDescription.innerHTML = data.forecast.forecastday[i].day.condition.text;
                contentBox.appendChild(tempDescription);
            
                const currentTempBox = document.createElement("div");
                currentTempBox.classList.add("color");
                contentBox.appendChild(currentTempBox)
            
                const currentTempHeader = document.createElement("h3");
                currentTempHeader.innerHTML = "Temp:"
                currentTempBox.appendChild(currentTempHeader);
            
                const currentTemp = document.createElement("span");
                currentTemp.classList.add("current-temp");

                // OLD structure from different API
                // let averageTemp = (result.daily.temperature_2m_min[i] + result.daily.temperature_2m_max[i]) / 2;
                // if(i === 0) averageTemp = result.current.temperature_2m;
                currentTemp.innerHTML = data.forecast.forecastday[i].day.avgtemp_c + "°C";
                currentTempBox.appendChild(currentTemp);
            
                const minMaxTemperatures = document.createElement("div");
                minMaxTemperatures.classList.add("details");
                contentBox.appendChild(minMaxTemperatures);
            
                const minMaxTempHeader = document.createElement("h3");
                minMaxTempHeader.innerHTML = "More:"
                minMaxTemperatures.appendChild(minMaxTempHeader);
            
                const minTemp = document.createElement("span");
                minTemp.classList.add("min-temp")
                minTemp.innerHTML = data.forecast.forecastday[i].day.mintemp_c  + "°C";
                minMaxTemperatures.appendChild(minTemp);
            
                const maxTemp = document.createElement("span");
                maxTemp.classList.add("max-temp")
                maxTemp.innerHTML = data.forecast.forecastday[i].day.maxtemp_c + "°C";
                minMaxTemperatures.appendChild(maxTemp);
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