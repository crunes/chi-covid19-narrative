// Links to the COVID-19 APIs
const dailyCasesDeaths = 'https://data.cityofchicago.org/resource/naz8-j4nc.json'
const dailyRateURL = 'https://data.cityofchicago.org/resource/e68t-c7fv.json'
const weeklyRateURL = 'https://data.cityofchicago.org/resource/yhhz-zm2v.json'
const dailyTestPerson = 'https://data.cityofchicago.org/resource/t4hh-4ku9.json'
const dailyTests = 'https://data.cityofchicago.org/resource/gkdw-2tgv.json'

// These should probably be in the CSS file
const chiBlue = 'rgba(65, 182, 230, 1)'
const chiRed = 'rgba(228, 0, 43, 1)'
const chiGrey= 'rgba(179, 179, 179, 1)'

const bahamaBlue='rgba(0, 91, 153, 1)'
const malibuBlue ='rgba(0, 117, 187, 1)'
const lochmaraBlue = 'rgba(0, 146, 209, 1)'
const cornflowerBlue = 'rgba(164, 213, 238, 1)'
const lakeMichigan = 'rgba(225, 243, 248, 1)'

const darkestRed = 'rgba(152, 27, 30, 1)'
const darkRed = 'rgba(204, 57, 62, 1)'
const lightRed = 'rgba(229, 147, 147, 1)'
const lightestRed = 'rgba(251, 217, 223, 1)'

const gold = 'rgba(253, 184, 30, 1)'
const goldLightest = 'rgba(255, 241, 210, 1)'
const greenLighter = 'rgba(148, 191, 162, 1)'

const grayDark = 'rgba(77, 77, 77, 1)'
const grayLight = 'rgba(179, 179, 179, 1)'
const grayLighter = 'rgba(217, 217, 217, 1)'
const grayLightest = 'rgba(241, 241, 241, 1)'

const white = 'rgba(0, 0, 0, 0)'

//Chart.defaults.scale.gridLines.drawOnChartArea = false;
// This creates the vertical line tooltip
// Source: https://stackoverflow.com/questions/45159895/moving-vertical-line-when-hovering-over-the-chart-using-chart-js
Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
 draw: function(ease) {
    Chart.controllers.line.prototype.draw.call(this, ease);

    if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
       var activePoint = this.chart.tooltip._active[0],
           ctx = this.chart.ctx,
           x = activePoint.tooltipPosition().x,
           topY = this.chart.legend.bottom,
           bottomY = this.chart.chartArea.bottom;

       // draw line
       ctx.save();
       ctx.beginPath();
       ctx.moveTo(x, topY);
       ctx.lineTo(x, bottomY);
       ctx.lineWidth = 2;
       ctx.strokeStyle = chiBlue;
       ctx.stroke();
       ctx.restore();
    }
  }
});

async function addLine(value, text, orientation, axis) {
  id++;
  var ln = {
    id: "line" + id,
    type: "line",
    mode: orientation,
    scaleID: axis,
    value: value,
    borderWidth: 2,
    borderColor: malibuBlue,
    label: {
      content: text,
      backgroundColor: malibuBlue,
      enabled: true,
      position: "top",
      yAdjust: 0,
      xAdjust: -140
    }
  };
  lines.push(ln);
  //console.log(lines)
}

var case_option = {
  title: {
    display: true,
    text: 'Case rate per 100,000 over time'
  },
  layout: {
    padding: 25
  },
  tooltips: {
    mode: 'index',
    intersect: false
  },
  elements: {
    point: {
      radius: 0
    }
  },
  scales: {
       xAxes: [{
         gridLines: {
            display: false,
            drawBorder: false,
          }
       }],
       yAxes: [{
          gridLines: {
            drawBorder: false,
            drawOnChartArea: true,
            color: chiGrey,
            borderDash: [2, 5]
           }
        }]
   }
};

