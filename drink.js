const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const drink = urlParams.get('drink');
let drinksToInstructions = {};
let drinksToImage = {};
let drinksToIngredientsAndMeasurement = {};
let drinksToGlass = {};

d3.csv("full_drinks_copy.csv").then(function(csvData) {
    csvData.forEach(function(data) {
        drinksToInstructions[data.name] = data.instructions;
        drinksToImage[data.name] = data.image_url;
        drinksToGlass[data.name] = data.glass;
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
        .text(drinksToGlass[drink]);

    d3.select("#body")
        .insert("p")
        .text(drinksToInstructions[drink]);

    d3.select("#body")
        .insert("img")
        .attr("src", drinksToImage[drink]);

    // our cocktail glass
    var glassPath = "m 60,350 c -4.74218,-0.7989 -7.33654,-2.5714 -7.33654,-5.0124 0,-2.4848 2.03654,-4.0776 5.21357,-4.0776 1.54746,0 3.59496,-0.4138 4.55,-0.9197 1.97894,-1.0481 9.10335,-3.4326 24.23643,-8.1118 5.775,-1.7856 11.4,-3.6018 12.5,-4.0358 1.1,-0.434 4.3253,-1.3074 7.16733,-1.9408 5.71266,-1.2732 7.4813,-2.8015 9.21631,-7.9635 0.64176,-1.9094 2.38458,-4.7427 3.87294,-6.2962 l 2.70609,-2.8245 -0.2841,-27.7039 c -0.15625,-15.2371 -0.68535,-33.7788 -1.17577,-41.2038 -0.49042,-7.425 -1.20657,-21.825 -1.59145,-32 -0.94914,-25.0923 -1.70127,-27.1843 -15.45994,-43 -3.11003,-3.575 -7.5473,-9.326 -9.8606,-12.7799 -4.25363,-6.3511 -14.06748,-25.7631 -14.0826,-27.8558 -0.005,-0.6246 -0.68044,-2.4246 -1.50205,-4 -0.82161,-1.57534 -1.49661,-3.90636 -1.5,-5.18002 -0.003,-1.27366 -0.46743,-3.17763 -1.0312,-4.23105 -0.56377,-1.05341 -1.45572,-4.96133 -1.98212,-8.68426 -0.88933,-6.28986 -2.39223,-14.81377 -3.51606,-19.94188 -0.65359,-2.98237 -5.07693,-8.04956 -9.42012,-10.7913 -3.31741,-2.09419 -6.56863,-3.11638 -17.55666,-5.51985 -13.14833,-2.87601 -26.01544,-13.25971 -31.54627,-25.45769 -3.44329,-7.59403 -6.63083,-22.12177 -6.86935,-31.30823 l -0.0844,-3.25 131,0 131,0 -0.0844,3.25 c -0.23852,9.18646 -3.42606,23.7142 -6.86935,31.30823 -5.53083,12.19798 -18.39794,22.58168 -31.54627,25.45769 -10.98803,2.40347 -14.23925,3.42566 -17.55666,5.51985 -4.34319,2.74174 -8.76653,7.80893 -9.42012,10.7913 -1.12383,5.12811 -2.62673,13.65202 -3.51606,19.94188 -0.5264,3.72293 -1.41835,7.63085 -1.98212,8.68426 -0.56377,1.05342 -1.02781,2.95739 -1.0312,4.23105 -0.003,1.27366 -0.67839,3.60468 -1.5,5.18002 -0.82161,1.5754 -1.49753,3.3754 -1.50205,4 -0.0151,2.0927 -9.82897,21.5047 -14.0826,27.8558 -2.3133,3.4539 -6.75057,9.2049 -9.8606,12.7799 -13.75867,15.8157 -14.5108,17.9077 -15.45994,43 -0.38488,10.175 -1.10103,24.575 -1.59145,32 -0.49042,7.425 -1.01952,25.9667 -1.17577,41.2038 l -0.2841,27.7039 2.70609,2.8245 c 1.48836,1.5535 3.23118,4.3868 3.87294,6.2962 1.73501,5.162 3.50365,6.6903 9.21631,7.9635 2.84203,0.6334 6.06733,1.5068 7.16733,1.9408 1.1,0.434 6.725,2.2502 12.5,4.0358 15.13308,4.6792 22.25749,7.0637 24.23643,8.1118 0.95504,0.5059 3.00254,0.9197 4.55,0.9197 5.51258,0 7.05386,4.7477 2.50848,7.727 -2.52335,1.6539 -7.71319,1.7828 -77.25,1.9187 -40.9997,0.08 -76.41846,-0.17 -78.70837,-0.5557 z"
    
    // some drinks to show
    var drinkData = [
      {
        drink: "3-Mile Long Island Iced Tea",
        parts: [
       
          { 
            unit: 0.01,
            name: "Bitters"
          },  
        { 
            unit: 0.5,
            name: "Gin"
          },{ 
            unit: 0.5,
            name: "Light Rum"
          }, { 
            unit: 0.01,
            name: "Sweet and Sour"
          },{ 
            unit: 0.5,
            name: "Tequila"
          },{ 
            unit: 0.5,
            name: "Triple Sec"
          },{ 
            unit: 0.5,
            name: "Vodka"
          },{ 
            unit: 0.5,
            name: "Coca-Cola"
          }
          
        ]
      }, {
        drink: "50/50",
        parts: [
          { 
            unit: 2.5,
            name: "Vanilla Vodka"
          },{ 
            unit: 0.5,
            name: " Grand Marnier"
          },{ 
            unit: 9,
            name: "Orange juice"
          }
        ]
      }, {
        drink: "501 Blue",
        parts: [
          { 
            unit: 1,
            name: "Blue Curacao"
          },{ 
            unit: 1,
            name: " Blueberry schnapps"
          },{ 
            unit: 1,
            name: "Vodka"
          },{ 
            unit: .333,
            name: "Sour Mix"
          },{ 
            unit: 6,
            name: "7-Up"
          }
        ]
      },{
        drink: "'69 Special",
        parts: [
          { 
            unit: 2,
            name: "Gin"
          },{ 
            unit: 4,
            name: "7-Up"
          },{ 
            unit: 0.75,
            name: "Lemon juice"
          }
        ]
      },{
        drink: "A Day at the Beach",
        parts: [
          { 
            unit: 1,
            name: "Coconut rum"
          },{ 
            unit: 0.5,
            name: "Amaretto"
          },{ 
            unit: 4,
            name: "Orange juice"
          },{ 
            unit: 0.5,
            name: "Grenadine"
          }
        ]
      },{
        drink: "A Furlong Too Late",
        parts: [
          { 
            unit: 2,
            name: "Light Rum"
          },{ 
            unit: 4,
            name: "Ginger Beer"
          },{ 
            unit: 1,
            name: "Lemon Peel"
          }
        ]
      },{
        drink: "A midsummernight dream",
        parts: [
          { 
            unit: 2,
            name: "Vodka"
          },{ 
            unit: 1,
            name: "Krschwasser"
          },{ 
            unit: .1,
            name: "Strawberry liqueur"
          },{ 
            unit: 5,
            name: "Strawberries"
          },{ 
            unit: .5,
            name: "Schweppes Russchian"
          }
        ]
      },{
        drink: "A Night In Old Mandalay",
        parts: [
          { 
            unit: 1,
            name: "Light Rum"
          },{ 
            unit: 1,
            name: "Añejo rum"
          },{ 
            unit: 1,
            name: "Orange juice"
          },{ 
            unit: 0.5,
            name: "Lemon juice"
          },{ 
            unit: 3,
            name: "Ginger ale"
          },{ 
            unit: 1,
            name: "Lemon peel 1"
          }
        ]
      },{
        drink: "A.J.",
        parts: [
          { 
            unit: 1.5,
            name: "Applejack"
          },{ 
            unit: 1,
            name: "Grapefruit juice"
          }
        ]
      },{
        drink: "Abbey Cocktail",
        parts: [
          { 
            unit: 1.5,
            name: "Gin"
          },{ 
            unit: .01,
            name: "Orange bitters"
          },{ 
            unit: .5,
            name: "Orange"
          },{ 
            unit: 1,
            name: "Cherry"
          }
        ]
      },{
        drink: "Abilene",
        parts: [
          { 
            unit: 1.5,
            name: "Dark Rum"
          },{ 
            unit: 2,
            name: "Peach nectar"
          },{ 
            unit: 3,
            name: "Orange juice"
          }
        ]
      },{
        drink: "Absolut Stress #2",
        parts: [
          { 
            unit: 1.5,
            name: "Vodka"
          },{ 
            unit: .5,
            name: "Peach schnapps"
          },{ 
            unit: 1.5,
            name: "Cranberry juice"
          },{ 
            unit: 0.5,
            name: "Coconut liqueur"
          },{ 
            unit: 1.5,
            name: "Pineapple juice"
          }
        ]
      },{
        drink: "Absolutely Cranberry Smash",
        parts: [
          { 
            unit: 2,
            name: "Vodka"
          },{ 
            unit: 4,
            name: "Cranberry juice"
          },{ 
            unit: 1,
            name: "Orange juice"
          },{ 
            unit: 2,
            name: "Ginger ale"
          }
        ]
      },{
        drink: "Acapulco",
        parts: [
          { 
            unit: 1.5,
            name: "Light Rum"
          },{ 
            unit: 1.5,
            name: "Triple Sec"
          },{ 
            unit: .3,
            name: "Lime juice"
          },{ 
            unit: 1,
            name: "Egg white"
          },{ 
            unit: .1,
            name: "Sugar"
          },{ 
            unit: 1,
            name: "Mint"
          }
        ]
      },{
        drink: "Adam",
        parts: [
          { 
            unit: 2,
            name: "Dark Rum"
          },{ 
            unit: .1,
            name: "Grenadine"
          },{ 
            unit: 1,
            name: "Lemon juice"
          }
        ]
      },{
        drink: "Adam Sunrise",
        parts: [
          { 
            unit: 2,
            name: "Vodka"
          },{ 
            unit: 8,
            name: "Lemonade"
          },{ 
            unit: 1,
            name: "Water"
          },{ 
            unit: 0.1,
            name: "Sugar"
          }
        ]
      },{
        drink: "Adonis Cocktail",
        parts: [
          { 
            unit: .75,
            name: "Sweet Vermouth"
          },{ 
            unit: 1.5,
            name: "Sherry"
          },{ 
            unit: .01,
            name: "Orange bitters"
          }
        ]
      },{
        drink: "Affair",
        parts: [
          { 
            unit: 2,
            name: "Strawberry schnapps"
          },{ 
            unit: 2,
            name: "Orange juice"
          },{ 
            unit: 2,
            name: "Cranberry juice"
          },{ 
            unit: 6,
            name: "Club Soda"
          }
        ]
      },{
        drink: "Affinity",
        parts: [
          { 
            unit: 1.5,
            name: "Scotch"
          },{ 
            unit: 0.02,
            name: "Orange bitters"
          },{ 
            unit: 1,
            name: "Sweet vermouth"
          },{ 
            unit: 1,
            name: "Dry vermouth"
          }
        ]
      },{
        drink: "After Sex",
        parts: [
          { 
            unit: 1,
            name: "Vodka"
          },{ 
            unit: 1,
            name: "Añejo rum"
          },{ 
            unit: 1,
            name: "Creme de Banane"
          },{ 
            unit: 4,
            name: "Orange juice"
          }
        ]
      }

    ];

    drinkData = drinkData.filter((d) => d.drink === drink);
    
    // 47 percent of our glass is where the liquid is
    var colorPercent = 47,
      // 3 percent is the empty spot on top
      // 50 percent is the stem
      startPercent = 50 - colorPercent,
      // width and height of the glass
      drinkWidth = 265,
      drinkHeight = 350,
      colors = d3.scale.category10();

    // calculate percentages...
    drinkData.forEach(function(d0){
      var totPercent = startPercent,
          total = d3.sum(d0.parts, function(d1){ return d1.unit; });
      d0.gradient = [];
      d0.parts.forEach(function(d1){
        d1.startPercent = totPercent;
        d0.gradient.push({
          percent: totPercent,
          color: colors(d1.name)
        });
        totPercent += ((d1.unit / total) * colorPercent);
        d1.endPercent = totPercent;
        d0.gradient.push({
          percent: totPercent,
          color: colors(d1.name)
        });
      });
    });
    
    var svg = d3.select('body')
      .append('svg')
      .attr('width', (drinkWidth * drinkData.length) + 5)
      .attr('height', drinkHeight + 20);
      

    // a g for each glass;
    var glass = svg.selectAll('.drink')
      .data(drinkData)
      .enter()
      .append('g')
      .attr('class', 'drink')
      .attr('transform', function(d,i){
        return 'translate(' + (drinkWidth * i) + ',0)';
      })
    
    // the glass
    glass
      .append('path')
      .attr('d', glassPath)
      .style('stroke', 'black')
      .style('fill', function(d,i){
        return 'url(#grad' + i + ')';
      });
      
    // text labels of drink
    glass
      .append("text")
      .attr("x", drinkWidth / 2)
      .attr("y", drinkHeight)
      .text(function(d){
        return d.drink;
      })
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "16");
      
    // text labels of drink parts
    glass.selectAll('.label')
      .data(function(d){
        return d.parts;
      })
      .enter()
      .append('text')
      .attr('class', 'label')
      .text(function(d){
        return d.unit + " " + d.name;
      })
      .style("fill", "black")
      .attr("x", drinkWidth / 2)
      .attr("y", function(d){
        return (((d.startPercent + d.endPercent) / 2) / 100) * drinkHeight;
      })
      .attr("dy", "1em")
      .style("text-anchor", "middle");
      
    // our gradients
    var grad = svg.append('defs')
      .selectAll('linearGradient')
      .data(drinkData)
      .enter()
      .append('linearGradient')
      .attr('id', function(d,i){
        return "grad" + i;
      })
      .attr('x1', '0%')
      .attr('x2', '0%')
      .attr('y1', '0%')
      .attr('y2', '100%');
      
    // no liquid top of glass
    grad.append("stop")
      .attr("offset", "0%")
      .style("stop-color", "white");
      
    grad.append("stop")
      .attr("offset", startPercent + "%")
      .style("stop-color", "white");
    
    var e = grad.selectAll('.color')
      .data(function(d){
        return d.gradient
      })
      .enter();

    e.append("stop")
      .attr('id', function(d,i){
        return 'stop' + 1;
      })
      .attr("offset", function(d){
        return d.percent + '%';
      })
      .style("stop-color", function(d){
        return d.color;
      });

    // stem of glass
    grad.append("stop")
      .attr("offset", "50%")
      .style("stop-color", "black");
    
    grad.append("stop")
      .attr("offset", "100%")
      .style("stop-color", "black");

});
