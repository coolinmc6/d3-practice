

console.log(timePeriodComparison);

// #1 - Get & Clean the Data
var cleanedTime = {allPoints: []}
cleanedTime.data = timePeriodComparison[0].qMatrix.map(arr => {
  // #3-a: this line added before I did the Y Axis
  cleanedTime.allPoints.push(arr[1].qNum, arr[2].qNum)
  return {
    dim1: arr[0].qText,
    measure1: arr[1].qNum,
    measure2: arr[2].qNum,
  }
})

// #3-b: Finding min and max for the Y Scale (turns out my lower limit is 0 but still worthwhile)
cleanedTime.min = d3.min(cleanedTime.allPoints)
cleanedTime.max = d3.max(cleanedTime.allPoints)

// cleanedTime.allPoints = cleanedTime.data

console.log(cleanedTime)

// #2 - Build the SVG with the <g> element with the margins
var timePeriod = d3.select('#time-period').append('svg')
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var divs = 5;
for(let i = 0; i < divs; i++)   {
  let h = height/divs*i
  timePeriod.append('line')
  .attr('x1', 0)
  .attr('x2', width*0.6)
  .attr('y1', h+1)
  .attr('y2', h+1)
  .attr('style', 'stroke: #ddd; stroke-width: 1px')
}
// #3 - Define the X and Y Axes
var yScale6 = d3.scaleLinear().domain([0, cleanedTime.max*1.5]).range([height, 0]);

var xScale6 = d3.scaleLinear().domain([0, cleanedTime.allPoints.length]).range([0, width]);

// #4 - Add the dots
var dotRadius = 3;
timePeriod.append('g').selectAll('.cm-dot')
  .data(cleanedTime.data).enter().append('circle')
  .attr('class', 'cm-dot')
  .attr('cx', function(d, i) {
    return xScale6(i+1)
  })
  .attr('cy', function(d) {
    return yScale6(d.old)
  })
  .attr('r', dotRadius)
  .style('fill', '#990000')

timePeriod.append('g').selectAll('.cm-dot')
  .data(cleanedTime.data).enter().append('circle')
  .attr('class', 'cm-dot')
  .attr('cx', function(d, i) {
    return xScale6(i+1)
  })
  .attr('cy', function(d) {
    return yScale6(d.new)
  })
  .attr('r', dotRadius)
  .style('fill', '#000099')

timePeriod.append('g').selectAll('.cm-line')
  .data(cleanedTime.data).enter().append('line')
  .attr('class', 'cm-line')
  .attr('x1', function(d, i) {
    return xScale6(i+1);
  })
  .attr('x2', function(d, i) {
    return xScale6(i+1);
  })
  .attr('y1', function(d) {
    return yScale6(d.old);
  })
  .attr('y2', function(d) {
    return yScale6(d.new);
  })
  // .attr('style', 'stroke: #000; stroke-width: 2px;')
  .attr('style', function(d) {
    let str = `stroke: ${d.new > d.old ? '#990000' : '#000099'}; `
    str += 'stroke-width: 2px;'
    return str;
  })

  
timePeriod.append('g').call(d3.axisLeft(yScale6).ticks(5))  

timePeriod.append('g')
  .selectAll('text')
  .data(cleanedTime.data)
  .enter().append('text')
  .text(function(d) {
    return d.name;
  })
  .attr('x', function(d, i) {
    return xScale6(i+1) - 20
  })
  .attr('y', height + 20)

