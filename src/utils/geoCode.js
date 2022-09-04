const request = require('request');

const getCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAP_BOX_TOKEN}&limit=1`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect map service!", undefined);
        }
        else if (body.features.length === 0) {
            callback("No matching coordinates found!", undefined);
        } else {
            let lat, long, place;
            lat = body.features[0].center[1];
            long = body.features[0].center[0];
            place = body.features[0].place_name;
            callback(undefined, { lat, long, place });
        }
    })
}
module.exports = getCode;