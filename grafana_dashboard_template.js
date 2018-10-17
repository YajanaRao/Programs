
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

// load data from php api
function getDataFromDB(hash) {
  var response;
  $.ajax({
    type: "GET",
    url: "http://localhost/config/grafana.php",
    async: false,
    data: {
      // id: '90'
      hash:hash
    },
    success: function(data){
      console.log(data);
      response = JSON.parse(data);
      console.log(response);
      // console.log(res);
      // response.push(res);
    },
    error: function(xhr,textStatus,errorThrown){
      console.log(xhr.reponseText);
    }
    // dataType: dataType
  });
  return response;
}

function addRow(){
  dashboard.rows.push({
    title: 'Chart',
    // height: '300px',
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
      // title: 'Panel title',
      type: 'text',
      gridPos: {
        h: 4,
        w: 24,
        x: 0,
        y: 0,
      },
      id:4,
      mode: "html",
      content: '<html><head><style>.company_name{color:green;}</style></head><body><div class="text-center" style="padding: 20px 0 0px 0;"><h1 style="line-height: 50px; margin: 0"><img src="https://s3.us-east-2.amazonaws.com/s3merahkee/Merahkee+Logo1.png" width="120px" style="padding: 0 20px; position: relative; top: -15px;"> <b class="company_name">'+title+'</b></h1></div></body></html>',
      transparent: true
  });
}

// panel with multiple queries
function ResponseTime(database,measurement,data) {
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
      query: 'SELECT  mean(ResponseTime) as "'+data[i]['region_name']+'" FROM '+measurement+' WHERE RegionName=~/'+data[i]['region_name']+'/ AND $timeFilter GROUP BY time([[aggregation]]s) fill(null)',
      rawQuery: true
    })
  }

  console.log(target[0]);
  dashboard.rows.push({
    title: 'Graph',
    // height: '300px',
    panels: [
      {
        collapsed: false,
        panels: [
          {
            title:  'Response Time in all the regions',
            type: 'graph',
            fill: 1,
            linewidth: 2,
            span: 12,
            pointradius: 2,
            points: true,
            datasource: database,
            targets: target,
            legend: {
              alignAsTable: true,
              avg: true,
              current: true,
              max: true,
              min: true,
              show: true,
              total: false,
              values: true
            },
          },
          {
            title:  "Response Time in each region",
            type: 'graph',
            fill: 1,
            linewidth: 2,
            span: 12,
            datasource: database,
            pointradius: 2,
            points: true,
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
                query: 'SELECT mean(ResponseTime) as MeanResponseTime FROM  '+measurement+' WHERE RegionName=~ /[[region]]/  AND SampleLabel=~ /[[sampleLabel]]/ AND $timeFilter GROUP BY time([[aggregation]]s) fill(null)',
                rawQuery: true,
              },
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
            query: 'SELECT percentile(ResponseTime, 90) FROM  '+measurement+' WHERE RegionName=~ /[[region]]/ AND SampleLabel=~ /[[sampleLabel]]/ AND  $timeFilter GROUP BY time([[aggregation]]s) fill(null)',
            rawQuery: true,
          },
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
            query: 'SELECT percentile(ResponseTime, 95) FROM  '+measurement+' WHERE RegionName=~ /[[region]]/ AND SampleLabel=~ /[[sampleLabel]]/ AND  $timeFilter GROUP BY time([[aggregation]]s) fill(null)',
            rawQuery: true,
          },
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
            query: 'SELECT percentile(ResponseTime, 99) FROM  '+measurement+' WHERE RegionName=~ /[[region]]/ AND SampleLabel=~ /[[sampleLabel]]/ AND  $timeFilter GROUP BY time([[aggregation]]s) fill(null)',
            rawQuery: true,
          },
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
            query: 'SELECT max(ResponseTime) FROM '+measurement+' WHERE RegionName=~ /[[region]]/ AND SampleLabel=~ /[[sampleLabel]]/ AND $timeFilter GROUP BY time([[aggregation]]s) fill(null)',
            rawQuery: true,
          }
        ],
      }

        ],
        title: "Response Time",
        type: "row"
      },
    ]
  });
}


