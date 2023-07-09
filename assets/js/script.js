var searchBtn = document.querySelector(".btn");
var searchBar = document.querySelector(".search");

//This function fetches the city data
function getCityWeather(location) {
    var locationArray = location.split(",")
    var city = locationArray[0]
    var state = locationArray[1]
    var geocodingURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + "&appid=6debcc5035bdc6a46835d5821d6f4874"
    //
    fetch(geocodingURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(cityInfo) {
            var lat = cityInfo[0].lat;
            var lon = cityInfo[0].lon;
            

        })
}

searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    getCityWeather(searchBar.value.replaceAll(" ", "_"));
})

