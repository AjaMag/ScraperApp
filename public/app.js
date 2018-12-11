

// Grab the articles as a json
const scrapeArticles = () => {
    console.log("ping")
    $.getJSON('/scrape')
    .then((data)=> {
    console.log(data)  
    })
  };
scrapeArticles()

const postArticles = () => {
    $.getJSON('/articles')
    .then((data)=> {
    console.log(data)  
    })
  };

postArticles()














   // Display the apropos information on the page
   //$("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");