// render dashboard from the template veriable and database
function jmeterLoadGraph(database,measurement){
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
      query: 'SELECT  count(ResponseTime)/[[aggregation]] as "'+data[i]['region_name']+'" FROM '+measurement+' WHERE RegionName=~/'+data[i]['region_name']+'/ AND $timeFilter GROUP BY time([[aggregation]]s) fill(null)',
      rawQuery: true
    })
  }
  dashboard.rows.push({
    title: 'Throughtput',
    // height: '300px',
    panels: [
      {
        collapsed: true,
        title: "Load",
        type: "row",
        panels: [
          {
            title:  'Throughtput in all the regions',
            type: 'graph',
            fill: 1,
            linewidth: 2,
            span: 12,
            datasource: database,
            targets: target,
            pointradius: 2,
            points: true,
            legend: {
              alignAsTable: true,
              avg: true,
              current: true,
              max: true,
              min: true,
              show: true,
              total: false,
              values: true
            },
          },
          {
            title:  "Throughtput in Each Region",
            type: 'graph',
            fill: 1,
            linewidth: 2,
            span: 12,
            datasource: database,
            pointradius: 2,
            points: true,
            fill: 5,
            legend: {
              alignAsTable: true,
              avg: true,
              current: true,
              max: true,
              min: true,
              show: true,
              total: false,
              values: true
            },
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
                query: "SELECT count(ResponseTime)/[[aggregation]]  FROM  "+measurement+" WHERE RegionName=~ /[[region]]/ AND $timeFilter GROUP BY time([[aggregation]]s) fill(null)",
                rawQuery: true,

              }
            ],
          }
        ],
      }
    ]
  });
}


// panel with multiple queries
function jmeterThroughputInAllRegion(database,measurement,data) {
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
      query: 'SELECT  count(ResponseTime)/[[aggregation]] as "'+data[i]['region_name']+'" FROM '+measurement+' WHERE RegionName=~/'+data[i]['region_name']+'/ AND $timeFilter GROUP BY time([[aggregation]]s) fill(null)',
      rawQuery: true
    })
  }

  console.log(target[0]);
  dashboard.rows.push({
    title: 'Graph',
    // height: '300px',
    panels: [
      {
        title:  'Throughtput in all the regions',
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

// telegraf cpu usage graph
function telegrafCPUUsage(){
  dashboard.rows.push({
    title: 'Telegraf Panel',
    // height: '300px',
    panels: [
    {
      collapsed: false,
      panels: [],
      title: "CPU Usage",
      type: "row"
    },  
      {
        title:  'CPU Usage',
        type: 'graph',
        // gridPos: {
        //   x: 0,
        //   y: 4,
        //   w: 12,
        //   h: 10
        // },
        fill: 1,
        linewidth: 2,
        span: 12,
        datasource: 'telegraf',
        legend: {
          alignAsTable: true,
          avg: true,
          current: true,
          max: true,
          min: true,
          show: true,
          total: true,
          values: true,
          rightSide: true
        },
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
            query: "SELECT mean(Percent_DPC_Time)as dpc, mean(Percent_Idle_Time)as Idle, mean(Percent_Interrupt_Time)as Interrupt, mean(Percent_Privileged_Time)as Privileged, mean(Percent_Processor_Time)as Processor, mean(Percent_User_Time)as user_usage FROM win_cpu WHERE time> now() -60m AND  ip='[[server]]' AND  $timeFilter GROUP BY time($interval) fill(previous)",
            rawQuery: true,
          }
        ],

      }
    ]

  });
}

function telegrafMultipanel(){
  dashboard.rows.push({
    title: 'telegraf',
    panels: [
      {
        title:  'Network Usage',
        type: 'graph',
        linewidth: 2,
        gridPos: {
          x: 12,
          y: 4,
          w: 12,
          h: 10
        },
        fill: 1,
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
            query: "SELECT non_negative_derivative(mean(Bytes_Received_persec),1s)*8 FROM win_net WHERE ip='[[server]]' AND $timeFilter GROUP BY time($interval), * fill(none)",
            rawQuery: true
          },
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
            query: "SELECT non_negative_derivative(mean(Bytes_Sent_persec),1s)*8 FROM win_net WHERE ip='[[server]]' AND $timeFilter GROUP BY time($interval), * fill(none)",
            rawQuery: true
          }
        ]

      },
      {
        title:  'Memory Usage',
        type: 'graph',
        linewidth: 2,
        gridPos: {
          x: 12,
          y: 4,
          w: 12,
          h: 10
        },
        fill: 1,
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
            query: "SELECT mean(Available_Bytes)as Availabele, mean(Cache_Faults_persec)as cache_falults, mean(Demand_Zero_Faults_persec)as demand_zero, mean(Page_Faults_persec)as PageFaults, mean(Pages_persec)as pages_persec, mean(Standby_Cache_Reserve_Bytes)as standby_cache_reserve_bytes from win_mem WHERE time> now() -1h AND  ip='[[server]]' AND  $timeFilter GROUP BY time(1m) fill(previous)",
            rawQuery: true,

          }
        ],
      },
      {
        title:  'Disk Usage',
        type: 'graph',
        fill: 1,
        linewidth: 2,
        gridPos: {
          x: 12,
          y: 4,
          w: 12,
          h: 10
        },
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
            query: "SELECT mean(Free_Megabytes)as Free, mean(Percent_Idle_Time)as Idle, mean(Percent_Free_Space)as Percent_Free_Space FROM win_disk WHERE time> now() -60m AND  ip='[[server]]' AND  $timeFilter GROUP BY time(1m) fill(previous)",
            rawQuery: true,

          }
        ],
      },
    ],
  });
}

