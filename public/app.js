

// Grab the articles as a json
const scrapeArticles = () => {
    $.getJSON('/scrape')
    .then((data)=> {
    console.log(data)  
    })
  };
scrapeArticles()

const postArticles = () => {
    $.getJSON('/articles', function(data){
        for ( var i =0; i < data.length; i++) {
            $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>")
        }
    })
}
//Adding an onlcick listener
//$(document).on("click", "p", function() {



postArticles()














   // Display the apropos information on the page
   //$("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");