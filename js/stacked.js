var barWidth = 50;
var height = 300;
var width = 500;
var barPadding = 4;
var barWidth = 15;
var stackedWidth = 70;
var margin = {top: 10, right: 0, bottom: 25, left: 25};


console.log(practiceData)

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

cleaned.stackMax = cleaned.max;
let max = 0;
for(let prop in cleaned.data) {
  let total = 0;
  cleaned.data[prop].map(d => {
    total += d.num;
  })
  max = max < total ? total : max;
}
cleaned.stackMax = max;


var yScale = d3.scaleLinear()
  .domain([cleaned.min, cleaned.stackMax])
  .range([0, height])

var yAxis = d3.scaleLinear()
  .domain([cleaned.min, cleaned.stackMax])
  .range([height, 0])

/* I need to stack the bars - that means knowing the position of the last bar */

for(let prop in cleaned.data) {
  let y = 0;
  cleaned.data[prop] = cleaned.data[prop].map(item => {
    y += yScale(item.num)
    return {
      ...item,
      y
    }
  })
}

console.log(cleaned);

var myChart;
function instantiateChart(selector) {
  myChart = d3.select(selector)
    .append('svg')
    .attr('height', height + margin.top + margin.bottom)
    .attr('width', width  + margin.left + margin.right)
    .style('background', '#fff3fe')
}

instantiateChart('#viz')



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
        return height - d.y
        // return height - yScale(d.num);
      })
      .attr('width', function(d) {
        return stackedWidth;
      })
      .attr('x', function(d, i) {
        // var placement = i * (barWidth + barPadding) + idx*chartObj.groupPadding + chartObj.groupPaddingStart;
        // console.log(placement)
        var placement = idx*chartObj.groupPadding + chartObj.groupPaddingStart;

        // return (i * 15) + i*50;
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
