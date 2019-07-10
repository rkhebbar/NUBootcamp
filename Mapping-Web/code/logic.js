// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" +
  "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
  console.log(data)
});

// function createFeatures(earthquakeData) {

//   // Define a function we want to run once for each feature in the features array
//   // Give each feature a popup describing the place and time of the earthquake
//   function onEachFeature(feature, layer) {
//     layer.bindPopup("<h3>" + feature.properties.place +
//       "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
//   }
  
//   function choosecolor(mag){
//     console.log(mag);
//     var color = "";
//     if (mag > 5 ) {
//       color = "orange";
//     }
//     else if (mag > 2) {
//       color = "orange";
//     }
//     else{
//       color = "green";
//     }
//     return color;

// }
//   var earthquakes = L.geoJSON(earthquakeData, {
//       onEachFeature: onEachFeature,
//       pointToLayer: function (feature, latlng) {
//         var geojsonMarkerOptions = {
//             radius: 3*feature.properties.mag, 
//             fillColor: choosecolor(feature.properties.mag),
//             color: "#050f02",
//             weight: 0.3,
//             opacity: 0.5,
//             fillOpacity: 0.8
//         };
//           return L.circleMarker(latlng, geojsonMarkerOptions);
//         }
//     });
//     createMap(earthquakes);
// }

// function markerSize(feature) {
//         return Math.sqrt(Math.abs(feature.properties.mag)) * 5;
//       }
      
//       // Function to determine marker color based on earthquake magnitude
//       var colors = ["#7FFF00", "#dfedbe", "#eede9f", "#FF8C00", "#FA8072", "#FF0000"]
//       function fillColor(feature) {
//         var mag = feature.properties.mag;
//         if (mag <= 1) {
//           return colors[0]
//         }
//         else if (mag <= 2) {
//           return colors[1]
//         }
//         else if (mag <= 3) {
//           return colors[2]
//         }
//         else if (mag <= 4) {
//           return colors[3]
//         }
//         else if (mag <= 5) {
//           return colors[4]
//         }
//         else {
//           return colors[5]
//         }
//       };

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

// Function to determine marker size based on earthquake magnitude
function markerSize(feature) {
    return Math.sqrt(Math.abs(feature.properties.mag)) * 5;
  }
  
  // Function to determine marker color based on earthquake magnitude
  var colors = ["#7FFF00", "#dfedbe", "#eede9f", "#FF8C00", "#FA8072", "#FF0000"]
  function fillColor(feature) {
    var mag = feature.properties.mag;
    if (mag <= 1) {
      return colors[0]
    }
    else if (mag <= 2) {
      return colors[1]
    }
    else if (mag <= 3) {
      return colors[2]
    }
    else if (mag <= 4) {
      return colors[3]
    }
    else if (mag <= 5) {
      return colors[4]
    }
    else {
      return colors[5]
    }
  }
  
  // Base layers for maps (no data yet)
  var attribution = "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>";
  
  var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: attribution,
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });
  
  var lightMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: attribution,
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });
  
  var outdoorsMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: attribution,
    maxZoom: 18,
    id: "mapbox.outdoors",
    accessToken: API_KEY
  });
  
  // Create a baseMaps object
  var baseMaps = {
    "Satellite": satelliteMap,
    "Grayscale": lightMap,
    "Outdoors": outdoorsMap
  };
  
  // Store API endpoint as queryUrl
  var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
  var platesPath = "GeoJSON/PB2002_boundaries.json";
  
  // Perform a GET request to the query URL
  d3.json(queryUrl, function(data) {
      d3.json(platesPath, function(platesData) {
    
        // console.log(data.features);
        console.log(platesData);
  
            // Earthquake layer
      var earthquakes = L.geoJSON(data, {
  
          // Create circle markers
          pointToLayer: function (feature, latlng) {
            var geojsonMarkerOptions = {
              radius: 8,
              stroke: false,
              //fillColor: "#ff7800",
              radius: markerSize(feature),
              fillColor: fillColor(feature),
              //color: "white",
              weight: 5,
              opacity: .8,
              fillOpacity: .8
            };
            return L.circleMarker(latlng, geojsonMarkerOptions);
          },
    
          // Create popups
          onEachFeature: function (feature, layer) {
            return layer.bindPopup(`<strong>Place:</strong> ${feature.properties.place}<br><strong>Magnitude:</strong> ${feature.properties.mag}`);
          }
        });
  
            // Tectonic plates layer
      var platesStyle = {
          "color": "white",
          "weight": 2,
          "opacity": 1,
          fillOpacity: 0,
        };
        var plates = L.geoJSON(platesData, {
          style: platesStyle
        });
    
        // Create an overlay object
        var overlayMaps = {
          "Fault lines": plates,
          "Earthquakes": earthquakes,
        };
    
        // Define a map object
        var map = L.map("map", {
          center: [37.09, -95.71],
          zoom: 3,
          layers: [satelliteMap, plates, earthquakes]
        });
    
        // Add the layer control to the map
        L.control.layers(baseMaps, overlayMaps, {
          collapsed: false
        }).addTo(map);
    
        // Setting up the legend
        var legend = L.control({ position: "bottomright" });
        legend.onAdd = function() {
          var div = L.DomUtil.create("div", "info legend");
          var limits = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"];
          var labelsColor = [];
          var labelsText = [];
    
          // Add min & max
          limits.forEach(function(limit, index) {
            labelsColor.push(`<li style="background-color: ${colors[index]};"></li>`); // <span class="legend-label">${limits[index]}</span>
            labelsText.push(`<span class="legend-label">${limits[index]}</span>`)
          });
    
          var labelsColorHtml =  "<ul>" + labelsColor.join("") + "</ul>";
          var labelsTextHtml = `<div id="labels-text">${labelsText.join("<br>")}</div>`;
    
          var legendInfo = "<h4>Earthquake<br>Magnitude</h4>" +
            "<div class=\"labels\">" + labelsColorHtml + labelsTextHtml
            "</div>";
          div.innerHTML = legendInfo;
    
          return div;
        };
    
        // Adding legend to the map
        legend.addTo(map);
    
      })
    })