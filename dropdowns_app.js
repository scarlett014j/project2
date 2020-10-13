let ingredientsSelectedMap = {};
let ingredientsToDrinkMap = {};
let drinksToIngredients = {};
let drinks = [];
let drinks2 = [];
let drinks3 = [];

let dropdown3 = new Set();

d3.csv("full_drinks_copy.csv").then(function(csvData) {
    csvData.forEach(function(data) {
        let ingredients = [];
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
                ingredients.push(data[`ingredient_${i}`]);
            }
        }
        drinksToIngredients[data.name.toLowerCase()] = ingredients;
    });
    
  

    
    d3.select("#ingredients1")
        .selectAll('option')
        .data(Object.keys(ingredientsSelectedMap))
        .enter()
        .append('option')
        .text(ingr => ingr)
        .attr("value", ingr => ingr);
    d3.select("#ingredients3")
        .selectAll('option')
        .data(dropdown3.keys())
        .enter()
        .append('option')
        .text(ingr => ingr)
        .attr("value", ingr => ingr);
});

function onSelect(selectedItem) {
    let dropdown = new Set();
    drinks = ingredientsToDrinkMap[selectedItem.value];
    var i;
    for(i = 0; i < drinks.length; i++) {
        var j;
        for(j = 0; j < drinksToIngredients[drinks[i].toLowerCase()].length; j++) {
            dropdown.add(drinksToIngredients[drinks[i].toLowerCase()][j].toLowerCase());
        }
    }
    d3.select("#ingredients2")
        .selectAll('option')
        .remove()
    d3.select("#ingredients2")
        .selectAll('option')
        .data(Array.from(dropdown))
        .enter()
        .append('option')
        .text(ingr => ingr)
        .attr("value", ingr => ingr);

    d3.selectAll('li').remove()
    d3.select("#drinks")
        .selectAll('li')
        .data(drinks)
        .enter()
        .append('li')
        .text(drink => drink)
}

function onSelect2(selectedItem) {
    drinks2 = drinks.filter(value => ingredientsToDrinkMap[selectedItem.value].includes(value))

    let dropdown = new Set();
    var i;
    for(i = 0; i < drinks2.length; i++) {
        var j;
        for(j = 0; j < drinksToIngredients[drinks2[i].toLowerCase()].length; j++) {
            dropdown.add(drinksToIngredients[drinks2[i].toLowerCase()][j].toLowerCase());
        }
    }
    d3.select("#ingredients3")
        .selectAll('option')
        .remove()
    d3.select("#ingredients3")
        .selectAll('option')
        .data(Array.from(dropdown))
        .enter()
        .append('option')
        .text(ingr => ingr)
        .attr("value", ingr => ingr);

    d3.selectAll('li').remove()
    d3.select("#drinks")
        .selectAll('li')
        .data(drinks2)
        .enter()
        .append('li')
        .text(drink => drink)
}

function onSelect3(selectedItem) {
    drinks3 = drinks2.filter(value => ingredientsToDrinkMap[selectedItem.value].includes(value))
    d3.selectAll('li').remove()
    d3.select("#drinks")
        .selectAll('li')
        .data(drinks3)
        .enter()
        .append('li')
        .text(drink => drink)
}