//All dependencies to log, render, and fetch data, etc..
const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyparser = require('body-parser')
const path = require('path')

const app = express();

// Require all models
// var db = require("./models");

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

//routes

axios
  .get("http://reddit.com/")
  .then(r => {
    const $ = cheerio.load(r.data);
    const headers = $(".imors3-0.iuScIP").each((i, elem) => console.log($(elem).text()))
  })
  .catch(e => console.log(e));

// Headline - the title of the article
// Summary - a short summary of the article
// URL - the url to the original article
// Feel free to add more content to your database (photos, bylines, and so on).

// const db = mongo('reddit')
// db.post.insert(
//     {entry: i+1, header: $(elem.html)}, () => {

// })

// Connect to the Mongo DB
mongoose.connect(
  "mongodb://localhost/mongoHeadlines",
  { useNewUrlParser: true }
);