// panel with multiple queries
function telegrafNetworkGraph() {
  dashboard.rows.push({
    title: 'Chart',
    // height: '300px',
    panels: [
      {
        title:  'Network Usage',
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
            query: "SELECT non_negative_derivative(mean(Bytes_Received_persec),1s)*8 FROM win_net WHERE ip='[[server]]' AND $timeFilter GROUP BY time($interval), * fill(none)",
            rawQuery: true
          },
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
            query: "SELECT non_negative_derivative(mean(Bytes_Sent_persec),1s)*8 FROM win_net WHERE ip='[[server]]' AND $timeFilter GROUP BY time($interval), * fill(none)",
            rawQuery: true
          }
        ],

      }
    ]
  });
}

// panel with single query by taking query value as a parameter
function telegrafMemoryGraph() {
  dashboard.rows.push({
    title: 'Chart',
    // height: '300px',
    panels: [
      {
        title:  'Memory Usage',
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
            query: "SELECT mean(Available_Bytes)as Availabele, mean(Cache_Faults_persec)as cache_falults, mean(Demand_Zero_Faults_persec)as demand_zero, mean(Page_Faults_persec)as PageFaults, mean(Pages_persec)as pages_persec, mean(Standby_Cache_Reserve_Bytes)as standby_cache_reserve_bytes from win_mem WHERE time> now() -1h AND  ip='[[server]]' AND  $timeFilter GROUP BY time(1m) fill(previous)",
            rawQuery: true,

          }
        ],

      }
    ]
  });
}

function telegrafDiskGraph() {
  dashboard.rows.push({
    title: 'Chart',
    // height: '300px',
    panels: [
      {
        title:  'Disk Usage',
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
            query: "SELECT mean(Free_Megabytes)as Free, mean(Percent_Idle_Time)as Idle, mean(Percent_Free_Space)as Percent_Free_Space FROM win_disk WHERE time> now() -60m AND  ip='[[server]]' AND  $timeFilter GROUP BY time(1m) fill(previous)",
            rawQuery: true,

          }
        ],
      }
    ]
  });
}

function importDatasource(name){
  console.log("Started importing "+name);
    $.ajax({
      url: "http://18.218.201.124:81/config/grafana.php",
      type: "GET",
      async: false,
      data: {
        // id: '90'
        db:name
      },
      success: function(data){
        console.log(data);
        // console.log(res);
        // response.push(res);
      },
      error: function(xhr,textStatus,errorThrown){
        console.log(xhr.reponseText);
      }
      // dataType: dataType
    });
  // var data={
  //   "name":name,
  //   "type":"influxdb",
  //   "url":"http://18.222.109.148:8086",
  //   "access":"Server (Default)",
  //   "password":"admin",
  //   "user":"admin",
  //   "database":name,
  //   "basicAuth":false
  // }

  // var url='http://admin:admin@18.222.109.148:3000/api/datasources';
  // $.ajax({
  //   type: "POST",
  //   url: url,
  //   data: data,
  //   success: function(msg){
  //     console.log(msg);
  //   },
  //   error: function(xhr,textStatus,errorThrown){
  //     console.log(xhr.reponseText);
  //   }
  //   // dataType: dataType
  // });
}

