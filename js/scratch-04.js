
// Create Fake Data
var lineData = [23,33, 48, 78, 5, 0, 55, 15, 92, 10, 44, 15, 97]

// Create Y-Scale
var yScale4 = d3.scaleLinear()
  .domain([0, 100])
  .range([height, 0])

// Create X-Scale
var xScale4 = d3.scaleLinear()
  .domain([0, lineData.length])
  .range([0, width])

// Create the Line
var line4 = d3.line()
  .x(function(d, i) {
    return xScale4(i);
  })
  .y(function(d) {
    return yScale4(d);
  })
  .curve(d3.curveMonotoneX)


// Build the SVG
var svg4 = d3.select('#line-test').append('svg')
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Add the X and Y Axes
svg4.append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(d3.axisBottom(xScale4))

svg4.append('g')
  .call(d3.axisLeft(yScale4))

// Draw the Line
svg4.append("path")
  .datum(lineData) // 10. Binds data to the line 
  .attr("class", "CM-line") // Assign a class for styling 
  .attr("d", line4); // 11. Calls the line generator 