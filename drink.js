const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const drink = urlParams.get('drink');
let drinksToInstructions = {};

d3.csv("full_drinks_copy.csv").then(function(csvData) {
    csvData.forEach(function(data) {
        drinksToInstructions[data.name] = data.instructions;
    });

    console.log(drink)
    console.log(drinksToInstructions[drink])
    d3.select("#body")
        .insert("p", ":first-child")
        .text(drinksToInstructions[drink]);
});
