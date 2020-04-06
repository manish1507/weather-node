const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 8080;

//setting the path
const htmlPathDirec = path.join(__dirname, "../public");
const viewTemplates = path.join(__dirname, "../templates/views");
const partialPaths = path.join(__dirname, "../templates/partials");

app.use(express.static(htmlPathDirec));

// app.get("/about", (request, response) => {
//   response.send("<h1>Hi, This is about our company!</h1>");
// });
app.set("views", viewTemplates);
app.set("view engine", "hbs");
hbs.registerPartials(partialPaths);
app.get("", (request, response) => {
  response.render("index", {
    title: "Welcome to weather App",
    body: "Current forecast",
    name: "Andhra Samithi"
  });
});

app.get("/about", (request, response) => {
  response.render("about", {
    title: "About the creator11",
    Author: "manish",
    name: "Andhra Samithi"
  });
});

app.get("/help", (request, response) => {
  response.render("help", {
    title: "Help",
    contact: "manish",
    name: "Andhra Samithi"
  });
});

app.get("/weather", (request, response) => {
  if (!request.query.address) {
    return response.send({
      error: "Address is required to get forcast"
    });
  }
  geocode(
    request.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return response.send({ error });
      }
      //  console.log("location: ");
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return response.send({ error });
        }
        response.send({
          latitude,
          longitude,
          location,
          temperature: forecastData.temperature,
          address: request.query.address
        });
      });
    }
  );
});

app.get("/help/*", (request, response) => {
  response.render("404", {
    title: "404 Found",
    name: "Andhra Samithi",
    errorMessage: "Page Not Found for help, Its under progress"
  });
});

app.get("*", (request, response) => {
  response.render("404", {
    title: "404 Found",
    name: "Andhra Samithi",
    errorMessage: "Page Not Found"
  });
});

app.listen(port, () => {
  console.log("App started");
});
