// from data.js
var tableData = data;
// YOUR CODE HERE!

var tbody = d3.select('tbody');
console.log(data);

data.forEach(function(ufoTable){
    console.log(ufoTable);
});



data.forEach(function(ufoTable){
    console.log(ufoTable);
    var row = tbody.append("tr");
    Object.entries(ufoTable).forEach(function([key, value]){
        console.log(key, value);
        var cell = row.append("td");
        cell.text(value);
    });
});

var submit = d3.select("#filter-btn");
submit.on("click", function(){
    d3.event.preventDefault();
    var inputElement = d3.select("#datetime");
    var inputValue = inputElement.property("value");
    console.log(inputValue);
    console.log(tableData);
    var filteredData = tableData.filter(data => data.datetime === inputValue);
    console.log(filteredData);
    var currentRow = d3.selectAll("tr");
    currentRow.remove();
    filteredData.forEach((ufo)=>{
        row = tbody.append("tr");
    Object.entries(ufo).forEach(function([key, value]){
        console.log(key, value);
        cell = row.append("td");
        cell.text(value);
        });
    });
        
});