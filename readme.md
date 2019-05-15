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


## Working with Data













## FAQ

**How do I draw the SVG container for the chart?**

```js
d3.select('#viz')
  .append('svg')
  .attr('width', 600)
  .attr('height', 400)
  .style('background', '#f7f7f7')
```

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

**How do we make our chart scale with the data?**

- We need to create a scale. There are a number of different kinds of scales but for a simple bar chart, we need `scaleLinear()` from D3.
- The process itself is pretty simple:
  - create a variable equal to `d3.scaleLinear()`
  - set the domain
  - set the range
  - *there could be other parts but this will take care of the biggest items I need to worry about*
- Here is that in code:

```js
var yScale = d3.scaleLinear()
    .domain([0, d3.max(bardata)])
    .range([0, height])
```
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

