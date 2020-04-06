const request = require("request");

const geoCode = (address, callback) => {
  const geoUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiaGVsbG9tYW5pc2giLCJhIjoiY2s4bHM2MDlkMGEyNTNlb2tpazJpajVycSJ9.y4KV5jfXSxtw3SkKlyUrng";
  request({ url: geoUrl, json: true, strictSSL: false }, (error, { body }) => {
    if (error) {
      callback("unable to contact service", undefined);
    } else if (body.features.length == 0) {
      callback("wrong request", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geoCode;
