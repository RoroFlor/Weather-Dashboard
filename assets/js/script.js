var weatherBase = "api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={9d43e04bc13323ad8e1c9572b90948ce}"

fetch(weatherBase)
.then(function(reponse){
    return reponse.json()
})
.then(function(data){
    console.log(data)
});