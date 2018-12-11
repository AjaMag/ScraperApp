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
        db.Article.create(result)
        .then(function(dbArticle) {
            console.log(`article scraped: ${dbArticle}`)
            })
            .catch((e) => {console.log(`error when trying to save to db: ${e}`) 
              })
          })
        })  
    }) 
    
}

//save article
// app.post('/article/:id', (req, res)=>{
//     let id = req.params.id;

//     db.Article.findByIdAndUpdate(id, {$set: {saved: true}})
//     .then((dbArticle)=>{
//         res.json(dbArticle);
//     })
//     .catch((err)=>{
//         res.json(err);
//     });
// });
// // show articles after scraping
// app.get('/articles', (req, res)=> {
//     db.Article.find({})
//     .then((dbArticle)=>{
//         let articleObj = {article: dbArticle};

//         // render page with articles found
//         res.render('index', articleObj);
//     })
//     .catch((e)=>{
//         res.json(e);
//    });
//     });
// })
// }

