var testData = [205, 210, 212, 214, 208, 206, 208, 210, 206, 205, 203, 208, 204, 200, 199, 198, 196, 194]
var dates = [];




var barWidth = 50;
var height = 400;
var width = 600;
var barPadding = 4;
var barWidth = 7;
var margin = {top: 10, right: 0, bottom: 25, left: 25};


var date = new Date();
for(let i = 0; i < testData.length; i++) {
  var newDate = new Date(date.getTime())
  dates.push(newDate);

  date.setDate(date.getDate()+1)
}

var testDataObjects = testData.map((wt, i) => {
  var obj = {
    wt: wt,
    type: `Line ${i % 4 + 1}`
  }
  return obj;
})

// console.log(testDataObjects)


var yScale = d3.scaleLinear().domain([175, 225]).range([0, height]);
var yAxisValues = d3.scaleLinear().domain([175, 225]).range([height, 0])
var yAxisTicks = d3.axisLeft(yAxisValues).ticks(10);

var xScale = d3.scaleBand().domain(testData).range([0, width]).padding(0.04)

var xAxisValues = d3.scaleTime().domain([dates[0], dates[dates.length-1]]).range([0, width - margin.left - margin.right])
var xAxisTicks = d3.axisBottom(xAxisValues).ticks(d3.timeDay.every(3))




// console.log(dates);


d3.select('#viz')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width  + margin.left + margin.right)
  .style('background', '#fff3fe')
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`)
  .selectAll('rect').data(testDataObjects)
  .enter().append('rect')
  .attr('height', function(d) {
    return yScale(d.wt);
  })
  .attr('y', function(d) {
    return height - yScale(d.wt);
  })
  .attr('width', function(d) {
    return barWidth;
  })
  .attr('x', function(d, i) {
    return i * (barWidth + barPadding)
  })
  .attr('fill', function(d) {
    switch(d.type) {
      case 'Line 1':
        return '#730202';
      case 'Line 2':
        return '#A66249';
      case 'Line 3':
        return '#F2DAC4';
      case 'Line 4':
        return '#657A8C';
        break;
      default:
        return 'purple';
    }
  })

var yGuide = d3.select('#viz svg').append('g')
  .attr('transform', 'translate(26,9)')
  .call(yAxisTicks)

var xGuide = d3.select('#viz svg').append('g')
  .attr('transform', `translate(${margin.left+8},${(height+margin.top)})`)
  .call(xAxisTicks)