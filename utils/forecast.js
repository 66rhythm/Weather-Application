const request=require('request');

const forecast= (latitude, longtitude,callback)=>{
    const url= 'http://api.weatherstack.com/current?access_key=9c38a936ed9403f4694692216ee049d1&query=' + longtitude + ','+ latitude +'&units=f';   
   
    request({url:url, json:true} , (error,response) => {
        if(error)
        {
            callback("unable to connect",undefined);
        }
        else if (response.body.current.temperature.length===0)
        {
            callback("unable to find",undefined);
        }
        else{
            callback(undefined, response.body.current.temperature + "°C" + "\n" +"," +  response.body.current.weather_descriptions );
            // }))
        }
    })
   
   }
module.exports = forecast; 