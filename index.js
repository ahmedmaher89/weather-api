const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const API_KEY = process.env.API_KEY;
const port = 3033;

app.get("/", function (req, res) {
  const address = req.query.address;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=${API_KEY}`;

  axios
    .get(url)
    .then((response) => {
      const data = response.data;
      const cityName = data.name;
      const temperature = data.main.temp;
      const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
      const message = `City Name: ${cityName} <hr/> Temperature: ${temperature}&deg;C<br> Sunset Time:${sunsetTime}`;

      res.send(
        `<html><body><div id='contianer><h1>${message}</h1></div></body></html>`
      );
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occured");
    });
});

app.listen(port, function () {
  console.log(`server is running on port ${port}`);
});
