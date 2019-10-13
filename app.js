const credentials = require("./credentials.js")

const request = require("request")

const getWeather = function(center, callback){
  const url = "https://api.darksky.net/forecast/" + credentials.DARK_SKY_SECRET_KEY + "/"
              +center[1] + "," + center[0] + "?lang=es&units=si"

  request({url, json: true}, function(error, response){
    if(error){
      callback(error, undefined)
    }
    else if(response.body["error"]){
      callback(response.body["error"], undefined)
    }
    else{
        const data = response.body["currently"]
        const msg = data.summary + ". La temperatura actual es: " + String(data.temperature) +
                    " grados Celcius. Existe " + String(data.precipProbability) + "% de probabilidad de lluvia." +
                    "\n"+ " Información adicional:" + "\n Sensación de temperatura: " + String(data.apparentTemperature)
                              + " grados Celcius.\n Humedad: " + String(data.humidity * 100) + "%"
                              + "\n Indice UV: " + String(data.uvIndex)
        callback(error, msg)
    }


  })
}

const getCoordinates = function(city, callback){
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + city +
              ".json?access_token=" + credentials.MAPBOX_TOKEN
  request({url, json: true}, function(error,response){
    if(error){
      callback(error, undefined)
    }
    else if(response.body.message){
      callback(response.body.message, undefined)
    }
    else if(!response.body["features"][0]){
      callback("city not found", undefined)
    }
    else{
      const data = response.body
      const center = data["features"][0]["center"]
      callback(undefined, center)
    }
  })
}

getCoordinates("Tabasco", function(error, center){
  if(error){
    console.log(error)
  }
  else{
    getWeather(center, function(error2, output){
      if(error2){
        console.log(error2)
      }
      else{
        console.log(output)
      }
    })
  }
})
