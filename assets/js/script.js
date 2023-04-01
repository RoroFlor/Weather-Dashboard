var weatherBase = "https://api.openweathermap.org/data/2.5/"
var apiKey = '9d43e04bc13323ad8e1c9572b90948ce'
var searchBtn = document.getElementById('searchBtn')
var citySearchInput = document.querySelector('.citySearchInput')
var tempWindHumidity = document.getElementById('tempWindHumidity')
var cities = JSON.parse(localStorage.getItem('cities')) || []

function getApi(city) {

    if (city === "") {
        return;
    }

    var apiUrl = weatherBase + 'weather?' + 'q=' + city + "&units=imperial&appid=" + apiKey
    var cityNameDate = document.getElementById('cityNameDate')
    cityNameDate.innerHTML = "";

    var cityNameDatelEl = document.createElement('h2')
    var today = dayjs()
    cityNameDatelEl.textContent = `${city} ${today.format('M/DD/YYYY')}`;
    cityNameDate.append(cityNameDatelEl)

    tempWindHumidity.innerHTML = "";
    week.innerHTML = "";
    fetch(apiUrl)
        .then(function (reponse) {
            return reponse.json()
        })
        .then(function (data) {
            console.log(data)

            var temp = document.createElement('li')
            temp.textContent = `Temp: ${data.main.temp} \u00B0F`
            tempWindHumidity.append(temp)

            var humidity = document.createElement('li')
            humidity.textContent = `Humidity: ${data.main.humidity}%`
            tempWindHumidity.append(humidity)

            var wind = document.createElement('li')
            wind.textContent = `Wind: ${data.wind.speed} MPH`
            tempWindHumidity.append(wind)
            futureForecast()
        });

    function futureForecast() {
        var fCast = weatherBase + 'forecast?' + 'q=' + city + "&units=imperial&appid=" + apiKey
        var tempArray = []

        var week = document.getElementById('week')

        fetch(fCast)
            .then(function (reponse) {
                return reponse.json()
            })
            .then(function (data) {
                console.log(data)


                for (var i = 0; i < data.list.length; i += 8) {
                    console.log(data.list[i])
                    var dataList = data.list[i]
                    var divContainer = document.createElement('div')
                    divContainer.className = 'container'
                    var htmlBlock = `
              <h5>${(dataList.dt_txt).split(' ')[0]}</h5>
                <img src="https://openweathermap.org/img/wn/${dataList.weather[0].icon}.png" alt="">
                <p>Temp:${dataList.main.temp}</p>
                <p>wind:${dataList.wind.speed}</p>
                <p>Humidity:${dataList.main.humidity}</p>
              `
                    divContainer.innerHTML = htmlBlock
                    week.appendChild(divContainer)
                }
                console.log(tempArray)
            });

    }
}


function clearWeather() {
    tempWindHumidity.innerHTML = "";
    week.innerHTML = "";
    cityNameDate.innerHTML = "";
}

function displayCities() {
    const historyContainer = document.querySelector(".displayCities");
    historyContainer.textContent = "";

    const startIndex = Math.max(0, cities.length - 8);
    const endIndex = cities.length;

    for (var i = startIndex; i < endIndex; i++) {
        const cityBtn = document.createElement("button");
        cityBtn.textContent = cities[i];
        historyContainer.appendChild(cityBtn);

        const city = cities[i];
        cityBtn.addEventListener("click", function () {
            return function () {
                clearWeather();
                getApi(city);
            };
        }());
    }
}

displayCities();



searchBtn.addEventListener('click', function () {
    var city = citySearchInput.value.trim()

    cities.push(city)
    localStorage.setItem('cities', JSON.stringify(cities))

    displayCities()

    getApi(city)

})

displayCities()

