/* global _ */

/*
 * Complex scripted dashboard
 * This script generates a dashboard object that Grafana can load. It also takes a number of user
 * supplied URL parameters (in the ARGS variable)
 *
 * Return a dashboard object, or a function
 *
 * For async scripts, return a function, this function must take a single callback function as argument,
 * call this callback function with the dashboard object (look at scripted_async.js for an example)
 */


'use strict';

// accessible variables in this scope
var window, document, ARGS, $, jQuery, moment, kbn;

// Setup some variables
var dashboard;

// methods
function addRow(){
  dashboard.rows.push({
    title: 'Chart',
    height: '300px',
    panels: [
      {
        title: 'Events',
        type: 'graph',
        span: 12,
        fill: 1,
        linewidth: 2,
        targets: [
          {
            'target': "randomWalk('" + seriesName + "')"
          },
          {
            'target': "randomWalk('random walk2')"
          }
        ],
        seriesOverrides: [
          {
            alias: '/random/',
            yaxis: 2,
            fill: 0,
            linewidth: 5
          }
        ],
        tooltip: {
          shared: true
        }
      }
    ]
  });
}

function dynamicPanel(title){
  dashboard.panels.push({
      title: 'Panel title',
      type: 'text',
      gridPos: {
        h: 2,
        w: 24,
        x: 0,
        y: 0,
      },
      id:4,
      mode: "markdown",
      content: "# "+title,
  });
}

function datasourcePanel(database,measurement) {
  dashboard.rows.push({
    title: 'Chart',
    height: '300px',
    panels: [
      {
        title: 'INFLUXD',
        type: 'graph',
        fill: 1,
        linewidth: 2,
        span: 12,
        datasource: database,
        targets: [
          {
            groupBy: [
              {
                params:[
                  '10'
                ],
                type: "time"
              },
              {
                params: [
                  null
                ],
                type: "fill"
              }
            ],
            resultFormat: "time_series",
            tags: [],
            select:[
              [
                {
                  type: "field",
                  params: [
                    "value"
                  ]
                },
                {
                  type: "mean",
                  params:[]
                }
              ]
            ],
            query: "SELECT cpu FROM "+measurement,
            rawQuery: true
          }
        ],

      }
    ]
  });
}

// All url parameters are available via the ARGS object
var ARGS;

// Initialize a skeleton with nothing but a rows array and service object
dashboard = {
  rows : [],
  panels: [],
};

var title = 'Scripted dashboard';

if(!_.isUndefined(ARGS.title)){
  console.log(ARGS.title);
  title = ARGS.title;
}

// Set a title
dashboard.title = title;

// Set default time
// time can be overridden in the url using from/to parameters, but this is
// handled automatically in grafana core during dashboard initialization
dashboard.time = {
  from: "now-6h",
  to: "now"
};

// dashboard.templating = {
//   list: [
//     {
//       name: 'test',
//       query: 'SELECT * FROM system',
//       refresh: 1,
//       type: 'query',
//       datasource: "Perftool",
//       hide: 2,
//     },
//     {
//       name: 'test2',
//       query: '*',
//       refresh: 1,
//       type: 'query',
//       datasource: null,
//       hide: 2,
//     }
//   ]
// };


var rows = 1;
var seriesName = 'argName';

if(!_.isUndefined(ARGS.rows)) {
  console.log(ARGS.rows);
  rows = parseInt(ARGS.rows, 10);
}

if(!_.isUndefined(ARGS.name)) {
  seriesName = ARGS.name;
}

if(!_.isUndefined(ARGS.company)) {
   dynamicPanel(ARGS.company);
   if(!_.isUndefined(ARGS.project))
   datasourcePanel(ARGS.company,ARGS.project);
}

console.log(dashboard);

for (var i = 0; i < rows; i++) {
  addRow();
}







return dashboard;
