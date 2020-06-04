'use strict';
var window, document, ARGS, $, jQuery, moment, kbn;
var dashboard;
var ARGS;
dashboard = {
  rows : [],
  panels:[],

};
var fromtime="2018-10-23 09:00:00";
var totime="2018-10-23 09:15:00";
dashboard.title = 'Scripted dash';
dashboard.time = {
  from: ARGS.fromtime,
  to: ARGS.totime,
};
var rows = 1;
var seriesName = 'argName';
if(!_.isUndefined(ARGS.rows)) {
  rows = parseInt(ARGS.rows, 10);
}

if(!_.isUndefined(ARGS.name)) {
  seriesName = ARGS.name;
}

dashboard.panels.push
  (
    {
  type: 'text',

  gridPos: {
    x: 0,
    y: 0,
    w: 24,
    h: 4,
  },
        mode: "html",
        content: "<html><head><style>.company_name{color:green;}</style></head><body><div class=\"text-center\" style=\"padding: 20px 0 0px 0;\"><h2 style=\"line-height: 50px; margin: 0\"><img src=\"https://s3.us-east-2.amazonaws.com/s3merahkee/Merahkee+Logo1.png\" width=\"120px\" style=\"padding: 0 20px; position: relative; top: -15px;\"> <b class=\"company_name\">JMETER RESULTS AND TELEGRAF METRICS</b></h2></div></body></html>",
        tooltip: {
        shared: true
        },
        transparent:true,
  }
);



  dashboard.templating =  {

      list: [
        {
            allValue: null,
            current: {
            isNone: true,
            text: 'None',
            value: ''
          },
          datasource: 'datainflux4',
          hide: 0,
          includeAll: false,
          label: 'TestID',
          multi: false,
          name: 'tsetid',
          options: [],
          query: 'SHOW TAG VALUES FROM "usertable" WITH KEY = "TestID"',
          refresh: 1,
          regex: '',
          sort: 0,
          tagValuesQuery: null,
          tags: [],
          tagsQuery: null,
          type: 'query',
          useTags: false
        },
        {
            allValue: null,
            current: {
            isNone: true,
            text: 'None',
            value: ''
          },
          datasource: 'datainflux4',
          hide: 0,
          includeAll: false,
          label: 'Regions',
          multi: false,
          name: 'regions',
          options: [],
          query: 'SHOW TAG VALUES FROM "usertable" WITH KEY = "RegionName"',
          refresh: 1,
          regex: '',
          sort: 0,
          tagValuesQuery: null,
          tags: [],
          tagsQuery: null,
          type: 'query',
          useTags: false
        },
        {
          allValue: null,
          auto: false,
          current: {
            tags: [],
            text: '1m',
            value: '60'
          },
          datasource: null,
          hide: 0,
          includeAll: false,
          label: 'Aggregation Interval',
          multi: false,
          name: 'aggregation',
          options: [
            {
              selected: false,
              text: '1s',
              value: '1'
            },
            {
              selected: false,
              text: '10s',
              value: '10'
            },
            {
              selected: false,
              text: '30s',
              value: '30'
            },
            {
              selected: true,
              text: '1m',
              value: '60'
            },
            {
              selected: false,
              text: '10m',
              value: '600'
            },
            {
              selected: false,
              text: '30m',
              value: '1800'
            },
            {
              selected: false,
              text: '1h',
              value: '3600'
            }
          ],
          query: '1,10,30,60,600,1800,3600',
          refresh: 0,
          type: 'custom'
        },
        {
            allValue: null,
            current: {
            isNone: true,
            text: 'None',
            value: ''
          },
          datasource: 'datainflux4',
          hide: 0,
          includeAll: false,
          label: 'SampleLabel',
          multi: false,
          name: 'samplelabels',
          options: [],
          query: 'SHOW TAG VALUES FROM "usertable" WITH KEY = "SampleLabel"',
          refresh: 1,
          regex: '',
          sort: 0,
          tagValuesQuery: null,
          tags: [],
          tagsQuery: null,
          type: 'query',
          useTags: false
        },
        {
            allValue: null,
            current: {
            isNone: true,
            text: 'None',
            value: ''
          },
          datasource: 'datainflux4',
          hide: 0,
          includeAll: false,
          label: 'TPName',
          multi: false,
          name: 'tpname',
          options: [],
          query: 'SHOW TAG VALUES FROM "usertable" WITH KEY = "TPName"',
          refresh: 1,
          regex: '',
          sort: 0,
          tagValuesQuery: null,
          tags: [],
          tagsQuery: null,
          type: 'query',
          useTags: false
        },
        {
            allValue: null,
            current: {
            isNone: true,
            text: 'None',
            value: ''
          },
          datasource: 'datainflux4',
          hide: 0,
          includeAll: false,
          label: 'InstanceIP',
          multi: false,
          name: 'instaceIP',
          options: [],
          query: 'SHOW TAG VALUES FROM "usertable" WITH KEY = "InstanceIP"',
          refresh: 1,
          regex: '',
          sort: 0,
          tagValuesQuery: null,
          tags: [],
          tagsQuery: null,
          type: 'query',
          useTags: false
        }

      ]
    }

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
'rgba(50, 172, 45, 0.97)',
'rgba(237, 129, 40, 0.89)',
'rgba(245, 54, 54, 0.9)'
],
datasource: 'datainflux3',
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
w: 8,
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
refId: 'A',
policy: 'default',
resultFormat: 'time_series',
orderByTime: 'ASC',
tags: [],
groupBy: [
{
  type: 'time',
  params: [
    '$__interval'
  ]
},
{
  type: 'fill',
  params: [
    'null'
  ]
}
],
select: [
[
  {
    type: 'field',
    params: [
      'value'
    ]
  },
  {
    type: 'mean',
    params: []
  }
]
],
query: 'SELECT 1 - sum("errorCount")/count("responseTime") FROM "requestsRaw" WHERE $timeFilter',
rawQuery: true
}
],
thresholds: '80,90',
title: 'Success Rate',
tooltip: {
shared: true
},
transparent: true,
type: 'singlestat',
valueFontSize: '80%',
valueMaps: [
{
op: '=',
text: 'N/A',
value: null
}
],
valueName: 'current',
id: 400,
prefix: '',
postfix: '',
tableColumn: ''
},
{
cacheTimeout: null,
colorBackground: false,
colorValue: false,
colors: [
'rgba(245, 54, 54, 0.9)',
'rgba(237, 129, 40, 0.89)',
'rgba(50, 172, 45, 0.97)'
],
datasource: 'datainflux3',
decimals: 0,
editable: true,
error: false,
format: 'none',
gauge: {
maxValue: 100,
minValue: 0,
show: false,
thresholdLabels: false,
thresholdMarkers: true
},
gridPos: {
h: 5,
w: 8,
x: 8,
y: 5
},
height: '120',
id: 20,
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
postfix: '',
postfixFontSize: '30%',
prefix: '',
prefixFontSize: '50%',
rangeMaps: [
{
from: 'null',
text: 'N/A',
to: 'null'
}
],
sparkline: {
fillColor: 'rgba(31, 118, 189, 0.18)',
full: false,
lineColor: 'rgb(31, 120, 193)',
show: false
},
tableColumn: '',
targets: [
{
dsType: 'influxdb',
groupBy: [],
measurement: 'requestsRaw',
policy: 'default',
query: 'SELECT  count("responseTime") FROM "requestsRaw"',
rawQuery: true,
refId: 'A',
resultFormat: 'time_series',
select: [
  [
    {
      params: [
        'finishedThreads'
      ],
      type: 'field'
    }
  ]
],
tags: [],
orderByTime: 'ASC'
}
],
thresholds: '',
title: 'Request Count',
transparent: true,
type: 'singlestat',
valueFontSize: '80%',
valueMaps: [
{
op: '=',
text: 'N/A',
value: 'null'
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
                    datasource:"datainflux3",
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
                      x: 16,
                      y: 5,
                      w: 8,
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
                  },

        ],
        title: "General",
        type: "row"
      },
    ]
  }
);

