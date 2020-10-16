d3.json("fake.json").then(function(data) {
    console.log(data);
    });








// d3.json("full_drinks.json").then(function(csvData) {
//     csvData.forEach(function(data) {
//         var i;
//         for(i = 1; i <= 15; i++) {
//             if (data[`ingredient_${i}`]) {
//                 ingredientsSelectedMap[data[`ingredient_${i}`].toLowerCase()] = false;
//                 if (data[`ingredient_${i}`].toLowerCase() in ingredientsToDrinkMap) {
//                     var drinkList = ingredientsToDrinkMap[data[`ingredient_${i}`].toLowerCase()];
//                     ingredientsToDrinkMap[data[`ingredient_${i}`].toLowerCase()] = [...drinkList, data.name];
//                 } else {
//                     ingredientsToDrinkMap[data[`ingredient_${i}`].toLowerCase()] = [data.name];
//                 }
//             }
//         }
//      });