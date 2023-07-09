var searchBtn = document.querySelector(".btn");
var searchBar = document.querySelector(".search");

//This function fetches the city data
function getCityWeather(location) {
    var geocodingURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + location + "&appid=6debcc5035bdc6a46835d5821d6f4874"
    //
    fetch(geocodingURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(cityInfo) {
            console.log(cityInfo);
        })
}

searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    getCityWeather(searchBar.value.replace(" ", "_"));
})

