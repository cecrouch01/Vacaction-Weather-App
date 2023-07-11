var searchBtn = document.querySelector(".btn");
var searchBar = document.querySelector(".search");

//This function fetches the city data
function getCityWeather(location) {
    var locationArray = location.split(",")
    var city = locationArray[0]
    var state = locationArray[1]
    //This grabs the geocoding information to find Latitude and Longitude
    var geocodingUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + "&appid=6debcc5035bdc6a46835d5821d6f4874"
    fetch(geocodingUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(cityInfo) {
            var lat = cityInfo[0].lat;
            var lon = cityInfo[0].lon;
            //This gets the city data using the Latitude and Longitude
            var weatherUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=a728373b0bd6ce58d588e4fe9fdacada&units=imperial"
            return fetch(weatherUrl)
                .then (function(response){
                return response.json();
            })
        }).then(function(weatherData) {
            //This gets the data for the current date and the 5 future dates. 
            var cityName = weatherData.city.name
            var weatherForecast = [
                //Weather Data for Current Day
                {
                    date: weatherData.list[0].dt_txt,
                    icon: weatherData.list[0].weather[0].icon,
                    temp: weatherData.list[0].main.temp,
                    humidity: weatherData.list[0].main.humidity,
                    windSpeed: weatherData.list[0].wind.speed,
                },
                //Weather date for 1 day out
                {
                    date: weatherData.list[7].dt_txt,
                    icon: weatherData.list[7].weather[0].icon,
                    temp: weatherData.list[7].main.temp,
                    humidity: weatherData.list[7].main.humidity,
                    windSpeed: weatherData.list[7].wind.speed,
                },
                //Weather data for two days out
                {
                    date: weatherData.list[15].dt_txt,
                    icon: weatherData.list[15].weather[0].icon,
                    temp: weatherData.list[15].main.temp,
                    humidity: weatherData.list[15].main.humidity,
                    windSpeed: weatherData.list[15].wind.speed,
                },
                //Weather data for three days out
                {
                    date: weatherData.list[23].dt_txt,
                    icon: weatherData.list[23].weather[0].icon,
                    temp: weatherData.list[23].main.temp,
                    humidity: weatherData.list[23].main.humidity,
                    windSpeed: weatherData.list[23].wind.speed,
                },
                //Weather data for four days out
                {
                    date: weatherData.list[31].dt_txt,
                    icon: weatherData.list[31].weather[0].icon,
                    temp: weatherData.list[31].main.temp,
                    humidity: weatherData.list[31].main.humidity,
                    windSpeed: weatherData.list[31].wind.speed,
                },
                //Weather data for five days out
                {
                    date: weatherData.list[39].dt_txt,
                    icon: weatherData.list[39].weather[0].icon,
                    temp: weatherData.list[39].main.temp,
                    humidity: weatherData.list[39].main.humidity,
                    windSpeed: weatherData.list[39].wind.speed,
                }
            ]
            //These select the proper element to place each set of data
            var cityPlacement = document.querySelector(".city-name");
            var datePlacement = document.querySelectorAll(".card-title");
            var iconPlacement = document.querySelectorAll(".icon");
            var tempPlacement = document.querySelectorAll(".temp");
            var windPlacement = document.querySelectorAll(".wind");
            var humidtyPlacement = document.querySelectorAll(".humidity");
            localStorage.setItem(cityName, JSON.stringify(weatherForecast));
            var cityWeatherData = JSON.parse(localStorage.getItem(cityName));
            cityPlacement.textContent = cityName
           console.log(cityWeatherData[0].icon)
            //This sets the date for each card
            for(var i = 0; i < datePlacement.length; i++) {
                datePlacement[i].textContent = cityWeatherData[i].date
            }
            //This sets the icon for each card
            for(var i = 0; i < iconPlacement.length; i++) {
                iconPlacement[i].setAttribute("src", "https://openweathermap.org/img/w/" + cityWeatherData[i].icon + ".png" )
            }
            //This sets the temp for each card
            for(var i = 0; i < tempPlacement.length; i++) {
                tempPlacement[i].textContent = "Temperature: " + cityWeatherData[i].temp + "°F"
            }
            //This sets the Wind Speed for each card
            for(var i = 0; i < windPlacement.length; i++) {
                windPlacement[i].textContent = "Wind Speed: " + cityWeatherData[i].windSpeed + " MPH"
            }
            //This sets the Huumidity for each card
            for(var i = 0; i < humidtyPlacement.length; i++) {
                humidtyPlacement[i].textContent = "Humidity: " + cityWeatherData[i].humidity + "%"
            }    
        })
        
}

searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    getCityWeather(searchBar.value.replaceAll(" ", "_"));
})

