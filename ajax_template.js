
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

// to query data from mysql using ajax
function getDataFromDB() {
  var response;
  $.ajax({
    type: "GET",
    url: "http://localhost/grafana/grafana.php",
    async: false,
    data: {
      id: '8'
    },
    success: function(data){
      response = JSON.parse(data);
      console.log(response);
    },
    error: function(xhr,textStatus,errorThrown){
      console.log(xhr.reponseText);
    }
  });
  return response;
}


// dynamically adding panels to the dashboard
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

// Adding text panel
function dynamicPanel(title){
  dashboard.panels.push({
      type: 'text',
      gridPos: {
        h: 4,
        w: 24,
        x: 0,
        y: 0,
      },
      id:4,
      mode: "html",
      content: '<html><head><style>.company_name{color:green;}</style></head><body><div class="text-center" style="padding: 20px 0 0px 0;"><h2 style="line-height: 50px; margin: 0"><img src="https://s3.us-east-2.amazonaws.com/s3merahkee/Merahkee+Logo1.png" width="120px" style="padding: 0 20px; position: relative; top: -15px;"> <b class="company_name">'+title+'</b></h2></div></body></html>'
  });
}

// panel with multiple queries
function datasourceMultiPanel(database,measurement,data) {

  // var data = data[0]
  console.log(data);
  var target = []
  for (var i = 0; i < data.length; i++){
    console.log(data[i]['region_name']);
    target.push({
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
      query: 'SELECT  ResponseTime as "'+data[i]['region_name']+'" FROM '+measurement+' WHERE RegionName=~/'+data[i]['region_name']+'/',
      rawQuery: true
    })
  }

  console.log(target[0]);
  dashboard.rows.push({
    title: 'Graph',
    height: '300px',
    panels: [
      {
        title:  'Load in all the regions',
        type: 'graph',
        fill: 1,
        linewidth: 2,
        span: 12,
        datasource: database,
        targets: target,
      }
    ]
  });
}

// panel with single query by taking query value as a parameter
function datasourcePanel(database,measurement,value) {
  dashboard.rows.push({
    title: 'Chart',
    height: '300px',
    panels: [
      {
        title:  value,
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
            query: "SELECT "+value+" FROM "+measurement,
            rawQuery: true,

          }
        ],

      }
    ]
  });
}

// render dashboard from the template veriable and database
function datasourcePanelFromTemplate(database,measurement){
  dashboard.rows.push({
    title: 'Chart',
    height: '300px',
    panels: [
      {
        title:  "Load in reach region",
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
            // filds values is query from template
            query: 'SELECT ResponseTime FROM '+measurement+' WHERE RegionName =~ /[[region]]/',
            rawQuery: true,

          }
        ],

      }
    ]
  });
}


// a panel from telegraf
function datasourcePanelFromTelegraf(){
  dashboard.rows.push({
    title: 'Chart',
    height: '300px',
    panels: [
      {
        title:  'cpu',
        type: 'graph',
        fill: 1,
        linewidth: 2,
        span: 12,
        datasource: 'telegraf',
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
            // filds values is query from template
            query: "SELECT mean(Percent_DPC_Time)as dpc, mean(Percent_Idle_Time)as Idle, mean(Percent_Interrupt_Time)as Interrupt, mean(Percent_Privileged_Time)as Privileged, mean(Percent_Processor_Time)as Processor, mean(Percent_User_Time)as user_usage FROM win_cpu WHERE time> now() -60m AND  ip='[[server]]' AND  $timeFilter GROUP BY time(1m) fill(previous)",
            rawQuery: true,

          }
        ],

      }
    ]
  });
}

// grafana api to import datasource
function importDatasource(name){
  console.log("Started importing");
  var data={
    "name":name,
    "type":"influxdb",
    "url":"http://localhost:8086",
    "access":"Server (Default)",
    "password":"admin",
    "user":"admin",
    "database":name,
    "basicAuth":false
  }

  var url='http://admin:admin@localhost:3000/api/datasources';
  $.ajax({
    type: "POST",
    url: url,
    data: data,
    success: function(msg){
      console.log(msg);
    },
    error: function(xhr,textStatus,errorThrown){
      console.log(xhr.reponseText);
    }
  });
}

