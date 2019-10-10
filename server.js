var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
const exphbs = require("express-handlebars");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

app.engine('handlebars', exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/news_db";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB Connected!'))
  .catch(err => {
    console.log("DB Connection Error:", err.message);
  });

// Routes

app.get("/", function (req, res) {

  db.articles.find({"faved":false}).limit(10).exec(function(err, data){
    if (err) throw err;
    
    res.render("index", { articles: data });
  })
})


app.get("/api/articles", function (req, res) {

  db.articles.find({}, function (err, data) {
    // Log any errors if the server encounters one
    if (err) {
      console.log(err);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(data);
    }
  });
});


app.get("/favorites", function (req, res) {

  db.articles.find( {"faved": true} ).then(function (err, data) {

    res.render("faved", { articles: data });

    if(err) throw err;
  })
});


// A GET route for scraping the Game Informer website
app.get("/scrape", function (req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://gameinformer.com/").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab everything with the .article class, and do the following:
    $(".article-title").each(function (i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      // Create a new Article using the `result` object built from scraping
      db.articles.create(result)
        .then(function (dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function (err) {
          // If an error occurred, log it
          console.log(err);
        });
    });
    // Send a message to the client
    res.send("Scrape Complete");
  });
});

app.post("/articles/save/:id", function(req,res){
	db.articles.findOneAndUpdate({ "_id": req.params.id}, {"faved": true})
	.exec(function(err, doc){
		if(err){
			console.log(err);
		}
		else{
			res.send(doc);
		}
	});
});

app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});


