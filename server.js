//All dependencies to log, render, and fetch data, etc..
const express = require("express");
const logger = require("morgan");
const bodyparser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
var app = express();
mongoose.set('useCreateIndex', true)
require('./routes/routes')(app)

// Require all models
var db = require("./models");
// Connect to the Mongo DB
mongoose.connect(
    "mongodb://localhost/test",
    { useNewUrlParser: true }
  );

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static(path.join(__dirname, "public")));



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