function listDataSource(){
  var url='http://admin:admin@localhost:3000/api/datasources';
  var datasource;
  var response = $.ajax({
    type: "GET",
    url: url,
    async: false,
    success: function(msg){
       datasource = msg;
    },
    error: function(xhr,textStatus,errorThrown){
      console.log(xhr.reponseText);
    }
  });
   return datasource;
}

function isDataSourcePresent(name){
  var response = listDataSource();
  var isPresent = false;
  console.log(name);
  for(var i in response){
    if(name == response[i]['name']){
      console.log("Datasource present");
      isPresent = true;
    }
  }

  if(!isPresent){
    console.log("Importing datasource");
    importDatasource(name);
  }
}



// All url parameters are available via the ARGS object
var ARGS;

// Initialize a skeleton with nothing but a rows array and service object
dashboard = {
  rows : [],
  panels: [],
};

// default title of the dashboard
var title = 'Scripted dashboard';

// checking for new title
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
  from: "now-10m",
  to: "now"
};

// Adding variables from the database
function addTemplating(database,measurement){
  var options = [];
  var region = [];
  for (var i = 0; i < data.length; i++){
    region.push(data[i]['region_name']);
    if (i == 0){
      console.log("inside select");
      options.push({
        selected: true,
        text: data[i]['region_name'],
        value: data[i]['region_name']
      });
    }else{
      options.push({
        selected: false,
        text: data[i]['region_name'],
        value: data[i]['region_name']
      });
    }
  }
  console.log(options);
  dashboard.templating = {
    list: [
      {
        name: 'fields',
        label: 'Single field',
        query: 'show field keys from '+measurement,
        refresh: 1,
        type: 'query',
        datasource: database,
        hide: 0,
      },
      {
        current: {
          selected: true,
          text: data[0]['region_name'],
          value: data[0]['region_name']
        },
        name: 'region',
        label: 'Region',
        type: 'custom',
        options: options,
        query: region.join(),
      },
      {
        name: 'instanceIp',
        label: 'InstanceIP',
        query: 'SHOW TAG VALUES FROM '+measurement+' WITH KEY = InstanceIP WHERE RegionName =[[region]]',
        refresh: 1,
        type: 'query',
        datasource: database,
        hide: 0,
      },
      {
        name: 'sampleLabel',
        label: 'SampleLabel',
        query: 'SHOW TAG VALUES FROM '+measurement+' WITH KEY = SampleLabel',
        type: 'query',
        refresh: 1,
        datasource: database,
        hide: 0,
      },
      {
        name: 'server',
        label: 'Server',
        query: 'SHOW TAG VALUES FROM win_system WITH KEY=ip',
        type: 'query',
        refresh: 1,
        datasource: 'telegraf',
        hide: 0,
      },
      {
        name: 'Aggregation',
        label: 'aggregation',
        type: 'custom',
        options: [
          {
            selected: false,
            text: "1",
            value: "1"
          },
          {
            selected: true,
            text: "10",
            value: "10"
          },
          {
            selected: false,
            text: "30",
            value: "30"
          },
          {
            selected: false,
            text: "60",
            value: "60"
          },
          {
            selected: false,
            text: "600",
            value: "600"
          },
          {
            selected: false,
            text: "1800",
            value: "1800"
          },
          {
            selected: false,
            text: "3600",
            value: "3600"
          }
        ],
        query: "1,10,30,60,600,1800,3600",

      },

    ]
  };
}


// default values are set
var rows = 1;
var seriesName = 'argName';

var data = getDataFromDB();

// checking for user defined values
/* Removed the rows from dashboard as it looks childish to have multiple rows
without actually gaining anything */
if(!_.isUndefined(ARGS.rows)) {
  console.log(ARGS.rows);
  rows = parseInt(ARGS.rows, 10);
}

if(!_.isUndefined(ARGS.name)) {
  seriesName = ARGS.name;
}

datasourcePanelFromTelegraf()
var values = ["cpu","disk","memory"]


if(!_.isUndefined(ARGS.company)) {
  isDataSourcePresent(ARGS.company);
   dynamicPanel(ARGS.company);
   if(!_.isUndefined(ARGS.project)){
     addTemplating(ARGS.company,ARGS.project,data);
     datasourceMultiPanel(ARGS.company,ARGS.project,data);
     datasourcePanelFromTemplate(ARGS.company,ARGS.project);
     for (var i in values) {
            datasourcePanel(ARGS.company,ARGS.project,values[i]);
     }
}
}else{
  dynamicPanel("Nothing found")
}
console.log(dashboard);
return dashboard;