dashboard.rows.push(
  {
    panels:[
      {
        gridPos: {
          x: 0,
          y: 10,
          w: 24,
          h: 8
        },
      collapsed:true,
      panels:
      [
        {
  title: 'Memory Usage',
  type: 'graph',
  fill: 1,
  linewidth: 2,
  targets: [
    {
      refId: 'A',
      policy: 'default',
      resultFormat: 'time_series',
      orderByTime: 'ASC',
      tags: [],
      groupBy: [
        {
          type: 'time',
          params: [
            '$__interval'
          ]
        },
        {
          type: 'fill',
          params: [
            'null'
          ]
        }
      ],
      select: [
        [
          {
            type: 'field',
            params: [
              'value'
            ]
          },
          {
            type: 'mean',
            params: []
          }
        ]
      ],
      query: 'SELECT mean(total) as total, mean(used) as used, mean(cached) as cached, mean(free) as free, mean(buffered) as buffered  FROM "mem" WHERE  $timeFilter GROUP BY time($interval), host ORDER BY asc',
      rawQuery: true
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
    shared: true,
    value_type: 'individual',
    sort: 0
  },
  gridPos: {
    x: 0,
    y: 11,
    w: 12,
    h: 8
  },
  id: 100,
  datasource: 'datainflux5',
  renderer: 'flot',
  yaxes: [
    {
      label: null,
      show: true,
      logBase: 1,
      min: null,
      max: null,
      format: 'short'
    },
    {
      label: null,
      show: true,
      logBase: 1,
      min: null,
      max: null,
      format: 'short'
    }
  ],
  xaxis: {
    show: true,
    mode: 'time',
    name: null,
    values: [],
    buckets: null
  },
  yaxis: {
    align: false,
    alignLevel: null
  },
  lines: true,
  dashes: false,
  dashLength: 10,
  spaceLength: 10,
  points: false,
  pointradius: 5,
  bars: false,
  stack: false,
  percentage: false,
  legend: {
    show: true,
    values: false,
    min: false,
    max: false,
    current: false,
    total: false,
    avg: false
  },
  nullPointMode: 'null',
  steppedLine: false,
  timeFrom: null,
  timeShift: null,
  aliasColors: {},
  thresholds: []
},
{
  title: 'CPU usage',
  type: 'graph',
  fill: 1,
  linewidth: 2,
  targets: [
    {
      refId: 'A',
      policy: 'default',
      resultFormat: 'time_series',
      orderByTime: 'ASC',
      tags: [],
      groupBy: [
        {
          type: 'time',
          params: [
            '$__interval'
          ]
        },
        {
          type: 'fill',
          params: [
            'null'
          ]
        }
      ],
      select: [
        [
          {
            type: 'field',
            params: [
              'value'
            ]
          },
          {
            type: 'mean',
            params: []
          }
        ]
      ],
      query: 'SELECT mean(usage_user) as "user", mean(usage_system) as "system", mean(usage_softirq) as "softirq", mean(usage_steal) as "steal", mean(usage_nice) as "nice", mean(usage_irq) as "irq", mean(usage_iowait) as "iowait", mean(usage_guest) as "guest", mean(usage_guest_nice) as "guest_nice"  FROM "cpu" WHERE  cpu = \'cpu-total\' AND $timeFilter GROUP BY time($interval), *',
      rawQuery: true
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
    shared: true,
    value_type: 'individual',
    sort: 0
  },
  gridPos: {
    x: 12,
    y: 11,
    w: 12,
    h: 8
  },
  id: 101,
  datasource: 'datainflux5',
  renderer: 'flot',
  yaxes: [
    {
      label: null,
      show: true,
      logBase: 1,
      min: null,
      max: null,
      format: 'short'
    },
    {
      label: null,
      show: true,
      logBase: 1,
      min: null,
      max: null,
      format: 'short'
    }
  ],
  xaxis: {
    show: true,
    mode: 'time',
    name: null,
    values: [],
    buckets: null
  },
  yaxis: {
    align: false,
    alignLevel: null
  },
  lines: true,
  dashes: false,
  dashLength: 10,
  spaceLength: 10,
  points: false,
  pointradius: 5,
  bars: false,
  stack: false,
  percentage: false,
  legend: {
    show: true,
    values: false,
    min: false,
    max: false,
    current: false,
    total: false,
    avg: false
  },
  nullPointMode: 'null',
  steppedLine: false,
  timeFrom: null,
  timeShift: null,
  aliasColors: {},
  thresholds: []
},
{
  title: 'Disk Usage',
  type: 'graph',
  fill: 1,
  linewidth: 2,
  targets: [
    {
      target: 'randomWalk(\'argName\')',
      refId: 'A',
      policy: 'default',
      resultFormat: 'time_series',
      orderByTime: 'ASC',
      tags: [],
      groupBy: [
        {
          type: 'time',
          params: [
            '$__interval'
          ]
        },
        {
          type: 'fill',
          params: [
            'null'
          ]
        }
      ],
      select: [
        [
          {
            type: 'field',
            params: [
              'value'
            ]
          },
          {
            type: 'mean',
            params: []
          }
        ]
      ],
      query: 'SELECT mean(total) AS "total", mean(used) as "used", mean(free) as "free" FROM "disk" WHERE  "path" = \'/\' AND $timeFilter GROUP BY time($interval), "host", "path"',
      rawQuery: true
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
    shared: true,
    value_type: 'individual',
    sort: 0
  },
  gridPos: {
    x: 0,
    y: 19,
    w: 12,
    h: 8
  },
  id: 104,
  datasource: 'datainflux5',
  renderer: 'flot',
  yaxes: [
    {
      label: null,
      show: true,
      logBase: 1,
      min: null,
      max: null,
      format: 'short'
    },
    {
      label: null,
      show: true,
      logBase: 1,
      min: null,
      max: null,
      format: 'short'
    }
  ],
  xaxis: {
    show: true,
    mode: 'time',
    name: null,
    values: [],
    buckets: null
  },
  yaxis: {
    align: false,
    alignLevel: null
  },
  lines: true,
  dashes: false,
  dashLength: 10,
  spaceLength: 10,
  points: false,
  pointradius: 5,
  bars: false,
  stack: false,
  percentage: false,
  legend: {
    show: true,
    values: false,
    min: false,
    max: false,
    current: false,
    total: false,
    avg: false
  },
  nullPointMode: 'null',
  steppedLine: false,
  timeFrom: null,
  timeShift: null,
  aliasColors: {},
  thresholds: []
},{
  title: 'Processes',
  type: 'graph',
  fill: 1,
  linewidth: 2,
  targets: [
    {
      target: 'randomWalk(\'argName\')',
      refId: 'A',
      policy: 'default',
      resultFormat: 'time_series',
      orderByTime: 'ASC',
      tags: [],
      groupBy: [
        {
          type: 'time',
          params: [
            '$__interval'
          ]
        },
        {
          type: 'fill',
          params: [
            'null'
          ]
        }
      ],
      select: [
        [
          {
            type: 'field',
            params: [
              'value'
            ]
          },
          {
            type: 'mean',
            params: []
          }
        ]
      ],
      query: 'SELECT mean(running) as running, mean(blocked) as blocked, mean(sleeping) as sleeping, mean(stopped) as stopped, mean(zombies) as zombies, mean(paging) as paging, mean(unknown) as unknown FROM "processes" WHERE  $timeFilter GROUP BY time($interval), host ORDER BY asc',
      rawQuery: true
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
    shared: true,
    value_type: 'individual',
    sort: 0
  },
  gridPos: {
    x: 12,
    y: 14,
    w: 12,
    h: 8
  },
  id: 102,
  datasource: 'datainflux5',
  renderer: 'flot',
  yaxes: [
    {
      label: null,
      show: true,
      logBase: 1,
      min: null,
      max: null,
      format: 'short'
    },
    {
      label: null,
      show: true,
      logBase: 1,
      min: null,
      max: null,
      format: 'short'
    }
  ],
  xaxis: {
    show: true,
    mode: 'time',
    name: null,
    values: [],
    buckets: null
  },
  yaxis: {
    align: false,
    alignLevel: null
  },
  lines: true,
  dashes: false,
  dashLength: 10,
  spaceLength: 10,
  points: false,
  pointradius: 5,
  bars: false,
  stack: false,
  percentage: false,
  legend: {
    show: true,
    values: false,
    min: false,
    max: false,
    current: false,
    total: false,
    avg: false
  },
  nullPointMode: 'null',
  steppedLine: false,
  timeFrom: null,
  timeShift: null,
  aliasColors: {},
  thresholds: []
}
      ],
      title:"Telegraf Metrics",
      type:"row"
    }
    ]
  }
);



dashboard.rows.push(
  {
    panels:[
      {
        gridPos: {
          x: 0,
          y: 20,
          w: 24,
          h: 8
        },
      collapsed:true,
      panels:
      [
        {
  title: 'Mean Response Time',
  type: 'graph',
  fill: 1,
  linewidth: 2,
  targets: [
    {
      target: 'randomWalk(\'argName\')',
      refId: 'A',
      policy: 'default',
      resultFormat: 'time_series',
      orderByTime: 'ASC',
      tags: [],
      groupBy: [
        {
          type: 'time',
          params: [
            '$__interval'
          ]
        },
        {
          type: 'fill',
          params: [
            'null'
          ]
        }
      ],
      select: [
        [
          {
            type: 'field',
            params: [
              'value'
            ]
          },
          {
            type: 'mean',
            params: []
          }
        ]
      ],
      query: 'SELECT mean("responseTime") FROM "requestsRaw" WHERE $timeFilter GROUP BY time($__interval) fill(null)',
      rawQuery: true
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
    shared: true,
    value_type: 'individual',
    sort: 0
  },
  gridPos: {
    x: 0,
    y: 7,
    w: 24,
    h: 8
  },
  id: 111,
  datasource: 'datainflux3',
  renderer: 'flot',
  yaxes: [
    {
      label: null,
      show: true,
      logBase: 1,
      min: null,
      max: null,
      format: 'short'
    },
    {
      label: null,
      show: true,
      logBase: 1,
      min: null,
      max: null,
      format: 'short'
    }
  ],
  xaxis: {
    show: true,
    mode: 'time',
    name: null,
    values: [],
    buckets: null
  },
  yaxis: {
    align: false,
    alignLevel: null
  },
  lines: true,
  dashes: false,
  dashLength: 10,
  spaceLength: 10,
  points: false,
  pointradius: 5,
  bars: false,
  stack: false,
  percentage: false,
  legend: {
    show: true,
    values: false,
    min: false,
    max: false,
    current: false,
    total: false,
    avg: false
  },
  nullPointMode: 'null',
  steppedLine: false,
  timeFrom: null,
  timeShift: null,
  aliasColors: {},
  thresholds: []
},
{
  title: 'Response time in each region',
  type: 'graph',
  fill: 1,
  linewidth: 2,
  targets: [
    {
      target: 'randomWalk(\'argName\')',
      refId: 'A',
      policy: 'default',
      resultFormat: 'time_series',
      orderByTime: 'ASC',
      tags: [
        {
          key: 'RegionName',
          operator: '=~',
          value: '/^$regions$/'
        }
      ],
      groupBy: [
        {
          type: 'time',
          params: [
            '$__interval'
          ]
        },
        {
          type: 'fill',
          params: [
            'null'
          ]
        }
      ],
      select: [
        [
          {
            type: 'field',
            params: [
              'ResponseTime'
            ]
          },
          {
            type: 'mean',
            params: []
          }
        ]
      ],
      measurement: 'usertable',
      query: 'SELECT mean("ResponseTime") FROM "usertable" WHERE ("RegionName" =~ /^$regions$/) AND $timeFilter GROUP BY time($__interval) fill(null)',
      rawQuery: true
    },
    {
      target: 'randomWalk(\'random walk2\')',
      refId: 'B',
      policy: 'default',
      resultFormat: 'time_series',
      orderByTime: 'ASC',
      tags: [],
      groupBy: [
        {
          type: 'time',
          params: [
            '$__interval'
          ]
        },
        {
          type: 'fill',
          params: [
            'null'
          ]
        }
      ],
      select: [
        [
          {
            type: 'field',
            params: [
              'value'
            ]
          },
          {
            type: 'mean',
            params: []
          }
        ]
      ]
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
    shared: true,
    value_type: 'individual',
    sort: 0
  },
  gridPos: {
    x: 0,
    y: 36,
    w: 12,
    h: 8
  },
  id: 521,
  datasource: 'datainflux4',
  renderer: 'flot',
  yaxes: [
    {
      label: null,
      show: true,
      logBase: 1,
      min: null,
      max: null,
      format: 'short'
    },
    {
      label: null,
      show: true,
      logBase: 1,
      min: null,
      max: null,
      format: 'short'
    }
  ],
  xaxis: {
    show: true,
    mode: 'time',
    name: null,
    values: [],
    buckets: null
  },
  yaxis: {
    align: false,
    alignLevel: null
  },
  lines: true,
  dashes: false,
  dashLength: 10,
  spaceLength: 10,
  points: false,
  pointradius: 5,
  bars: false,
  stack: false,
  percentage: false,
  legend: {
    show: true,
    values: false,
    min: false,
    max: false,
    current: false,
    total: false,
    avg: false
  },
  nullPointMode: 'null',
  steppedLine: false,
  timeFrom: null,
  timeShift: null,
  aliasColors: {},
  thresholds: []
},
{
  title: 'Response Time in all regions',
  type: 'graph',
  fill: 1,
  linewidth: 2,
  targets: [
    {
      target: 'randomWalk(\'argName\')',
      refId: 'A',
      policy: 'default',
      resultFormat: 'time_series',
      orderByTime: 'ASC',
      tags: [],
      groupBy: [
        {
          type: 'time',
          params: [
            '$__interval'
          ]
        },
        {
          type: 'fill',
          params: [
            'null'
          ]
        }
      ],
      select: [
        [
          {
            type: 'field',
            params: [
              'value'
            ]
          },
          {
            type: 'mean',
            params: []
          }
        ]
      ],
      query: 'SELECT ResponseTime from usertable group by RegionName',
      rawQuery: true
    },
    {
      target: 'randomWalk(\'random walk2\')',
      refId: 'B',
      policy: 'default',
      resultFormat: 'time_series',
      orderByTime: 'ASC',
      tags: [],
      groupBy: [
        {
          type: 'time',
          params: [
            '$__interval'
          ]
        },
        {
          type: 'fill',
          params: [
            'null'
          ]
        }
      ],
      select: [
        [
          {
            type: 'field',
            params: [
              'value'
            ]
          },
          {
            type: 'mean',
            params: []
          }
        ]
      ],
      measurement: 'usertable'
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
    shared: true,
    value_type: 'individual',
    sort: 0
  },
  gridPos: {
    x: 12,
    y: 15,
    w: 12,
    h: 8
  },
  id: 211,
  datasource: 'datainflux4',
  renderer: 'flot',
  yaxes: [
    {
      label: null,
      show: true,
      logBase: 1,
      min: null,
      max: null,
      format: 'short'
    },
    {
      label: null,
      show: true,
      logBase: 1,
      min: null,
      max: null,
      format: 'short'
    }
  ],
  xaxis: {
    show: true,
    mode: 'time',
    name: null,
    values: [],
    buckets: null
  },
  yaxis: {
    align: false,
    alignLevel: null
  },
  lines: true,
  dashes: false,
  dashLength: 10,
  spaceLength: 10,
  points: false,
  pointradius: 5,
  bars: false,
  stack: false,
  percentage: false,
  legend: {
    show: true,
    values: false,
    min: false,
    max: false,
    current: false,
    total: false,
    avg: false
  },
  nullPointMode: 'null',
  steppedLine: false,
  timeFrom: null,
  timeShift: null,
  aliasColors: {},
  thresholds: []
}      ],
      title:"Response Time ",
      type:"row"
    }
    ]
  }
);

dashboard.rows.push(
  {
    panels:[
      {
        gridPos: {
          x: 0,
          y: 20,
          w: 24,
          h: 8
        },
      collapsed:true,
      panels:
      [
        {
    title: 'Error Rate in selected region',
    type: 'graph',
    fill: 1,
    linewidth: 2,
    targets: [
      {
        target: 'randomWalk(\'argName\')',
        refId: 'A',
        policy: 'default',
        resultFormat: 'time_series',
        orderByTime: 'ASC',
        tags: [
          {
            key: 'RegionName',
            operator: '=~',
            value: '/^$regions$/'
          }
        ],
        groupBy: [
          {
            type: 'time',
            params: [
              '$__interval'
            ]
          },
          {
            type: 'fill',
            params: [
              'null'
            ]
          }
        ],
        select: [
          [
            {
              type: 'field',
              params: [
                'ErrorCount'
              ]
            },
            {
              type: 'mean',
              params: []
            }
          ]
        ],
        measurement: 'usertable',
        query: 'SELECT  sum(ErrorCount)/$aggregation FROM "usertable" WHERE ("RegionName" =~ /^$regions$/) AND $timeFilter GROUP BY time($__interval) fill(null)',
        rawQuery: true
      },
      {
        target: 'randomWalk(\'random walk2\')',
        refId: 'B',
        policy: 'default',
        resultFormat: 'time_series',
        orderByTime: 'ASC',
        tags: [],
        groupBy: [
          {
            type: 'time',
            params: [
              '$__interval'
            ]
          },
          {
            type: 'fill',
            params: [
              'null'
            ]
          }
        ],
        select: [
          [
            {
              type: 'field',
              params: [
                'value'
              ]
            },
            {
              type: 'mean',
              params: []
            }
          ]
        ]
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
      shared: true,
      value_type: 'individual',
      sort: 0
    },
    gridPos: {
      x: 0,
      y: 8,
      w: 24,
      h: 8
    },
    id: 112,
    datasource: 'datainflux4',
    renderer: 'flot',
    yaxes: [
      {
        label: null,
        show: true,
        logBase: 1,
        min: null,
        max: null,
        format: 'short'
      },
      {
        label: null,
        show: true,
        logBase: 1,
        min: null,
        max: null,
        format: 'short'
      }
    ],
    xaxis: {
      show: true,
      mode: 'time',
      name: null,
      values: [],
      buckets: null
    },
    yaxis: {
      align: false,
      alignLevel: null
    },
    lines: true,
    dashes: false,
    dashLength: 10,
    spaceLength: 10,
    points: false,
    pointradius: 5,
    bars: false,
    stack: false,
    percentage: false,
    legend: {
      show: true,
      values: false,
      min: false,
      max: false,
      current: false,
      total: false,
      avg: false
    },
    nullPointMode: 'null',
    steppedLine: false,
    timeFrom: null,
    timeShift: null,
    aliasColors: {},
    thresholds: []
  },
  {
    title: 'Error Count of selected Test Plan',
    type: 'graph',
    fill: 1,
    linewidth: 2,
    targets: [
      {
        target: 'randomWalk(\'argName\')',
        refId: 'A',
        policy: 'default',
        resultFormat: 'time_series',
        orderByTime: 'ASC',
        tags: [
          {
            key: 'TPName',
            operator: '=~',
            value: '/^$tpname$/'
          }
        ],
        groupBy: [
          {
            type: 'time',
            params: [
              '$__interval'
            ]
          },
          {
            type: 'fill',
            params: [
              'null'
            ]
          }
        ],
        select: [
          [
            {
              type: 'field',
              params: [
                'ErrorCount'
              ]
            },
            {
              type: 'mean',
              params: []
            }
          ]
        ],
        measurement: 'usertable',
        query: 'SELECT sum(ErrorCount)/$aggregation FROM "usertable" WHERE ("TPName" =~ /^$tpname$/) AND $timeFilter GROUP BY time($__interval) fill(null)',
        rawQuery: true
      },
      {
        target: 'randomWalk(\'random walk2\')',
        refId: 'B',
        policy: 'default',
        resultFormat: 'time_series',
        orderByTime: 'ASC',
        tags: [],
        groupBy: [
          {
            type: 'time',
            params: [
              '$__interval'
            ]
          },
          {
            type: 'fill',
            params: [
              'null'
            ]
          }
        ],
        select: [
          [
            {
              type: 'field',
              params: [
                'value'
              ]
            },
            {
              type: 'mean',
              params: []
            }
          ]
        ]
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
      shared: true,
      value_type: 'individual',
      sort: 0
    },
    gridPos: {
      x: 0,
      y: 16,
      w: 12,
      h: 8
    },
    id: 1113,
    datasource: 'datainflux4',
    renderer: 'flot',
    yaxes: [
      {
        label: null,
        show: true,
        logBase: 1,
        min: null,
        max: null,
        format: 'short'
      },
      {
        label: null,
        show: true,
        logBase: 1,
        min: null,
        max: null,
        format: 'short'
      }
    ],
    xaxis: {
      show: true,
      mode: 'time',
      name: null,
      values: [],
      buckets: null
    },
    yaxis: {
      align: false,
      alignLevel: null
    },
    lines: true,
    dashes: false,
    dashLength: 10,
    spaceLength: 10,
    points: false,
    pointradius: 5,
    bars: false,
    stack: false,
    percentage: false,
    legend: {
      show: true,
      values: false,
      min: false,
      max: false,
      current: false,
      total: false,
      avg: false
    },
    nullPointMode: 'null',
    steppedLine: false,
    timeFrom: null,
    timeShift: null,
    aliasColors: {},
    thresholds: []
  },{
  title: 'Error rate of selected sample label',
  type: 'graph',
  fill: 1,
  linewidth: 2,
  targets: [
    {
      target: 'randomWalk(\'random walk2\')',
      refId: 'B',
      policy: 'default',
      resultFormat: 'time_series',
      orderByTime: 'ASC',
      tags: [
        {
          key: 'SampleLabel',
          operator: '=~',
          value: '/^$samplelabels$/'
        }
      ],
      groupBy: [
        {
          type: 'time',
          params: [
            '$__interval'
          ]
        },
        {
          type: 'fill',
          params: [
            'null'
          ]
        }
      ],
      select: [
        [
          {
            type: 'field',
            params: [
              'ErrorCount'
            ]
          },
          {
            type: 'mean',
            params: []
          }
        ]
      ],
      measurement: 'usertable',
      query: 'SELECT sum("ErrorCount")/$aggregation FROM "usertable" WHERE ("SampleLabel" =~ /^$samplelabels$/) AND $timeFilter GROUP BY time($__interval) fill(null)',
      rawQuery: true
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
    shared: true,
    value_type: 'individual',
    sort: 0
  },
  gridPos: {
    x: 12,
    y: 21,
    w: 12,
    h: 8
  },
  id: 1563,
  datasource: 'datainflux4',
  renderer: 'flot',
  yaxes: [
    {
      label: null,
      show: true,
      logBase: 1,
      min: null,
      max: null,
      format: 'short'
    },
    {
      label: null,
      show: true,
      logBase: 1,
      min: null,
      max: null,
      format: 'short'
    }
  ],
  xaxis: {
    show: true,
    mode: 'time',
    name: null,
    values: [],
    buckets: null
  },
  yaxis: {
    align: false,
    alignLevel: null
  },
  lines: true,
  dashes: false,
  dashLength: 10,
  spaceLength: 10,
  points: false,
  pointradius: 5,
  bars: false,
  stack: false,
  percentage: false,
  legend: {
    show: true,
    values: false,
    min: false,
    max: false,
    current: false,
    total: false,
    avg: false
  },
  nullPointMode: 'null',
  steppedLine: false,
  timeFrom: null,
  timeShift: null,
  aliasColors: {},
  thresholds: []
}
      ],
      title:"Error Rate",
      type:"row"
    }
    ]
  }
);

dashboard.rows.push(
  {
    panels:[
      {
        gridPos: {
          x: 0,
          y: 20,
          w: 24,
          h: 8
        },
      collapsed:true,
      panels:
      [
        {
  title: 'Thrpughput and Number of users',
  type: 'graph',
  fill: 1,
  linewidth: 2,
  targets: [
    {
      target: 'randomWalk(\'argName\')',
      refId: 'A',
      policy: 'default',
      resultFormat: 'time_series',
      orderByTime: 'ASC',
      tags: [],
      groupBy: [
        {
          type: 'time',
          params: [
            '$__interval'
          ]
        },
        {
          type: 'fill',
          params: [
            'null'
          ]
        }
      ],
      select: [
        [
          {
            type: 'field',
            params: [
              'value'
            ]
          },
          {
            type: 'mean',
            params: []
          }
        ]
      ],
      query: 'SELECT mean("startedThreads") FROM "virtualUsers" WHERE $timeFilter GROUP BY time([[aggregation]]s) fill(null)',
      rawQuery: true,
      alias: 'Num users'
    },
    {
      refId: 'B',
      policy: 'default',
      resultFormat: 'time_series',
      orderByTime: 'ASC',
      tags: [],
      groupBy: [
        {
          type: 'time',
          params: [
            '$__interval'
          ]
        },
        {
          type: 'fill',
          params: [
            'null'
          ]
        }
      ],
      select: [
        [
          {
            type: 'field',
            params: [
              'value'
            ]
          },
          {
            type: 'mean',
            params: []
          }
        ]
      ],
      query: 'SELECT  count("responseTime")/$aggregation FROM "requestsRaw" WHERE $timeFilter GROUP BY time([[aggregation]]s) fill(null)',
      rawQuery: true,
      alias: 'Throughput'
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
    shared: true,
    value_type: 'individual',
    sort: 0
  },
  gridPos: {
    x: 0,
    y: 9,
    w: 24,
    h: 8
  },
  id: 114,
  datasource: 'datainflux3',
  renderer: 'flot',
  yaxes: [
    {
      label: null,
      show: true,
      logBase: 1,
      min: null,
      max: null,
      format: 'short'
    },
    {
      label: null,
      show: true,
      logBase: 1,
      min: null,
      max: null,
      format: 'short'
    }
  ],
  xaxis: {
    show: true,
    mode: 'time',
    name: null,
    values: [],
    buckets: null
  },
  yaxis: {
    align: false,
    alignLevel: null
  },
  lines: true,
  dashes: false,
  dashLength: 10,
  spaceLength: 10,
  points: false,
  pointradius: 5,
  bars: false,
  stack: false,
  percentage: false,
  legend: {
    show: true,
    values: false,
    min: false,
    max: false,
    current: false,
    total: false,
    avg: false
  },
  nullPointMode: 'null',
  steppedLine: false,
  timeFrom: null,
  timeShift: null,
  aliasColors: {},
  thresholds: []
}
      ],
      title:"Throughput",
      type:"row"
    }
    ]
  }
);

dashboard.rows.push(
  {
    panels:[
      {
        gridPos: {
          x: 0,
          y: 20,
          w: 24,
          h: 8
        },
      collapsed:true,
      panels:
      [
        {
  title: 'Response Time in different Iterations',
  type: 'graph',
  fill: 1,
  linewidth: 2,
  targets: [
    {
      target: 'randomWalk(\'argName\')',
      refId: 'A',
      policy: 'default',
      resultFormat: 'time_series',
      orderByTime: 'ASC',
      tags: [],
      groupBy: [
        {
          type: 'time',
          params: [
            '$__interval'
          ]
        },
        {
          type: 'fill',
          params: [
            'null'
          ]
        }
      ],
      select: [
        [
          {
            type: 'field',
            params: [
              'value'
            ]
          },
          {
            type: 'mean',
            params: []
          }
        ]
      ],
      query: 'select ResponseTime from usertable group by  ItrNum',
      rawQuery: true
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
    shared: true,
    value_type: 'individual',
    sort: 0
  },
  gridPos: {
    x: 0,
    y: 10,
    w: 12,
    h: 8
  },
  id: 9113,
  datasource: 'datainflux4',
  renderer: 'flot',
  yaxes: [
    {
      label: null,
      show: true,
      logBase: 1,
      min: null,
      max: null,
      format: 'short'
    },
    {
      label: null,
      show: true,
      logBase: 1,
      min: null,
      max: null,
      format: 'short'
    }
  ],
  xaxis: {
    show: true,
    mode: 'time',
    name: null,
    values: [],
    buckets: null
  },
  yaxis: {
    align: false,
    alignLevel: null
  },
  lines: true,
  dashes: false,
  dashLength: 10,
  spaceLength: 10,
  points: false,
  pointradius: 5,
  bars: false,
  stack: false,
  percentage: false,
  legend: {
    show: true,
    values: false,
    min: false,
    max: false,
    current: false,
    total: false,
    avg: false
  },
  nullPointMode: 'null',
  steppedLine: false,
  timeFrom: null,
  timeShift: null,
  aliasColors: {},
  thresholds: []
},
{
title: 'Response Time with different customer ID ',
type: 'graph',
fill: 1,
linewidth: 2,
targets: [
{
target: 'randomWalk(\'argName\')',
refId: 'A',
policy: 'default',
resultFormat: 'time_series',
orderByTime: 'ASC',
tags: [],
groupBy: [
{
  type: 'time',
  params: [
    '$__interval'
  ]
},
{
  type: 'fill',
  params: [
    'null'
  ]
}
],
select: [
[
  {
    type: 'field',
    params: [
      'value'
    ]
  },
  {
    type: 'mean',
    params: []
  }
]
],
query: 'select ResponseTime from usertable group by  CustomerID',
rawQuery: true
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
shared: true,
value_type: 'individual',
sort: 0
},
gridPos: {
x: 12,
y: 10,
w: 12,
h: 8
},
id: 10113,
datasource: 'datainflux4',
renderer: 'flot',
yaxes: [
{
label: null,
show: true,
logBase: 1,
min: null,
max: null,
format: 'short'
},
{
label: null,
show: true,
logBase: 1,
min: null,
max: null,
format: 'short'
}
],
xaxis: {
show: true,
mode: 'time',
name: null,
values: [],
buckets: null
},
yaxis: {
align: false,
alignLevel: null
},
lines: true,
dashes: false,
dashLength: 10,
spaceLength: 10,
points: false,
pointradius: 5,
bars: false,
stack: false,
percentage: false,
legend: {
show: true,
values: false,
min: false,
max: false,
current: false,
total: false,
avg: false
},
nullPointMode: 'null',
steppedLine: false,
timeFrom: null,
timeShift: null,
aliasColors: {},
thresholds: []
},
{
title: 'Response Time of different sample labels ',
type: 'graph',
fill: 1,
linewidth: 2,
targets: [
{
target: 'randomWalk(\'argName\')',
refId: 'A',
policy: 'default',
resultFormat: 'time_series',
orderByTime: 'ASC',
tags: [],
groupBy: [
{
  type: 'time',
  params: [
    '$__interval'
  ]
},
{
  type: 'fill',
  params: [
    'null'
  ]
}
],
select: [
[
  {
    type: 'field',
    params: [
      'value'
    ]
  },
  {
    type: 'mean',
    params: []
  }
]
],
query: 'select ResponseTime from usertable group by  SampleLabel',
rawQuery: true
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
shared: true,
value_type: 'individual',
sort: 0
},
gridPos: {
x: 0,
y: 20,
w: 24,
h: 8
},
id: 11113,
datasource: 'datainflux4',
renderer: 'flot',
yaxes: [
{
label: null,
show: true,
logBase: 1,
min: null,
max: null,
format: 'short'
},
{
label: null,
show: true,
logBase: 1,
min: null,
max: null,
format: 'short'
}
],
xaxis: {
show: true,
mode: 'time',
name: null,
values: [],
buckets: null
},
yaxis: {
align: false,
alignLevel: null
},
lines: true,
dashes: false,
dashLength: 10,
spaceLength: 10,
points: false,
pointradius: 5,
bars: false,
stack: false,
percentage: false,
legend: {
show: true,
values: false,
min: false,
max: false,
current: false,
total: false,
avg: false
},
nullPointMode: 'null',
steppedLine: false,
timeFrom: null,
timeShift: null,
aliasColors: {},
thresholds: []
}
      ],
      title:"Multiple graphs",
      type:"row"
    }
    ]
  }
);
return dashboard;
