# D3 Practice

Using python server:

```sh
python -m http.server 8000
```

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
  - `rect`
  - `circle`
  - `line`
  - `polyline`
  - `text`
  - see [Appendix A](#appendix-1-svg) for a few examples



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