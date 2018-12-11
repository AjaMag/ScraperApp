const cheerio = require("cheerio");
const axios = require("axios");
const db = require('../models')

module.exports = (app) => {
//Scrape the articles and post to db
    app.get("/scrape", function(req, res) {
        axios
        .get("http://reddit.com/")
        .then(r => {
          const $ = cheerio.load(r.data);
          $(".SQnoC3ObvgnGjWt90zD9Z").each((i, elem) => {
            let result = {}  
            const title = (`Title: ${$(elem).text()}`)
            const link = (`Link: http://reddit.com/${$(elem).attr('href')} \n`)
            result.title = title
            result.link = link 
        
           
        //create new Article in db
        // db.Article.create(result)
        // .then(function(dbArticle) {
        //     console.log(`article scraped: ${dbArticle}`)
        //     })
        //     .catch((e) => {console.log(`error when trying to save to db: ${e}`) 
        //       })
          })
        })  
    }) 
    // Route to get all Articles from the db
    app.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
      db.Article.find({})
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
        console.log(dbArticle)
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
    });

    
}