var death_option = {
  title: {
    display: true,
    text: 'Deaths (total)'
  },
  layout: {
    padding: 25
  },
  tooltips: {
    mode: 'index',
    intersect: false
  },
  elements: {
    point: {
      radius: 0
    }
  },
  scales: {
       xAxes: [{
         gridLines: {
            display: false,
            drawBorder: false,
          }
       }],
       yAxes: [{
         stacked: true,
          gridLines: {
            drawBorder: false,
            drawOnChartArea: true,
            color: chiGrey,
            borderDash: [2, 5]
           }
        }]
   }
};

var lines = [], id = 0;
var linesOn = false;

async function getDeathData() {
  const response = await fetch(dailyCasesDeaths)
  const jsonfile = await response.json();

  // Sort the JSON file by date
  // Source: https://www.geeksforgeeks.org/sort-an-object-array-by-date-in-javascript/
  const sortedJSON = jsonfile.slice().sort((a, b) => a.lab_report_date > b.lab_report_date ? 1 : -1)
  console.log(sortedJSON)

  var labels = sortedJSON.map(function(row) {
    return new Date(row.lab_report_date);
  })

  var deaths_total = sortedJSON.map(function(row) {
    return row.deaths_total;
  })

  var deaths_latinx = sortedJSON.map(function(row) {
      return row.deaths_latinx;
    })

  var deaths_asian_non_latinx = sortedJSON.map(function(row) {
      return row.deaths_asian_non_latinx;
    })

  var deaths_black_non_latinx = sortedJSON.map(function(row) {
      return row.deaths_black_non_latinx;
    })

  var deaths_white_non_latinx = sortedJSON.map(function(row) {
      return row.deaths_white_non_latinx;
    })

  var deaths_other_non_latinx = sortedJSON.map(function(row) {
      return row.deaths_other_non_latinx;
    })

  var cumulative_deaths_total = [];
  var cumulative_deaths_latinx = [];
  var cumulative_deaths_asian_non_latinx = [];
  var cumulative_deaths_black_non_latinx = [];
  var cumulative_deaths_white_non_latinx = [];
  var cumulative_deaths_other_non_latinx = [];

  for (let i = 0; i < labels.length; i++) {
    //console.log(labels.length)
    if (i == 0) {
      cumulative_deaths_total.push(Number(deaths_total[i]))
      cumulative_deaths_latinx.push(Number(deaths_latinx[i]))
      cumulative_deaths_asian_non_latinx.push(Number(deaths_asian_non_latinx[i]))
      cumulative_deaths_black_non_latinx.push(Number(deaths_black_non_latinx[i]))
      cumulative_deaths_white_non_latinx.push(Number(deaths_white_non_latinx[i]))
      cumulative_deaths_other_non_latinx.push(Number(deaths_total[i]))

    } else {
      var prev = i-1
      cumulative_deaths_total.push(cumulative_deaths_total[prev] + Number(deaths_total[i]))
      cumulative_deaths_latinx.push(cumulative_deaths_latinx[prev] + Number(deaths_latinx[i]))
      cumulative_deaths_asian_non_latinx.push(cumulative_deaths_asian_non_latinx[prev] + Number(deaths_asian_non_latinx[i]))
      cumulative_deaths_black_non_latinx.push(cumulative_deaths_black_non_latinx[prev] + Number(deaths_black_non_latinx[i]))
      cumulative_deaths_white_non_latinx.push(cumulative_deaths_white_non_latinx[prev] + Number(deaths_white_non_latinx[i]))
      cumulative_deaths_other_non_latinx.push(cumulative_deaths_other_non_latinx[prev] + Number(deaths_other_non_latinx[i]))
    }
  };

  var rv_total = cumulative_deaths_total[cumulative_deaths_total.length - 1];
  var rv_latinx = cumulative_deaths_latinx[cumulative_deaths_latinx.length - 1];
  var rv_asian_non_latinx = cumulative_deaths_asian_non_latinx[cumulative_deaths_asian_non_latinx.length - 1];
  var rv_black_non_latinx = cumulative_deaths_black_non_latinx[cumulative_deaths_black_non_latinx.length - 1];
  var rv_white_non_latinx = cumulative_deaths_white_non_latinx[cumulative_deaths_white_non_latinx.length - 1];
  var rv_other_non_latinx = cumulative_deaths_other_non_latinx[cumulative_deaths_other_non_latinx.length - 1];

/*
  console.log( labels,
              deaths_total,
              deaths_latinx,
              deaths_asian_non_latinx,
              deaths_black_non_latinx,
              deaths_white_non_latinx,
              deaths_other_non_latinx,
              rv_total,
              rv_latinx,
              rv_asian_non_latinx,
              rv_black_non_latinx,
              rv_white_non_latinx,
              rv_other_non_latinx )
  */

  return { labels,
           deaths_total,
           deaths_latinx,
           deaths_asian_non_latinx,
           deaths_black_non_latinx,
           deaths_white_non_latinx,
           deaths_other_non_latinx,
           rv_total,
           rv_latinx,
           rv_asian_non_latinx,
           rv_black_non_latinx,
           rv_white_non_latinx,
           rv_other_non_latinx }
  }

