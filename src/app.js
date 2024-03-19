const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

const path=require("path");
const publicDirectory=path.join(__dirname,'../public');
app.use(express.static(publicDirectory));

app.set('view engine','hbs');
const viewsDirectory=path.join(__dirname,'../Temp1/views');
app.set("views",viewsDirectory);

var hbs=require("hbs");
const partialsPath=path.join(__dirname,'../Temp1/partials');
hbs.registerPartials(partialsPath);

app.get('/',(req,res)=>{
  res.render('index',{
    title:"Home",
    desc:"This is home page"
  })
})

app.get("/service", (req, res) => {
  res.render("service", {
    title: "SERVICE",
    name: "Mohamed",
    city: "Tanta",
    age: 20,
  });
});

app.get("/team", (req, res) => {
  res.render("team", {
    title: "TEAM",
    name: "Mohamed",
    city: "Tanta",
    age: 20,
  });
});


const geocode = require("./tools/geocode");
const forecast = require("./tools/forecastFile");


app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "Enter Right Location!",
    });
  }
  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        location: req.query.address,
        forecast: forecastData,
        latitude:data.latitude,
        longitude:data.longitude
      });
    });
  });
});

app.get("*", (req, res) => {
  res.send(`404 page not found`);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
