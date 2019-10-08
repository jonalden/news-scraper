const axios = require('axios');

axios.get("/articles").then(function(response) {
    console.log(response);
    for ( let i = 0; i < response.length; i++) {
        document.getElementById("title").append(response[i].data)
    }

})