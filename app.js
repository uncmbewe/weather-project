const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");
const { stringify } = require("querystring");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "ee4049c7e135642b3695227f399ed8dc";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;
  // getting weather data from api
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data); // converts data we get from weather api into readable JavaScript
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(temp, description);
      res.write("<p>The weather is currently " + description + "</p>");
      res.write(
        "<h1>The temperature in " +
          query +
          " is " +
          temp +
          " degrees Celcius</h1>"
      );
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
    /* const object = {
        name: "Nathan",
        favouriteFood: "Chicken",
      };
      console.log(JSON.stringify(object));
      */
  });
});

app.listen(3000, function (req, res) {
  console.log("Server is running on port 3000");
});
