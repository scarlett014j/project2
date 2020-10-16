var myMap = L.map("map", {
  center: [33.78, -84.37],
  zoom: 12
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

d3.csv("Map Visualization/locations.csv").then(function(liquor_location) {
  console.log(liquor_location)
  liquor_location.forEach(row => {
    var marker = L.marker([row.lat, row.long], {
      opacity: 1
    }).bindPopup(row.name)
    marker.addTo(myMap)
    
  }); 
  // var markers = L.marker([row.lat, row.long]);
  // for (var i = 0; i < liquor_location.length; i++) {
  //   var location = liquor_location[i].location;
  //   if (location) {

  //     markers.addLayer(L.marker([location.lat, location.long)
  //       .bindPopup(response[i].descriptor));
  //   }
  // myMap.addLayer(markers);
});