async function getPctPos() {
  const response = await fetch(dailyTests);
  const jsonfile = await response.json();
  //console.log(jsonfile)

  var labels = jsonfile.map(function(row) {
    if (row.date) {
      return row.date.slice(5,10);
    }
  })

  var daily_pct_pos = jsonfile.map(function(row) {
    if (row.date) {
      return Number(row.percent_positive_tests) * 100
    }
  })

  // Calculate rolling average over 7-day window
  var avg_pct_pos = []
  for (i = 0; i < daily_pct_pos.length; i++) {
     if (i == 0) {
       avg_pct_pos.push(daily_pct_pos[i])
     } else if (i < 6) {
      avg_pct_pos.push((avg_pct_pos[i-1] + daily_pct_pos[i])/ i+1)
     } else {
       var total = daily_pct_pos.slice(i-6, i+1)
       var sum = total.reduce(function(a, b) {
         return a + b;
       })
       avg_pct_pos.push(sum / 7)
     }
  }

  //console.log(labels, avg_pct_pos)
  return { labels, avg_pct_pos }
}


async function getAvgCases() {
  const response = await fetch(dailyRateURL);
  const jsonfile = await response.json();

  var labels = jsonfile.map(function(row) {
      if (row.date) {
        return row.date.slice(5,10);
      }}
    );

  var caseRateTotal = jsonfile.map(function(row) {
      if (row.date) {
        return row.cases_rate_total;
    }}
    );

  var caseRate0_17 = jsonfile.map(function(row) {
      if (row.date) {
        return row.cases_rate_age_0_17;
      }}
    );

  var caseRate18_29 = jsonfile.map(function(row) {
      if (row.date) {
        return row.cases_rate_age_18_29;
      }}
    );

  var caseRate30_39 = jsonfile.map(function(row) {
      if (row.date) {
        return row.cases_rate_age_30_39;
      }}
    );

  var caseRate40_49 = jsonfile.map(function(row) {
      if (row.date) {
        return row.cases_rate_age_40_49;
      }}
    );

  var caseRate50_59 = jsonfile.map(function(row) {
      if (row.date) {
         return row.cases_rate_age_50_59;
      }}
    );

  var caseRate60_69 = jsonfile.map(function(row) {
      if (row.date) {
          return row.cases_rate_age_60_69;
      }}
    );

  var caseRate70_79 = jsonfile.map(function(row) {
      if (row.date) {
          return row.cases_rate_age_70_79;
      }}
    );

  var caseRate80 = jsonfile.map(function(row) {
      if (row.date) {
        return row.cases_rate_age_80;
      }}
    );

  //console.log(labels)
  return { labels,
           caseRateTotal,
           caseRate80,
           caseRate18_29,
           caseRate0_17,
           caseRate30_39,
           caseRate40_49,
           caseRate50_59,
           caseRate60_69,
           caseRate70_79 }

  }

