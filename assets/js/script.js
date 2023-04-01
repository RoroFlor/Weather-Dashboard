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
        var tempArray = []
        // var humidityArray = []
        // var windArray = []
        var week = document.getElementById('week')

        fetch(fCast)
            .then(function (reponse) {
                return reponse.json()
            })
            .then(function (data) {
                console.log(data)

                // var ftemp = data.list[0].main.temp
                // var ftempEl = document.createElement('li')
                // console.log(ftemp)


                for (var i = 0; i < data.list.length; i += 8) {
                    console.log(data.list[i])
                    var dataList = data.list[i]
                    var divContainer = document.createElement('div')
                    divContainer.className = 'container'
                    var htmlBlock = `
              <h5>${(dataList.dt_txt).split(' ')[0]}</h5>
                <img src="https://openweathermap.org/img/wn/${dataList.weather[0].icon}@2x.png" alt="">
                <p>Temp:${dataList.main.temp}</p>
                <p>wind:${dataList.wind.speed}</p>
                <p>Humidity:${dataList.main.humidity}</p>
              `
                    divContainer.innerHTML = htmlBlock
                    week.appendChild(divContainer)
                    //   tempArray.push(tempArray)
                    //   console.log(`temp array holds ${tempArray}`)
                }
                console.log(tempArray)
            });

    }
}

function displayCities(){
    const historyContainer = document.querySelector('.displayCities')
    historyContainer.textContent = ''
    
    for(var i = 0; i < cities.length; i++){
        const cityBtn = document.createElement('button')
        cityBtn.textContent = cities[i]
        historyContainer.appendChild(cityBtn)
    }
}



searchBtn.addEventListener('click', function () {
    var city = citySearchInput.value.trim()

    cities.push(city)
    localStorage.setItem('cities', JSON.stringify(cities))
    
    displayCities()

    getApi(city)
    
}) 

displayCities()
