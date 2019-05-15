var bardata = [23, 34, 45, 50, 58, 46, 33]

var height = 500,
    width = 600,
    barWidth = 50,
    barOffset = 5;

d3.select('#viz')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background', '#f7f7f7')
  .selectAll('rect').data(bardata)
  .enter().append('rect')
  .style('fill', '#f00')
  .attr('width', '50')
  .attr('height', function(d) {
    return d;
  })
  .attr('x', function(d, i) {
    return i * (barWidth + barOffset);
  })
  .attr('y', function(d) {
    return height - d;
  })