async function chartDeaths() {
  const data = await getDeathData();
  const ctx = document.getElementById('deaths_by_race').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Black, non-Latinx', 'Latinx', 'White, non-Latinx', 'Asian, non-Latinx', 'Other, non-Latinx'],
      datasets: [{
          label: 'Cumulative deaths, by race and ethnicity',
          data: [data.rv_black_non_latinx, data.rv_latinx, data.rv_white_non_latinx, data.rv_asian_non_latinx, data.rv_other_non_latinx],
          fill: false,
          backgroundColor: [chiRed, chiRed, chiGrey, chiGrey, chiGrey],
          borderColor: [chiRed, chiRed, chiGrey, chiGrey, chiGrey],
          borderWidth: 1
        }
      ],
    options: {
      scales: {
        yAxes: {
          ticks: {
            beginAtZero: true
          }
        }
      }
    }
    }
  })
}

async function chartTests() {

  // Need to pull these numbers from APIs, not hard-code
  var totalTests = 526333
  var testsUnknown = 221584
  var testsByRaceCnt = [92744, 87284, 94068, 11011, 19642]
  var testsByRacePct = []
  for (i = 0; i < testsByRaceCnt.length; i++) {
    testsByRacePct.push((testsByRaceCnt[i] * 100)/(totalTests - testsUnknown))
  }

  var popByRacePct = [29.8, 29.0, 32.9, 6.7, (100-29.8-29.0-32.9-6.7)]
  //console.log(testsByRacePct)

  const ctx = document.getElementById('testing_parity').getContext('2d');

  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Black, non-Latinx', 'Latinx', 'White, non-Latinx', 'Asian, non-Latinx', 'Other, non-Latinx'],
      datasets: [{
        label: 'Proportion of test recipients, known race/ethnicity',
        data: testsByRacePct,
        fill: false,
        backgroundColor: malibuBlue,
        borderColor: malibuBlue,
        borderWidth: 1
      }, {
        label: 'Share of population',
        data: popByRacePct,
        fill: false,
        backgroundColor: chiGrey,
        borderColor: chiGrey,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: {
          ticks: {
            beginAtZero: true
          }
        }
      }
    }
  })
}

async function chartPctPos() {
  const data = await getPctPos();
  const ctx = document.getElementById('percent_positivity').getContext('2d');

  const chart = new Chart(ctx, {
    type: 'LineWithLine',
    data: {
      labels: data.labels.reverse(),
      datasets: [{
        label: 'Citywide',
        data: data.avg_pct_pos.reverse(),
        fill: false,
        backgroundColor: chiGrey,
        borderColor: chiGrey,
        borderWidth: 1
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Percent positivity (7-day rolling average) over time'
      },
      layout: {
        padding: 25
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      elements: {
        point: {
          radius: 0
        }
      },
      scales: {
           xAxes: [{
             gridLines: {
                display: false,
                drawBorder: false,
              }
           }],
           yAxes: [{
              gridLines: {
                drawBorder: false,
                drawOnChartArea: true,
                color: chiGrey,
                borderDash: [2, 5]
               }
             }]
           } /*,
      onHover: function(evt) {
        console.log("onHover", evt.type);
        if (evt.type == 'mousemove' && linesOn == false) {
          linesOn = true;
          percent_positivity.options.annotation.annotations = lines;
          percent_positivity.update();
        } else if (evt.type == 'mouseout' && linesOn == true) {
          linesOn = false;
          percent_positivity.options.annotation.annotations = [];
          percent_positivity.update();
        }
       },
        onClick: function(evt, chart) {
          var el = percent_positivity.getElementAtEvent(evt);
          console.log("onClick", el, evt);
       },
        annotation: {
          drawTime: "afterDraw",
          annotations: lines
        }*/
      }
    })
  };


async function chartTotal() {
  const data = await getAvgCases();
  const ctx = document.getElementById('chart1').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'LineWithLine',
    data: {
        labels: data.labels.reverse(),
        datasets: [{
            label: 'Citywide',
            data: data.caseRateTotal.reverse(),
            fill: false,
            backgroundColor: chiGrey,
            borderColor: chiGrey,
            borderWidth: 1
          }
        ]
      },
    options: case_option
  })
};