function listDataSource(){
  var url='http://admin:admin@18.220.15.61:3000/api/datasources';
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
  console.log("datasource name "+name);
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

// panels arranged 
function singleStat(database){
  dashboard.rows.push(
    {
      title: 'Chart',
      height: '300px',
      panels: [
        {
          collapsed: true,
          panels: [
                    {
                      cacheTimeout: null,
                      colorBackground: false,
                      colorValue: false,
                      colors: [
                        "rgba(50, 172, 45, 0.97)",
                        "rgba(237, 129, 40, 0.89)",
                        "rgba(245, 54, 54, 0.9)"
                      ],
                      datasource: 'telegraf',
                      editable: true,
                      error: false,
                      format: 'percent',
                      gauge: {
                        maxValue: 100,
                        minValue: 0,
                        show: true,
                        thresholdLabels: false,
                        thresholdMarkers: true
                      },
                      gridPos: {
                        x: 0,
                        y: 5,
                        w: 12,
                        h: 5
                      },
                      height: 180,
                      interval: null,
                      links: [],
                      mappingType: 1,
                      mappingTypes: [
                        {
                          name: 'value to text',
                          value: 1
                        },
                        {
                          name: 'range to text',
                          value: 2
                        }
                      ],
                      maxDataPoints: 100,
                      nullPointMode: 'connected',
                      nullText: null,
                      postfixFontSize: '50%',
                      prefixFontSize: '50%',
                      rangeMaps: [
                        {
                          from: null,
                          text: 'N/A',
                          to: null
                        }
                      ],
                      sparkline: {
                        fillColor: 'rgba(31, 118, 189, 0.18)',
                        full: false,
                        lineColor: 'rgb(31, 120, 193)',
                        show: false
                      },
                      targets: [
                        {
                          groupBy: [
                            {
                              params: [
                                '$__interval'
                              ],
                              type: 'time'
                            },
                            {
                              params: [
                                null
                              ],
                              type: 'fill'
                            }
                          ],
                          measurement: 'cpu',
                          orderByTime: 'ASC',
                          policy: 'default',
                          refId: 'A',
                          resultFormat: 'time_series',
                          select: [
                              [
                                {
                                  params: [
                                    "usage_idle"
                                  ],
                                  type: "field"
                                },
                                {
                                  params: [],
                                  type: "last"
                                },
                                {
                                  params: [
                                    "* -1 + 100"
                                  ],
                                  type: "math"
                                }
                              ]
                          ],
                          tags: [
                            {
                              key: "host",
                              operator: "=~",
                              value: "/^$server$/"
                            },
                            {
                              condition: "AND",
                              key: "cpu",
                              operator: "=",
                              value: "cpu-total"
                            }
                          ],
                          query: " SELECT last(Percent_Idle_Time) * -1 + 100 FROM win_cpu WHERE ip='[[server]]' AND $timeFilter GROUP BY time($interval) fill(null)",
                          rawQuery: true,
                        }
                      ],
                      thresholds: "70,80,90",
                      title: 'CPU Usage',
                      tooltip: {
                        shared: true
                      },
                      transparent: true,
                      type: 'singlestat',
                      valueFontSize: '80%',
                      valueMaps: [
                        {
                          op: "=",
                          text: 'N/A',
                          value: null
                        }
                      ],
                      valueName: 'current'
                    },
                    {
                      cacheTimeout: null,
                      colorBackground: false,
                      colorValue: false,
                      colors: [
                        "rgba(50, 172, 45, 0.97)",
                        "rgba(237, 129, 40, 0.89)",
                        "rgba(245, 54, 54, 0.9)"
                      ],
                      datasource: database,
                      editable: true,
                      error: false,
                      format: 'percent',
                      gauge: {
                        maxValue: 100,
                        minValue: 0,
                        show: true,
                        thresholdLabels: false,
                        thresholdMarkers: true
                      },
                     gridPos: {
                        x: 12,
                        y: 5,
                        w: 12,
                        h: 5
                      },
                      height: 180,
                      // id: 12,
                      interval: null,
                      links: [],
                      mappingType: 1,
                      mappingTypes: [
                        {
                          name: 'value to text',
                          value: 1
                        },
                        {
                          name: 'range to text',
                          value: 2
                        }
                      ],
                      maxDataPoints: 100,
                      nullPointMode: 'connected',
                      nullText: null,
                      // postfix: ,
                      postfixFontSize: '50%',
                      // prefix: ,
                      prefixFontSize: '50%',
                      rangeMaps: [
                        {
                          from: null,
                          text: 'N/A',
                          to: null
                        }
                      ],
                      sparkline: {
                        fillColor: 'rgba(31, 118, 189, 0.18)',
                        full: false,
                        lineColor: 'rgb(31, 120, 193)',
                        show: false
                      },
                      // tableColumn: ,
                      targets: [
                        {
                          groupBy: [
                            {
                              params: [
                                '$__interval'
                              ],
                              type: 'time'
                            },
                            {
                              params: [
                                null
                              ],
                              type: 'fill'
                            }
                          ],
                          measurement: 'cpu',
                          orderByTime: 'ASC',
                          policy: 'default',
                          refId: 'A',
                          resultFormat: 'time_series',
                          select: [
                            [
                              {
                                params: [
                                  "finishedThreads"
                                ],
                                type: "field"
                              }
                            ]
                          ],
                          tags: [],
                          query: 'SELECT 1 - sum("errorCount")/count("responseTime") FROM "requestsRaw" WHERE $timeFilter',
                          rawQuery: true,
                        }
                      ],
                      thresholds: "70,80,90",
                      title: 'Error Rate',
                      tooltip: {
                        shared: true
                      },
                      transparent: true,
                      type: 'singlestat',
                      valueFontSize: '80%',
                      valueMaps: [
                        {
                          op: "=",
                          text: 'N/A',
                          value: null
                        }
                      ],
                      valueName: 'current'
                    }
          ],
          title: "System",
          type: "row"
        },
      ]
    }
  );
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
function addTemplating(database,measurement,data){
  var options = [];
  var region = [];
  console.log("templating data "+data);
  for (var i = 0; i < data.length; i++){
    console.log(data[i]['region_name']);
    region.push(data[i]['region_name']);
    // console.log(typeof data[i]['region_name']);
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
  console.log(region);
  console.log(options);
  dashboard.templating = {
    list: [
      // {
      //   name: 'fields',
      //   label: 'Single field',
      //   query: 'show field keys from '+measurement,
      //   refresh: 1,
      //   type: 'query',
      //   datasource: database,
      //   hide: 0,
      // },
      // {
      //   name: 'region',
      //   label: 'Region',
      //   query: 'SHOW TAG VALUES FROM '+measurement+' WITH KEY = RegionName',
      //   refresh: 1,
      //   type: 'query',
      //   datasource: database,
      //   hide: 0,
      // },
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
        current: {
          selected: true,
          text: 10,
          value: 10
        },
        name: 'aggregation',
        label: 'Aggregation',
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
// var data = getDataFromDB();
// console.log(data);
if(!_.isUndefined(ARGS.hash)) {
  if(localStorage.getItem(ARGS.hash) === null){
    var data = getDataFromDB(ARGS.hash);
    console.log("Data from db"+data);
    importDatasource(data['company']);
    localStorage.setItem(ARGS.hash,JSON.stringify(data));
  }else{
    var data =  JSON.parse(localStorage.getItem(ARGS.hash));
    console.log(JSON.stringify(data));
  }
}


// telegrafNetworkGraph();
// telegrafDiskGraph();

// telegrafMemoryGraph();
if(data != null) {
  dynamicPanel(data['company']);
  console.log(data['company']);
   singleStat(data['company']);
   telegrafCPUUsage();
   ResponseTime(data['company'],data['project'],data['region'])
   telegrafMultipanel();
   addTemplating(data['company'],data['project'],data['region']);
   // jmeterLoadInAllRegion(data['company'],data['project'],data['region']);
   jmeterLoadGraph(data['company'],data['project']);

}else{
  dynamicPanel("Nothing found")
}

return dashboard;
