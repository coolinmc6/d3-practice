<a name="top"></a>

# D3 Practice

Using python server:

```sh
python -m http.server 8000
```

## D3 Basics

- D3 looks like it can do a bunch of stuff and is similar to jQuery in how it selects items and then you can do things. There are a bunch of methods I could list but here are a few that stand out (just to highlight what it can do):
  - `append()` - adding an element to the selected item
  - `html()` - for adding HTML, not escaped text
  - `select()` - selects the element you want
  - `selectAll()` - selects and edits all elements that match
  - `data()` - binds selected array of data with the selected elements. Learn more [here](https://github.com/d3/d3-selection/blob/v1.4.0/README.md#selection_data)
  - `enter()` - placeholder nodes for each data that you are about to enter. Learn more [here](https://github.com/d3/d3-selection/blob/v1.4.0/README.md#selection_enter)


```js
var mydata = [
  { date: '4/01/2017', low: 55, high: 78 },
  { date: '4/02/2017', low: 65, high: 83 },
  { date: '4/03/2017', low: 77, high: 90 },
  { date: '4/04/2017', low: 58, high: 78 },
  { date: '4/05/2017', low: 67, high: 92 },
];

d3.select('#table tbody')
  .data(mydata)
  .enter().append('tr')
  .html(function(d) {
    return `<td>${d.date}</td><td>${d.low}</td><td>${d.high}</td>`
  })
```
- Notice that I first select the element from the DOM that I want to add the data to. Then I use the `data()` method to bind the data. I then use the `enter()` method to create placeholder `<tr>` elements with the three `<td>` elements inside. 
- It looks like one of the main ways that D3 builds charts is with SVG.
- One of the first you'll need to do is build the SVG element:

```js
d3.select('#viz')
  .append('svg')
  .attr('width', 600)
  .attr('height', 400)
  .style('background', '#f7f7f7')
```
- Notice that I'm selecting the element by its id `#viz`, adding an `<svg>` element, and
then adding styling (height, width, background color)
- On top of that, I can then add another SVG Primitive

```js
// from above
d3.select('#viz')
  .append('svg')
  .attr('width', 600)
  .attr('height', 400)
  .style('background', '#f7f7f7') 

  // new code:
  .append('rect')
  .attr('x', 200)
  .attr('y', 100)
  .attr('height', 200)
  .attr('width', 200)
  .style('fill', '#ff9900')
```
- I can't do this forever, however. If I were to do that again, the `append` method wouldn't add another `rect` to the SVG. I would need to select the SVG again:

```js
d3.select('#viz svg')
  .append('rect')
  .attr('x', 0)
  .attr('y', 200)
  .attr('height', 50)
  .attr('width', 50)
  .style('fill', '#ff9900')
```
- Here is some more on [SVG Primitives](https://developer.mozilla.org/en-US/docs/Web/SVG/Element) but I'm going to bet that these are the primary ones:
  - `rect` - [MDN Rect](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect)
  - `circle` - [MDN Circle](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle)
  - `line` - [MDN Line](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/line)
  - `polyline` - [MDN Polyline](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline)
  - `text` - [MDN Line](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text)
  - see [Appendix A](#appendix-a-svg) for a few examples

- Pick up here: [https://github.com/planetoftheweb/d3/blob/01_06e/builds/d3/js/script.js](https://github.com/planetoftheweb/d3/blob/01_06e/builds/d3/js/script.js)


[[↑] Back to top](#top)

## Working with Data


[[↑] Back to top](#top)

## Basic Chart Creation Steps












[[↑] Back to top](#top)

## FAQ

**How do I draw the SVG container for the chart?**

```js
d3.select('#viz')
  .append('svg')
  .attr('width', 600)
  .attr('height', 400)
  .style('background', '#f7f7f7')
```

[[↑] Back to top](#top)

**What are the main steps in building a simple bar chart?**

- Build the SVG container element
- Build the bars (`rect` elements) that go inside
  - The `rect` elements have a number of properties that you have to account for:
    - height of each bar
    - width of each bar
    - x position of each bar
    - y position of each bar
    - the fill color of each bar
  - Digging into those properties, you can see that some are the same, some are different. Here is another breakdown:
    - height: **Individual/Data** - depends on the value of the data point
    - x position: **Individual/Position** - doesn't depend on the value of the data point BUT we don't want stacked bars
    - y position: **Individual/Data** - closely related to height; the y position is affected by how tall the bar is
    - width: **ALL BARS** - the width of all bars will *most likely* be equal across all bars
    - fill: **ALL BARS** - the fill *may* vary by bar but for standard bar charts, you can choose to keep them all the same

```js
var bardata = [23, 34, 45, 50, 58, 46, 33]

d3.select('#viz')   // select the #viz container element
  .append('svg')    // append an SVG element
  .attr('width', 600)   // set the width of SVG
  .attr('height', 400)  // set the height of the SVG
  .style('background', '#f7f7f7') // set the color of the SVG; at this point, the SVG "canvas" is complete
  .selectAll('rect').data(bardata)  // Select rect and bind data; see Note 1 below
  .enter().append('rect')           // Append a rect element to my SVG element for each data point; see Note 1 below
  .style('fill', '#f00')    // set the fill color
  .attr('width', '50')      // set the width
  .attr('height', function(d) {   // for each data point, I am setting the height (in pixels); see Note 2 below
    return d;
  })
  .attr('x', function(d, i) {     // for each data point, set the x position
    return i * (50);
  })
  .attr('y', function(d) {        // for each data point, set the y position
    return 400 - d;
  })
```
- **Note 1**: This part is a bit tricky and seems to be in reverse. After creating the SVG box for the chart, we select all of the `rect` elements (presumably in the SVG) and binding them to the data from my `bardata` variable. That wouldn't be crazy but I haven't "created" the `rect` elements yet. I don't create them until the next line: `.enter().append('rect')`. This feels like
one of those arbritrary things where I just have to accept that I *first* select the rectangles that will be my bars and *then* create them.
- **Note 2**: It looks like most of these functions, if there is data attached using the `data()` method, allow me to programmatically set their properties - most importantly for a bar chart: height, x position, and y position.

[[↑] Back to top](#top)

**How do we make our chart scale *vertically* with the data?**

- We need to create a scale. There are a number of different kinds of scales but for a simple bar chart, we need `scaleLinear()` from D3.
- The process itself is pretty simple:
  - create a variable equal to `d3.scaleLinear()`
  - set the domain (the smallest and largest points in our data set)
  - set the range (the smallest and largest y-values for our chart)
  - *there could be other parts but this will take care of the biggest items I need to worry about*
- Here is that in code:

```js
var yScale = d3.scaleLinear()
    .domain([0, d3.max(bardata)]) // the top and bottom of our data; the largest and smallest points
    .range([0, height])           // the top and bottom of our chart
```
- *Notice* that we are using another D3 function to find the largest point: `d3.max(bardata)` - there are a lot of other ones out there as well. If our dataset went into the negatives I'm sure we could use a `min()` method as well.
- *Notice* that was use `height`
- Then, after creating the scale, we need to apply it to the chart. Remember, this scale is affecting the height of our bars and thus also the y position so we must update **both** of our height and y-position attributes

```js
.attr('height', function(d) {
  return yScale(d); // Original: return d;
})
.attr('x', function(d, i) {
  return i * (barWidth + barOffset); // Unchanged
})
.attr('y', function(d) {
  return height - yScale(d); // Original: return height - d;
})
```

[[↑] Back to top](#top)

**How we make our data scale *horizontally* with the data?**

- Just like the `yScale`, we must instantiate it with a D3 function (`d3.scaleBand()`) and then add a domain and range.

```js
var xScale = d3.scaleBand()
    .domain(bardata)
    .range([0, width])
    .padding(0.2)
```

- Then we also need to adjust the width of our bars and their x position:

```js
.attr('width', function(d) {
  return xScale.bandwidth(); // Originally a static value of barWidth
})
.attr('height', function(d) {
  return yScale(d);   // Untouched
})
.attr('x', function(d, i) {
  return xScale(d); // Original: return i * (barWidth + barOffset);
})
.attr('y', function(d) {
  return height - yScale(d); // Untouched
})
```
[[↑] Back to top](#top)

**How do you add events?**

```js
//code
.attr('y', function(d) {
  return height - yScale(d);
})
.on('mouseover', function(d) {
  d3.select(this)
    .style('opacity', 0.5)
})
.on('mouseout', function(d) {
  d3.select(this)
    .style('opacity', 1)
})
```
- we can add it to the same d3 function using the `on` keyword. The key part is changing the right item, hence the `d3.select(this)` inside the anonymous function.

[[↑] Back to top](#top)

**How do I add transitions?**

```js
.on('mouseover', function(d) {
  d3.select(this)
    .transition()
    .duration(50)
    .style('opacity', 0.5)
})
```
- notice how it is BEFORE the styling. I am selecting the element and THEN adding the transition and duration

[[↑] Back to top](#top)

**How do I add the cool bouncing bars in effect?**

```js
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
  .attr('height', 0) // initialize the height to 0
  .attr('y', height) // set y position to the height of the svg
  .attr('x', function(d) {
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

// Add a transition to the myChart variable and dynamically animate the bars
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
```

[[↑] Back to top](#top)

**How do I add a scale to the axes?**

- As a reminder, the `<g>` element is used to group SVG elements. To add an axis to your chart, you need to group your `<rect>` elements in a `<g>` element. And then you can add your axis

```js
// create the axis
var yAxisValues = d3.scaleLinear()
    .domain([0, d3.max(bardata)])
    .range([height, 0]) // Notice the range is reversed

var yAxisTicks = d3.axisLeft(yAxisValues).ticks(10) // 10 is the number of ticks you want

// add the axis to the chart - the transform is so that it actually shows up
var yGuide = d3.select('#viz svg').append('g')
    .attr('transform', 'translate(18,0)')
    .call(yAxisTicks)
```

[[↑] Back to top](#top)















## Appendix A: SVG

```html
<svg width="600" height="400" 
  style="background: #93A1A1">

  <line x1="0" y1="200" x2="600" y2="300"
    style="stroke: #268BD2; stroke-width: 40px" />

  <rect 
    x="200" y="100"
    width="200" height="200"
    style="fill: #CB4B19;"
    />
  
  <circle 
    cx="300" cy="200" r="50"
    style="fill: #840043"
  />

  <text 
    x="10" y="390"
    font-family="sans-serif"
    font-size="25"
    fill="white">Hello SVG</text>

  <g id="triangle">
    <polyline 
      points="10 35, 30 10, 50 35"
      style="fill: #F7B330"
    />
  </g>

  <use xlink:href="#triangle" x="30" y="0" />

</svg>
```

## Appendix B: Important References, Tutorials, Etc.

- [D3 API Reference Home](https://github.com/d3/d3/blob/master/API.md)