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
            console.log(weatherUrl)
            return fetch(weatherUrl)
                .then (function(response){
                return response.json();
            })
        }).then(function(weatherData) {
            var cityName = weatherData.city.name
            var date = weatherData.list[0].dt_txt
            var weatherIcon = weatherData.list[0].weather[0].icon
            var temperature = weatherData.list[0].main.temp
            var humidity = weatherData.list[0].main.humidity
            var windSpead = weatherData.list[0].wind.speed
            
            

            console.log(weatherData.list)
        })
        
}

searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    getCityWeather(searchBar.value.replaceAll(" ", "_"));
})

