const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;  
const path = require("path");
const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
console.log(__dirname)

// app.set("public", "./public");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
// app.use('/utils',express.static(publicDirectoryPath));


app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/", (req, res) => {
  const address = req.body.location;
  geocode(address, (error, data) => {
    if (error) {
      return console.log(error);
    }

    forecast(data.longtitude, data.latitude, (error, forecastdata) => {
      if (error) {
        return console.log(error);
      }

      console.log(data.location);
      console.log("data", forecastdata);
      res.render("logic.ejs", {
        address: address,
        forecastdata: forecastdata,
        data: data.location,
      });
    });
  });
});

app.listen(port, () => {
  console.log("port started");
});
