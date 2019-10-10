
document.getElementById("scrapeButton").addEventListener("click", ()=> {
    axios.get("/scrape").then((response)=> {
        console.log("Scrape Complete");
        window.location = "/"
    })
})