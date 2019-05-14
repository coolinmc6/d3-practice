d3.select('#viz')
  .append('svg')
  .attr('width', 600)
  .attr('height', 400)
  .style('background', '#f7f7f7')

  .append('rect')
  .attr('x', 200)
  .attr('y', 100)
  .attr('height', 200)
  .attr('width', 200)
  .style('fill', '#ff9900')

  
d3.select('#viz svg')
  .append('rect')
  .attr('x', 0)
  .attr('y', 200)
  .attr('height', 50)
  .attr('width', 50)
  .style('fill', '#ff9900');

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




var practiceData = [  
    {  
       "qMatrix":[  
          [  
             {  
                "qText":"Line 1",
                "qNum":"NaN",
                "qElemNumber":0,
                "qState":"O"
             },
             {  
                "qText":"NULL",
                "qNum":"NaN",
                "qElemNumber":3,
                "qState":"O",
                "qAttrDims":{  
                   "qValues":[  
                      {  
                         "qText":"NULL",
                         "qElemNo":3
                      }
                   ]
                }
             },
             {  
                "qText":"2",
                "qNum":1.9696702326184001,
                "qElemNumber":0,
                "qState":"L"
             }
          ],
          [  
             {  
                "qText":"Line 1",
                "qNum":"NaN",
                "qElemNumber":0,
                "qState":"O"
             },
             {  
                "qText":"Shift 1",
                "qNum":"NaN",
                "qElemNumber":0,
                "qState":"O",
                "qAttrDims":{  
                   "qValues":[  
                      {  
                         "qText":"Shift 1",
                         "qElemNo":0
                      }
                   ]
                }
             },
             {  
                "qText":"107,333",
                "qNum":107333.30907657198,
                "qElemNumber":0,
                "qState":"L"
             }
          ],
          [  
             {  
                "qText":"Line 1",
                "qNum":"NaN",
                "qElemNumber":0,
                "qState":"O"
             },
             {  
                "qText":"Shift 2",
                "qNum":"NaN",
                "qElemNumber":1,
                "qState":"O",
                "qAttrDims":{  
                   "qValues":[  
                      {  
                         "qText":"Shift 2",
                         "qElemNo":1
                      }
                   ]
                }
             },
             {  
                "qText":"68,965",
                "qNum":68965.35317705534,
                "qElemNumber":0,
                "qState":"L"
             }
          ],
          [  
             {  
                "qText":"Line 1",
                "qNum":"NaN",
                "qElemNumber":0,
                "qState":"O"
             },
             {  
                "qText":"Shift 3",
                "qNum":"NaN",
                "qElemNumber":2,
                "qState":"O",
                "qAttrDims":{  
                   "qValues":[  
                      {  
                         "qText":"Shift 3",
                         "qElemNo":2
                      }
                   ]
                }
             },
             {  
                "qText":"45,293",
                "qNum":45293.078826970086,
                "qElemNumber":0,
                "qState":"L"
             }
          ],
          [  
             {  
                "qText":"Line 1",
                "qNum":"NaN",
                "qElemNumber":0,
                "qState":"O"
             },
             {  
                "qText":"Shift 4",
                "qNum":"NaN",
                "qElemNumber":4,
                "qState":"O",
                "qAttrDims":{  
                   "qValues":[  
                      {  
                         "qText":"Shift 4",
                         "qElemNo":4
                      }
                   ]
                }
             },
             {  
                "qText":"1,207",
                "qNum":1207.0089346358338,
                "qElemNumber":0,
                "qState":"L"
             }
          ],
          [  
             {  
                "qText":"Line 2",
                "qNum":"NaN",
                "qElemNumber":1,
                "qState":"O"
             },
             {  
                "qText":"NULL",
                "qNum":"NaN",
                "qElemNumber":3,
                "qState":"O",
                "qAttrDims":{  
                   "qValues":[  
                      {  
                         "qText":"NULL",
                         "qElemNo":3
                      }
                   ]
                }
             },
             {  
                "qText":"0",
                "qNum":0.09198220785000004,
                "qElemNumber":0,
                "qState":"L"
             }
          ],
          [  
             {  
                "qText":"Line 2",
                "qNum":"NaN",
                "qElemNumber":1,
                "qState":"O"
             },
             {  
                "qText":"Shift 1",
                "qNum":"NaN",
                "qElemNumber":0,
                "qState":"O",
                "qAttrDims":{  
                   "qValues":[  
                      {  
                         "qText":"Shift 1",
                         "qElemNo":0
                      }
                   ]
                }
             },
             {  
                "qText":"114,186",
                "qNum":114185.98593476972,
                "qElemNumber":0,
                "qState":"L"
             }
          ],
          [  
             {  
                "qText":"Line 2",
                "qNum":"NaN",
                "qElemNumber":1,
                "qState":"O"
             },
             {  
                "qText":"Shift 2",
                "qNum":"NaN",
                "qElemNumber":1,
                "qState":"O",
                "qAttrDims":{  
                   "qValues":[  
                      {  
                         "qText":"Shift 2",
                         "qElemNo":1
                      }
                   ]
                }
             },
             {  
                "qText":"97,825",
                "qNum":97825.23752954592,
                "qElemNumber":0,
                "qState":"L"
             }
          ],
          [  
             {  
                "qText":"Line 2",
                "qNum":"NaN",
                "qElemNumber":1,
                "qState":"O"
             },
             {  
                "qText":"Shift 3",
                "qNum":"NaN",
                "qElemNumber":2,
                "qState":"O",
                "qAttrDims":{  
                   "qValues":[  
                      {  
                         "qText":"Shift 3",
                         "qElemNo":2
                      }
                   ]
                }
             },
             {  
                "qText":"108,214",
                "qNum":108214.06727832694,
                "qElemNumber":0,
                "qState":"L"
             }
          ],
          [  
             {  
                "qText":"Line 3",
                "qNum":"NaN",
                "qElemNumber":2,
                "qState":"O"
             },
             {  
                "qText":"Shift 1",
                "qNum":"NaN",
                "qElemNumber":0,
                "qState":"O",
                "qAttrDims":{  
                   "qValues":[  
                      {  
                         "qText":"Shift 1",
                         "qElemNo":0
                      }
                   ]
                }
             },
             {  
                "qText":"5,674",
                "qNum":5674.263961980945,
                "qElemNumber":0,
                "qState":"L"
             }
          ],
          [  
             {  
                "qText":"Line 3",
                "qNum":"NaN",
                "qElemNumber":2,
                "qState":"O"
             },
             {  
                "qText":"Shift 2",
                "qNum":"NaN",
                "qElemNumber":1,
                "qState":"O",
                "qAttrDims":{  
                   "qValues":[  
                      {  
                         "qText":"Shift 2",
                         "qElemNo":1
                      }
                   ]
                }
             },
             {  
                "qText":"5,810",
                "qNum":5809.95369657921,
                "qElemNumber":0,
                "qState":"L"
             }
          ],
          [  
             {  
                "qText":"Line 3",
                "qNum":"NaN",
                "qElemNumber":2,
                "qState":"O"
             },
             {  
                "qText":"Shift 3",
                "qNum":"NaN",
                "qElemNumber":2,
                "qState":"O",
                "qAttrDims":{  
                   "qValues":[  
                      {  
                         "qText":"Shift 3",
                         "qElemNo":2
                      }
                   ]
                }
             },
             {  
                "qText":"2,147",
                "qNum":2146.7429466652047,
                "qElemNumber":0,
                "qState":"L"
             }
          ]
       ],
       "qTails":[  
          {  
             "qUp":0,
             "qDown":0
          },
          {  
             "qUp":0,
             "qDown":0
          }
       ],
       "qArea":{  
          "qLeft":0,
          "qTop":0,
          "qWidth":3,
          "qHeight":12
       }
    }
 ]