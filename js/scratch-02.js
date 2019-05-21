var barWidth = 50;
var height = 300;
var width = 500;
var barPadding = 4;
var barWidth = 15;
var margin = {top: 10, right: 0, bottom: 25, left: 25};


// console.log(practiceData)

var cleaned = {
  type: 'Line',
  data: {},
  barCount: 0,
  colors: ['#730202','#A66249', '#F2DAC4', '#657A8C', '#000'],
  allPoints: []
}
practiceData[0].qMatrix.map(arr => {
  if(cleaned['data'][arr[0].qText]) {
    
  } else {
    cleaned['data'][arr[0].qText] = []
  }
  let prop = arr[1].qText;
  const obj = {};
  obj.name = prop
  obj['num'] = arr[2].qNum;
  cleaned.allPoints.push(arr[2].qNum) 
  cleaned['data'][arr[0].qText].push(obj);
  cleaned.barCount = cleaned['data'][arr[0].qText].length > cleaned.barCount ? cleaned['data'][arr[0].qText].length : cleaned.barCount;
})

cleaned.groups = Object.keys(cleaned.data).length;
cleaned.groupPadding = Math.floor((width - (cleaned.barCount*barWidth)) / cleaned.groups, 0)
cleaned.groupPaddingStart = Math.floor(cleaned.groupPadding / 2,0);
cleaned.max = d3.max(cleaned.allPoints)
cleaned.min = 0; // d3.min(cleaned.allPoints)
// console.log(cleaned);

// // console.log(testDataObjects)


// var yScale = d3.scaleLinear().domain([175, 225]).range([0, height]);
// var yAxisValues = d3.scaleLinear().domain([175, 225]).range([height, 0])
// var yAxisTicks = d3.axisLeft(yAxisValues).ticks(10);

// var xScale = d3.scaleBand().domain(testData).range([0, width]).padding(0.04)

// var xAxisValues = d3.scaleTime().domain([dates[0], dates[dates.length-1]]).range([0, width - margin.left - margin.right])
// var xAxisTicks = d3.axisBottom(xAxisValues).ticks(d3.timeDay.every(3))




// // console.log(dates);
var myChart;
function instantiateChart(selector) {
  myChart = d3.select(selector)
    .append('svg')
    .attr('height', height + margin.top + margin.bottom)
    .attr('width', width  + margin.left + margin.right)
    .style('background', '#fff3fe')
}

instantiateChart('#viz');

var yScale = d3.scaleLinear()
  .domain([cleaned.min, cleaned.max*1.5])
  .range([0, height])

var yAxis = d3.scaleLinear()
  .domain([cleaned.min, cleaned.max*1.5])
  .range([height, 0])

var yAxisTicks = d3.axisLeft(yAxis).ticks(4);

function addToChart(chartObj) {
  let idx = 0;
  for(var group in chartObj['data']) {
    // console.log(group)
    // console.log(chartObj['data'])

    d3.select('#viz svg').append('g')
      // .transition()
      .attr('class', group)
      .selectAll('rect').data(chartObj['data'][group])
      .enter().append('rect')
      .attr('height', function(d) {
        // console.log(d.num);
        // return Math.floor(Math.random()*250)
        return yScale(d.num);
      })
      .attr('y', function(d) {
        // return Math.floor(Math.random()*250);
        return height - yScale(d.num);
      })
      .attr('width', function(d) {
        return barWidth;
      })
      .attr('x', function(d, i) {
        var placement = i * (barWidth + barPadding) + idx*chartObj.groupPadding + chartObj.groupPaddingStart;
        // console.log(placement)
        return placement;
      })
      .attr('fill', function(d, i) {
        return chartObj['colors'][i]
    })
    
    d3.select('#viz svg').append('g')
      .selectAll('text').data([group])
      .enter().append('text')
      .attr('x', (chartObj.groupPaddingStart + idx*chartObj.groupPadding + barWidth))
      .attr('y', height + 20)
      .text(group)
    
    idx++;
  }

  addYAxis();
  
  
}

addToChart(cleaned);

function addYAxis() {
  var yGuide = d3.select('#viz svg').append('g')
    .attr('transform', 'translate(55,0)')
    .call(yAxisTicks)
}

$('#data-set').on('change', function() {
  d3.select('#viz svg').remove()
  setTimeout(function() {
    console.log('Option changed')
    
    instantiateChart()
    addToChart(cleaned)
  }, 1500)
})

function drawline() {
  d3.select('#viz svg').append('g')
    .append('line')
    .attr('x1', 5)
    .attr('y1', 20)
    .attr('x2', 300)
    .attr('y2', 20)
}

drawline();

//=============================================================================
// Trend of Material Waste

// console.log(trendOfMaterialWaste);

// var lineChart = d3.select('#trendMatWaste')
//   .append('svg')
//   .attr('height', height + margin.top + margin.bottom)
//   .attr('width', width  + margin.left + margin.right)
//   .style('background', '#fff3fe')


// The number of datapoints
var n = 21;

// 5. X scale will use the index of our data
var xScale = d3.scaleLinear()
    .domain([0, n-1]) // input
    .range([0, width]); // output

// 6. Y scale will use the randomly generate number 
var yScale = d3.scaleLinear()
    .domain([0, 1]) // input 
    .range([height, 0]); // output 

// 7. d3's line generator
var line = d3.line()
    .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
var dataset = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })

// 1. Add the SVG to the page and employ #2
var svg = d3.select("#trendMatWaste").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// 3. Call the x axis in a group tag
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

// 9. Append the path, bind the data, and call the line generator 
svg.append("path")
    .datum(dataset) // 10. Binds data to the line 
    .attr("class", "line") // Assign a class for styling 
    .attr("d", line); // 11. Calls the line generator 

// 12. Appends a circle for each datapoint 
svg.selectAll(".dot")
    .data(dataset)
    .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d, i) { return xScale(i) })
    .attr("cy", function(d) { return yScale(d.y) })
    .attr("r", 5)
      .on("mouseover", function(a, b, c) { 
  			console.log(a) 
        this.attr('class', 'focus')
		})



