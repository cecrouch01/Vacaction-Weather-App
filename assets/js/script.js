var searchBtn = document.querySelector(".btn");
var searchBar = document.querySelector(".search");
var forecastEl = document.querySelector(".forecast-div")
var cityPlacement = document.querySelector(".city-name");
var datePlacement = document.querySelectorAll(".card-title");
var iconPlacement = document.querySelectorAll(".icon");
var tempPlacement = document.querySelectorAll(".temp");
var windPlacement = document.querySelectorAll(".wind");
var humidtyPlacement = document.querySelectorAll(".humidity");

//This gets the weather data from the Open Weather API
function getWeatherData(cityInfo) {
    var lat = cityInfo[0].lat;
    var lon = cityInfo[0].lon;
    //This gets the city data using the Latitude and Longitude
    var weatherUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=a728373b0bd6ce58d588e4fe9fdacada&units=imperial"
    return fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
}
function renderData(weatherData) {
    //This displays the information
    forecastEl.setAttribute("style", "display: inline");
    //This gets the data for the current date and the 5 future dates. 
    var cityName = weatherData.city.name

    var selectedData = [
        weatherData.list[0],
        weatherData.list[7],
        weatherData.list[15],
        weatherData.list[23],
        weatherData.list[31],
        weatherData.list[39],
    ]

    var weatherForecast = selectedData.map(function(data) {
        return {
            date: data.dt_txt,
            icon: data.weather[0].icon,
            temp: data.main.temp,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
        };
    })
    //This saves the 
    localStorage.setItem(cityName, JSON.stringify(weatherForecast));
    var cityWeatherData = JSON.parse(localStorage.getItem(cityName));
    cityPlacement.textContent = cityName
    //This sets the data for each card
    renderForecastData(cityWeatherData)
    //This creates the button to display previous history
    var buttonElement = document.querySelector(".list-group");
    var cityButton = document.createElement("button");
    var cityNameId = cityName.replaceAll(" ", "-")
    cityButton.textContent = cityName
    cityButton.className = "list-group-item"
    cityButton.setAttribute("id", cityNameId)
    buttonElement.appendChild(cityButton)

    //This creates a event listener that applies previous forecast data to be displayed
    var previousCityBtn = document.querySelector("#" + cityNameId);
    previousCityBtn.addEventListener("click", function (event) {
        event.preventDefault();
        var savedCityData = JSON.parse(localStorage.getItem(cityNameId.replaceAll("-", " ")))
        //This resets the name of the city to match the reset data
        cityPlacement.textContent = cityNameId.replaceAll("-", " ")
        //This resets the date for each card
       renderForecastData(savedCityData)
    })
}
//This displays the data from a previously viewed city
function renderPreviousData(cityData) {
    for (var i = 0; i < datePlacement.length; i++) {
        datePlacement[i].textContent = cityData[i].date
    }
    //This resets the icon for each card
    for (var i = 0; i < iconPlacement.length; i++) {
        iconPlacement[i].setAttribute("src", "https://openweathermap.org/img/w/" + cityData[i].icon + ".png")
    }
    //This resets the temp for each card
    for (var i = 0; i < tempPlacement.length; i++) {
        tempPlacement[i].textContent = "Temperature: " + cityData[i].temp + "°F"
    }
    //This resets the Wind Speed for each card
    for (var i = 0; i < windPlacement.length; i++) {
        windPlacement[i].textContent = "Wind Speed: " + cityData[i].windSpeed + " MPH"
    }
    //This resets the Huumidity for each card
    for (var i = 0; i < humidtyPlacement.length; i++) {
        humidtyPlacement[i].textContent = "Humidity: " + cityData[i].humidity + "%"
    }
}
//This Displays the error message
function errorMessage() {
    // window.alert('Please format search to "City", "State"')
    document.getElementById("error").textContent = `Please format search to "City", "State"`
}
//This grabs the geocoding information to find Latitude and Longitude
function getLatLon(city, state) {   
        var geocodingUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + "&appid=6debcc5035bdc6a46835d5821d6f4874"
        return fetch(geocodingUrl)
            .then(function (response) {
                return response.json();
            })
}
//This function fetches the city data
function getCityWeather(location) {
    var locationArray = location.split(",")
    var city = locationArray[0]
    var state = locationArray[1]
    getLatLon(city, state)
        .then(getWeatherData)
        .then(renderData)
        .catch(errorMessage)
}
//This adds an event listener to the button to start the functions
searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    getCityWeather(searchBar.value.replaceAll(" ", "_"));

})

