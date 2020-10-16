const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const drink = urlParams.get('drink');
let drinksToInstructions = {};
let drinksToImage = {};

d3.csv("full_drinks_copy.csv").then(function(csvData) {
    csvData.forEach(function(data) {
        drinksToInstructions[data.name] = data.instructions;
        drinksToImage[data.name] = data.image_url;
    });
    // console.log(drink)
    // console.log(drinksToInstructions[drink])
    d3.select("#body")
        .insert("p")
        .text(drinksToInstructions[drink]);

     d3.select("#body")
        .insert("img")
        .attr("src", drinksToImage[drink]);

});
