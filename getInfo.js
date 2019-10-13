const credentials = require("./credentials.js")

const request = require("request")

const getWeather = function(latitude, longitude){
  const url = "https://api.darksky.net/forecast/" + credentials.DARK_SKY_SECRET_KEY + "/"
              +latitude + "," + longitude + "?lang=es&units=si"

  request({url, json: true}, function(error, response){
    if(!error){
      const data = response.body["currently"]
      const msg = data.summary + ". La temperatura actual es: " + String(data.temperature) +
                  " grados Celcius. Existe " + String(data.precipProbability) + "% de probabilidad de lluvia."

      const additionalInfo = "\n"+ "Información adicional:" + "\n Sensación de temperatura: " + String(data.apparentTemperature)
                            + " grados Celcius.\n Humedad: " + String(data.humidity * 100) + "%"
                            + "\n Indice UV: " + String(data.uvIndex)


      console.log(msg)
      console.log(additionalInfo)
    }
  })
}

const getCoordinates = function(city){
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + city +
              ".json?access_token=" + credentials.MAPBOX_TOKEN
  request({url, json: true}, function(error,response){
    if(!error){
      const data = response.body
      center = data["features"][0]["center"]

      getWeather(center[1], center[0])
    }
  })
}

module.exports = {
  getWeather : getCoordinates
}
