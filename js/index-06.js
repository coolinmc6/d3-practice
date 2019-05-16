var bardata = [23, 34, 45, 50, 58, 46, 33]

var height = 400,
    width = 600,
    barWidth = 50,
    barOffset = 5;



var yScale = d3.scaleLinear()
    .domain([0, d3.max(bardata)])
    .range([0, height])

var xScale = d3.scaleBand()
    .domain(bardata)
    .range([0, width])
    .padding(0.2)

var myChart = 
  d3.select('#viz')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background', '#f7f7f7')
  .selectAll('rect').data(bardata)
  .enter().append('rect')
  .style('fill', '#f00')
  .attr('width', function(d) {
    return xScale.bandwidth();
  })
  .attr('height', 0)
  .attr('y', height)
  .attr('x', function(d) {
    // return i * (barWidth + barOffset);
    return xScale(d);
  })
  .on('mouseover', function(d) {
    d3.select(this)
      .style('opacity', 0.5)
      
  })
  .on('mouseout', function(d) {
    d3.select(this)
      .style('opacity', 1)  
  })

myChart.transition()
  .attr('height', function(d) {
    return yScale(d);
  })
  .attr('y', function(d) {
    return height - yScale(d);
  })
  .delay(function(d, i) {
    return i * 100;
  })
  .duration(1000)
  .ease(d3.easeBounceOut)