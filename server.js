//All dependencies to log, render, and fetch data, etc..
const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyparser = require('body-parser')
const path = require('path')

const app = express();

// Connect to the Mongo DB
mongoose.connect(
    "mongodb://localhost/test",
    { useNewUrlParser: true }
  );

// Require all models
// var db = require("./models");

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static(path.join(__dirname, "public")));

//scrape the articles
axios
.get("http://reddit.com/")
.then(r => {
  const $ = cheerio.load(r.data);
  const header = $(".SQnoC3ObvgnGjWt90zD9Z").each((i, elem) => {
    console.log(`Title: ${$(elem).text()}`)
    console.log(`Link: ${$(elem).attr('href')} \n`)
  })
})
.catch(e => console.log(e));

// // Route for getting all Articles from the db
// app.get("/articles", function(req, res) {
//   // Grab every document in the Articles collection
//   db.Article.find({})
//     .then(function(dbArticle) {
//       // If we were able to successfully find Articles, send them back to the client
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// });  
// Headline - the title of the article
// Summary - a short summary of the article
// URL - the url to the original article
// Feel free to add more content to your database (photos, bylines, and so on).

// const db = mongo('reddit')
// db.post.insert(
//     {entry: i+1, header: $(elem.html)}, () => {

// })

const PORT = process.env.PORT || 5000
app.listen(PORT, _ => console.log(`http://localhost:${PORT}`))
