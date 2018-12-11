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
      
            console.log(title)
            console.log(link)
      
          //   create new Article in db
          db.Article.create(result)
            .then((dbArticle) => {
                console.log(`\narticle scraped: ${dbArticle}`)
            })
            .catch((e) => {console.log(`\nerror when trying to save to db: ${e}`) 
              })
          })
          res.redirect('/articles');
        })
        .catch(e => console.log(e));
        })
// show articles after scraping
app.get('/articles', (req, res)=>{
    db.Article.find({})
    .sort({timestamp: -1})
    .then((dbArticle)=>{
        let articleObj = {article: dbArticle};

        // render page with articles found
        res.render('index', articleObj);
    })
    .catch((err)=>{
        res.json(err);
    });
});


}

