let ingredientsToDrinkMap = {};
let drinksToIngredients = {};
let drinks = [];
let drinks2 = [];
let drinks3 = [];
let selectedItem1 = "";
let selectedItem2 = "";
let selectedItem3 = "";


let dropdown3 = new Set();

d3.csv("full_drinks_copy.csv").then(function(csvData) {
    csvData.forEach(function(data) {
        let ingredients = [];
        var i;
        for(i = 1; i <= 15; i++) {
            if (data[`ingredient_${i}`]) {
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
        .data(["Select an ingredient", ...Object.keys(ingredientsToDrinkMap).sort()])
        .enter()
        .append('option')
        .text(ingr => ingr)
        .attr("value", ingr => ingr);
});
function onSelect(selectedItem) {
    selectedItem1 = selectedItem.value;
    let dropdown = new Set();
    drinks = ingredientsToDrinkMap[selectedItem.value];
    var i;
    for(i = 0; i < drinks.length; i++) {
        var j;
        for(j = 0; j < drinksToIngredients[drinks[i].toLowerCase()].length; j++) {
            dropdown.add(drinksToIngredients[drinks[i].toLowerCase()][j].toLowerCase());
        }
    }
    dropdown.delete(selectedItem1)
    dropdown.delete(selectedItem3)
    d3.select("#ingredients2")
        .selectAll('option')
        .remove()
    d3.select("#ingredients2")
        .selectAll('option')
        .data(["Select an ingredient", ...Array.from(dropdown).sort()])
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
        .insert("a")
        .attr('href', drink => `/drink.html?drink=${encodeURIComponent(drink)}`)
        .attr('target', "_blank")
        .text(drink => drink)
}
function onSelect2(selectedItem) {
    selectedItem2 = selectedItem.value;
    drinks2 = drinks.filter(value => {
        const drink = ingredientsToDrinkMap[selectedItem.value];
        return drink == null ? [] : drink.includes(value);
    });

    let dropdown = new Set();
    var i;
    for(i = 0; i < drinks2.length; i++) {
        var j;
        for(j = 0; j < drinksToIngredients[drinks2[i].toLowerCase()].length; j++) {
            dropdown.add(drinksToIngredients[drinks2[i].toLowerCase()][j].toLowerCase());
        }
    }
    dropdown.delete(selectedItem1)
    dropdown.delete(selectedItem2)
    d3.select("#ingredients3")
        .selectAll('option')
        .remove()
    d3.select("#ingredients3")
        .selectAll('option')
        .data(["Select an ingredient", ...Array.from(dropdown).sort()])
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
        .insert("a")
        .attr('href', drink => `/drink.html?drink=${encodeURIComponent(drink)}`)
        .attr('target', "_blank")
        .text(drink => drink);
}
function onSelect3(selectedItem) {
    selectedItem3 = selectedItem.value;
    drinks3 = drinks2.filter(value => {
        const drink = ingredientsToDrinkMap[selectedItem.value];
        return drink == null ? [] : drink.includes(value);
    });
    d3.selectAll('li').remove()
    d3.select("#drinks")
        .selectAll('li')
        .data(drinks3)
        .enter()
        .append('li')
        .insert("a")
        .attr('href', drink => `/drink.html?drink=${encodeURIComponent(drink)}`)
        .attr('target', "_blank")
        .text(drink => drink);
}

function resetSelections() { 
    document.getElementById("ingredients1").innerHTML = 
        null; 
    document.getElementById("ingredients2").innerHTML = 
        null; 
    document.getElementById("ingredients3").innerHTML = 
        null; 
    document.getElementById("drinks").innerHTML = 
        null; 

    d3.select("#ingredients1")
        .selectAll('option')
        .data(["Select an ingredient", ...Object.keys(ingredientsToDrinkMap).sort()])
        .enter()
        .append('option')
        .text(ingr => ingr)
        .attr("value", ingr => ingr);
    
    selectedItem1 = "";
    selectedItem2 = "";
    selectedItem3 = "";
}