async function chart80PlusCases() {
  const data = await getAvgCases();

  const ctx = document.getElementById('chart2').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'LineWithLine',
    data: {
        labels: data.labels.reverse(),
        datasets: [{
            label: 'Citywide',
            data: data.caseRateTotal.reverse(),
            fill: false,
            backgroundColor: chiGrey,
            borderColor: chiGrey,
            borderWidth: 1
          }, {
            label: '80 years or older',
            data: data.caseRate80.reverse(),
            fill: false,
            backgroundColor: chiRed,
            borderColor: chiRed,
            borderWidth: 2
          }
        ]
      },
    options: case_option
    })
};

async function chartAllAgesCases() {
  const data = await getAvgCases();

  const ctx = document.getElementById('chart3').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'LineWithLine',
    data: {
        labels: data.labels.slice(0,60).reverse(),
        datasets: [{
            label: '18-29',
            data: data.caseRate18_29.slice(0,60).reverse(),
            fill: false,
            backgroundColor: chiRed,
            borderColor: chiRed,
            borderWidth: 3
          }, {
            label: '50-59 years',
            data: data.caseRate50_59.slice(0,60).reverse(),
            fill: false,
            backgroundColor: grayLightest,
            borderColor: grayLightest,
            borderWidth: 1
          }, {
            label: '60-69 years',
            data: data.caseRate40_49.slice(0,60).reverse(),
            fill: false,
            backgroundColor: grayLighter,
            borderColor: grayLighter,
            borderWidth: 1
          }, {
            label: '70-79 years',
            data: data.caseRate50_59.slice(0,60).reverse(),
            fill: false,
            backgroundColor: grayLight,
            borderColor: grayLight,
            borderWidth: 1
          }, {
            label: '80 years or older',
            data: data.caseRate80.slice(0,60).reverse(),
            fill: false,
            backgroundColor: grayDark,
            borderColor: grayDark,
            borderWidth: 1
          }
        ]
      },
      options: {
        title: {
          display: true,
        text: 'Case rate per 100,000 over time'
        },
        layout: {
          padding: 25
        },
        tooltips: {
          enabled: false
        },
        elements: {
          point: {
            radius: 0
          }
        },
        scales: {
             xAxes: [{
               id: 'x-axis',
               gridLines: {
                  display: false,
                  drawBorder: false,
                }
             }],
             yAxes: [{
                id: 'y-axis',
                gridLines: {
                  drawBorder: false,
                  drawOnChartArea: true,
                  color: chiGrey,
                  borderDash: [2, 5]
                 }
              }]
         },
         onHover: function(evt) {
           console.log("onHover", evt.type);
          if (evt.type == 'mousemove' && linesOn == false) {
             linesOn = true;
             chart3.options.annotation.annotations = lines;
             chart3.update();
          } else if (evt.type == 'mouseout' && linesOn == true) {
             linesOn = false;
             chart3.options.annotation.annotations = [];
             chart3.update();
          }
        },
        onClick: function(evt, chart) {
          var el = chart3.getElementAtEvent(evt);
          console.log("onClick", el, evt);
        },
        annotation: {
          drawTime: "afterDraw",
          annotations: lines
        }
    }
  })
};

/**
async function plotLineChart(dataSource, chartID) {
  /**
  * Plots a generic line chart using chart.js
  *
  * Inputs:
  * 	- dataSource (fn): function that imports data using API
  * 	- chartID (str): name of canvas e.g., 'chart1'
  *
  const data = await dataSource
  const ctx = document.getElementById(chartID).getContext('2d');

  const chart = new Chart(ctx, {
    type: 'LineWithLine'

  }
  )
}
*/

// Note: Need to abstract these functions...

async function start() {
  chartDeaths()
  chartTests()
  chartTotal()
  chart80PlusCases()
  addLine("06-26", "June 26: Chicago enters Phase IV of Reopening", "vertical", "x-axis")
  chartAllAgesCases() // Need to filter dates here
  chartPctPos()
  //addLine(5, "TK", "horizontal", "y-axis")
};

start();
