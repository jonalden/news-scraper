# Game Informer Mongo Scraper

https://game-informer-mongo-scraper.herokuapp.com

### Photos

#### Login Page

![articles](https://drive.google.com/uc?export=view&id=1xhfcKwUy__L9zwkNtgYA19WsWPyfCSWL)
---

### What is Game Informer Mongo Scraper?

This scraper is a tool to grab scrape data from another site using html tags or CSS selector. For this site I grabbed everything with an .article class and the href from their child <a>. All the stories and their links are rendered to the DOM in a nicely styled view.

### NPM Dependencies

- axios 0.19.0
- express 4.17.1
- express-handlebars 3.1.0
- cheerio
- mongoose


### Database

The database is a MongoDB database running on mLab. 

### Server

The server is an express server running in node.

### Rendering

Rendering is handled through a combination of express-handlebars and vanilla client-side Javascript.


### Organization

```
project
│   README.md
│   package.json
|   package-lock.json
|   LICENSE - this is our MIT license
│   server.js - this our express server
│   .gitignore
└───models
    |   index.js - allows the server to interact with the tables in our database
    |   articles.js - this is the mongo schema for all articles
    |   note.js - this is the mongo schema for all notes

└───public
    └───img - this folder contains logos and such
    |   app.js - this file handles the front end fetch requests and button handlers
    |   style.css - all of the styling for the app

└───views
    │   faved.handlebars - this contains the page for all of articles that were favorited
    │   index.handlebars - this contains the log in page  
    └───layouts
        |   main.handlebars - this is the main handlebars layout page


```

#### License

This application is under the MIT licence.

##### Developed by Jon Alden
