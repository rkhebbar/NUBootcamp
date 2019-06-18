var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top:20,
    right:40,
    bottom:80,
    left: 50
};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`);

d3.csv("assets/data/data.csv").then(function(data){
    
    data.forEach(function(pltData) {
        pltData.obesity = +pltData.obesity;
        pltData.income = +pltData.income;
      });
    var yLinearScale = d3.scaleLinear()
      .range([chartHeight, 0]);
    var xLinearScale = d3.scaleLinear()
      .range([0, chartWidth]);
    
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    xLinearScale.domain([30000, d3.max(data, function(data) {
        return +data.income;
      })]);
    yLinearScale.domain([0, d3.max(data, function(data) {
        return +data.obesity * 1.3;
      })]);
      
      var elem = chartGroup.append("g").selectAll("g")
      .data(data)
    
    var elemEnter =elem.enter()
        .append("g")
        .attr("transform", function (data, index) {
          return "translate(" + xLinearScale(data.income) + " ," + yLinearScale(data.obesity) + ")"
        });
        elemEnter.append("circle")
          .attr("r", "10") 
          .attr("fill", "lightblue")
          .on("click", function(data) {
          toolTip.show(data);

          });
        elemEnter.append("text")
          .attr("dy", function(data, index){return 5;})
          .attr("text-anchor", "middle")
          .text(function(data, index){return data.abbr;})     
          .attr("font-size", 8)  
          .attr('fill', 'white');
  
    chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis);
    
    chartGroup.append("g")
      .call(leftAxis);
  
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left - 5)
        .attr("x", 0 - (chartHeight / 2)- 60)
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Obesity(%)");
  
  
    chartGroup.append("text")
      .attr("transform", "translate(" + (chartWidth / 2 - 25) + " ," + (chartHeight + margin.top + 30) + ")")
      .attr("class", "axisText")
      .text("Income($)");
});