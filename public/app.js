document.getElementById("scrapeButton").addEventListener("click", function () {

    axios.get("/scrape").then((response) => {

        console.log("Scrape Complete");
        window.location = "/";

    }).catch((e) => {
        console("errrooorrrrr", e)
    })
});


document.getElementById("clearButton").addEventListener("click", () => {

    axios.delete("/delete").then((response) => {

        console.log("Cleared");
        window.location = "/";

    }).catch((e) => {
        console.log("errrooorrrrr", e)
    })
});


const favButtons = document.getElementsByClassName("favButton");
for (let i = 0; i < favButtons.length; i++) {

    favButtons[i].addEventListener("click", function () {
        const articleId = this.dataset.id;
        console.log(this, articleId);

        axios.put("/articles/favorite/" + articleId).then((response) => {

        }).catch((e) => {
            console.log("errroooorrrr", e)
        })
    })
}

const deletefavButtons = document.getElementsByClassName("deleteFavButton");
for (let i = 0; i < deletefavButtons.length; i++) {

    deletefavButtons[i].addEventListener("click", function () {
        const articleId = this.dataset.id;

        axios.put("/articles/delete/" + articleId).then((response) => {

        }).catch((e) => {
            console.log("errroooorrrr", e)
        })
    })
}





