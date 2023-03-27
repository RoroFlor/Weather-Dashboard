var weatherBase = "https://api.openweathermap.org/data/2.5/"
var apiKey = '9d43e04bc13323ad8e1c9572b90948ce'
var searchBtn = document.getElementById('searchBtn')
var citySearchInput = document.querySelector('.citySearchInput')
var tempWindHumidity = document.getElementById('tempWindHumidity')

function getApi() {

    var city = citySearchInput.value.trim()

    if (city === "") {
        return;
    }

    var apiUrl = weatherBase + 'weather?' + 'q=' + city + "&units=imperial&appid=" + apiKey
    var cityNameDate = document.getElementById('cityNameDate')
    var cityNameDatelEl = document.createElement('h2')
    var today = dayjs()
    cityNameDatelEl.textContent = `${city} ${today.format('M/DD/YYYY')}`;
    cityNameDate.append(cityNameDatelEl)

    fetch(apiUrl)
        .then(function (reponse) {
            return reponse.json()
        })
        .then(function (data) {
            console.log(data)

            // variable for temp
            var temp = document.createElement('li')
            temp.textContent = `Temp: ${data.main.temp} \u00B0F`
            tempWindHumidity.append(temp)

            // variable for humidity
            var humidity = document.createElement('li')
            humidity.textContent = `Humidity: ${data.main.humidity}%`
            tempWindHumidity.append(humidity)

            // variable for wind
            var wind = document.createElement('li')
            wind.textContent = `Wind: ${data.wind.speed} MPH`
            tempWindHumidity.append(wind)
            futureForecast()
        });

    function futureForecast() {
        var fCast = weatherBase + 'forecast?' + 'q=' + city + "&units=imperial&appid=" + apiKey
        
        fetch(fCast)
        .then(function (reponse){
            return reponse.json()
        })
        .then(function (data){
            console.log(data)
        })

    }
}





searchBtn.addEventListener('click', getApi)
