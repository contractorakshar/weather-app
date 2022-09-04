const request = require('request');
const weatherData = require('../json/weather.json');
const getWeatherData = (lat, long, callback) => {

    // const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATERH_STACK_API_KEY}&query=${lat},${long}&units=f`
    // request({ url, json: true }, (error, { body }) => {
    //     if (error) {
    //         callback("Unable to connect weather service!", undefined);
    //         console.log("Unable to connect weather service!")
    //     }
    //     else if (body.error) {
    //         callback("Unable to find location!", undefined);
    //     }
    //     else {
    //         callback(undefined, body.current);
    //     }
    // });
    callback(undefined, weatherData.current.weather_descriptions[0] + ". It is currently " + weatherData.current.temperature + " degrees Celsius out. It feels like " + weatherData.current.feelslike + " degrees Celsius out.");
}
module.exports = getWeatherData;
