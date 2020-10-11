let ingredientsSelectedMap = {};
let ingredientsToDrinkMap = {};

d3.csv("full_drinks_copy.csv").then(function(csvData) {
    csvData.forEach(function(data) {
        var i;
        for(i = 1; i <= 15; i++) {
            if (data[`ingredient_${i}`]) {
                ingredientsSelectedMap[data[`ingredient_${i}`].toLowerCase()] = false;
                if (data[`ingredient_${i}`].toLowerCase() in ingredientsToDrinkMap) {
                    var drinkList = ingredientsToDrinkMap[data[`ingredient_${i}`].toLowerCase()];
                    ingredientsToDrinkMap[data[`ingredient_${i}`].toLowerCase()] = [...drinkList, data.name];
                } else {
                    ingredientsToDrinkMap[data[`ingredient_${i}`].toLowerCase()] = [data.name];
                }
            }
        }
    });
    var svg = d3.select("#ingredients1")
        .selectAll('option')
        .data(Object.keys(ingredientsSelectedMap))
        .enter()
        .append('option')
        .text(ingr => ingr)
        .attr("value", ingr => ingr);
});

function onSelect(selectedItem) {
    d3.selectAll('li').remove()
    d3.select("#drinks")
        .selectAll('li')
        .data(ingredientsToDrinkMap[selectedItem.value])
        .enter()
        .append('li')
        .text(drink => drink)
}