
// Clean Up Line Data
// console.log(trendOfMaterialWaste)

function getDate(str) {
  var s1 = str.indexOf('/')
  var s2 = str.lastIndexOf('/')
  var dayLen = s2 - s1 - 1;
  
  var month = str.substr(0,s1)
  var day = str.substr(s1+1,dayLen);
  var year = str.substr(s2+1)
  // console.log(`${str}: Month: ${month}, Day: ${day}, Year: ${year}; #1: ${s1}; #2: ${s2}`);
  var d = new Date(year, month-1, day)
  return d;
}

var cleanedTrend = {
  data: trendOfMaterialWaste[0].qMatrix.map(arr => {
    return {
      date: getDate(arr[0].qText),
      old: arr[1].qNum,
      new: arr[2].qNum
    }
  })
}

cleanedTrend.allValues = [...cleanedTrend.data.map(x => x.old), ...cleanedTrend.data.map(x => x.new)]
cleanedTrend.max = Math.max(...cleanedTrend.allValues)
cleanedTrend.min = Math.min(...cleanedTrend.allValues)

var trendWidth = 800;

// console.log(cleanedTrend)

var yScale5 = d3.scaleLinear()
  .domain([cleanedTrend.min, cleanedTrend.max])
  .range([height, 0])

var xScale5 = d3.scaleLinear()
  .domain([0, cleanedTrend.data.length])
  .range([0, trendWidth])

/*
var xScale5 = d3.scaleLinear()
  .domain([cleanedTrend.data[0].date, cleanedTrend.data[cleanedTrend.data.length-1].date])
  .range([0, trendWidth])
*/

margin.left = 40;

// Build the SVG
var svg5 = d3.select('#line-test').append('svg')
  .attr("width", trendWidth + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var line5 = d3.line()
  .x(function(d, i) {
    return xScale5(i)
  })
  .y(function(d) {
    return yScale5(d.old)
  })
  .curve(d3.curveMonotoneX)

var line5_new = d3.line()
  .x(function(d, i) {
    return xScale5(i)
  })
  .y(function(d) {
    return yScale5(d.new)
  })
  // .interpolate("basis")
  .curve(d3.curveBasis)

svg5.append('path')
  .datum(cleanedTrend.data)
  .attr('class', 'trend-line-old')
  .attr('d', line5)

svg5.append('path')
  .datum(cleanedTrend.data)
  .attr('class', 'trend-line-new')
  .attr('d', line5_new)

svg5.append('g')
  .call(d3.axisLeft(yScale5).ticks(5))
  .attr('trans')