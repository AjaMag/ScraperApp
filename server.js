//All dependencies to log, render, and fetch data, etc..
const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const logger = require('morgan')
const mongoose = require('mongoose')

var app = express()

// Require all models
// var db = require("./models");

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// const db = mongo('reddit')
// db.post.insert(
//     {entry: i+1, header: $(elem.html)}, () => {

// })

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);
