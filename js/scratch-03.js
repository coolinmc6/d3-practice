
var numDatapoints = 50;
var dummyData = []
for(let i = 0; i < 50; i++) {
  let num = Math.random()*500;
  dummyData.push({y: num});
}

var yScale_CM = d3.scaleLinear()
  .domain([0,500])
  .range([height, 0])

var xScale_CM = d3.scaleLinear()
  .domain([0, dummyData.length-1]) // input
  .range([0, width]); // output

var cmLine = d3.line()
  .x(function(d, i) {
    console.log(i);
    return xScale_CM(i)
  })
  .y(function(d) {
    return yScale_CM(d.y)
  })
  .curve(d3.curveMonotoneX)

// var dataset_CM = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })


var svg_CM = d3.select('#line-test').append('svg')
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// 4. Call the y axis in a group tag
svg_CM.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale_CM)); 

svg_CM.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xScale_CM)); // Create an axis component with d3.axisBottom

// 9. Append the path, bind the data, and call the line generator 
svg_CM.append("path")
  .datum(dummyData) // 10. Binds data to the line 
  .attr("class", "CM-line") // Assign a class for styling 
  .attr("d", cmLine); // 11. Calls the line generator 
