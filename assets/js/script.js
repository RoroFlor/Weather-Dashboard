var weatherBase = "https://api.openweathermap.org/data/2.5/forecast?"
var apiKey = '9d43e04bc13323ad8e1c9572b90948ce'
var searchBtn = document.getElementById('searchBtn')
var citySearchInput = document.querySelector('.citySearchInput')
// var cityName = document.getElementById('cityName')

function getApi() {
    var city = citySearchInput.value.trim()
    if(city === "") {
        return;
    }

    var apiUrl = weatherBase + 'q=' + city + "&units=imperial&appid=" + apiKey
    fetch(apiUrl)
        .then(function (reponse) {
            return reponse.json()
        })
        .then(function (data) {
            console.log(data)
            

        });
}

searchBtn.addEventListener('click', getApi)
