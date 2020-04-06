const request = require("request");

const forecast = (lattitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=ed8e0788d91cc08a961b6e604bb03669&query=" +
    lattitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to contact service", undefined);
    } else if (body.error) {
      callback(body.error.type, undefined);
    } else {
      callback(undefined, {
        temperature: body.current.temperature,
        rain: body.current.precip
      });
    }
  });
};

module.exports = forecast;
