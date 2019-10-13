const weather = require("./getInfo.js")

weather.getWeather("Tabasco")

weather.getWeather("Tabasco", function(error, data){
  if(error){
    console.log(error)
  }
  else{
    if(data.message){
      console.log(message)
    }
    else{
      console.log(data)
    }
  }
})
