const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const drink = urlParams.get('drink');
let drinksToInstructions = {};
let drinksToImage = {};
let drinksToIngredientsAndMeasurement = {};

d3.csv("full_drinks_copy.csv").then(function(csvData) {
    csvData.forEach(function(data) {
        drinksToInstructions[data.name] = data.instructions;
        drinksToImage[data.name] = data.image_url;
        let ingredientsAndMeasurement = [];
        var i;
        for(i = 1; i <= 15; i++) {
            if (data[`ingredient_${i}`]) {
                ingredientsAndMeasurement.push({
                    ingredient: data[`ingredient_${i}`],
                    measurement: data[`measurement_${i}`]
                });
            }
        }
        drinksToIngredientsAndMeasurement[data.name] = ingredientsAndMeasurement;
    });

    d3.select("#ingredients")
        .selectAll('li')
        .data(drinksToIngredientsAndMeasurement[drink])
        .enter()
        .append('li')
        .text(item => `${item.ingredient} - ${item.measurement}`)

    d3.select("#body")
        .insert("p")
        .text(drinksToInstructions[drink]);

    d3.select("#body")
        .insert("img")
        .attr("src", drinksToImage[drink]);

});
