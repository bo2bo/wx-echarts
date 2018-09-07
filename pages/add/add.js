import * as echarts from '../../ec-canvas/echarts.min';
let common = require('../../utils/common.js');
let data = require('../../utils/data.js');

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var symbolSize = 20;
  var data = [{
    "id": "a",
    "name": "a",
    "data": [
      ["2018-01-31", 20],
      ["2018-02-28", 28],
      ["2018-03-31", 20],
      ["2018-04-30", 35],
      ["2018-05-31", 32],
      ["2018-06-30", 36],
      ["2018-07-31", 30],
      ["2018-08-31", 38],
      ["2018-09-30", 30]
    ],
    "offsetXs": [],
    "flag": true
  }];
  var option = {
    title: {
      text: '添加点',
      left: 'left',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      triggerOn: 'none',
      formatter: function (params) {
        if (typeof params.data[0] === "string") {
          return '指标: ' + params.seriesName + "<br>" + '时间: ' + params.data[0] + '<br/>数据: ' +
            params.data[1].toFixed(2);
        } else {
          return '指标: ' + params.seriesName + "<br>" + '时间: ' + params.name + '<br/>数据: ' +
            params.data[1];
        }
      }
    },
    grid: common.common.gridConfig,
    xAxis: common.common.xAxisConfig,
    yAxis: common.common.yAxisConfig,
    dataZoom: common.common.dataZoomConfig,
    graphic: [],
    series: [{
      id: data[0].id,
      type: 'line',
      name: data[0].name,
      smooth: true,
      symbolSize: symbolSize,
      data: data[0].data
    }]
  };
  // option.xAxis.max = "2019-03-31";
  var zr = chart.getZr();
  zr.on('click', function (params) {
    debugger;
    var year = new Date(data[0].data[data[0].data.length - 1][0]).getFullYear();
    var month = new Date(data[0].data[data[0].data.length - 1][0]).getMonth() + 2;
    if (month > 12) {
      month = month % 12;
      year = year + 1;
    }
    var cdt = new Date(new Date(year, month, 1).getTime() - 1000 * 60 * 60 * 24);
    var day = cdt.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    var item = [new Date(year + "-" + month + "-" + day).getTime(), 0];
    var offsetX = chart.convertToPixel('grid', item)[0];
    var pointInPixel = [offsetX, params.offsetY];
    var pointInGrid = chart.convertFromPixel('grid', pointInPixel);
    pointInGrid[0] = year + "-" + month + "-" + day;
    if (chart.containPixel('grid', pointInPixel)) {
      data[0].data.push(pointInGrid);
      chart.setOption({
        series: [{
          id: 'a',
          data: data[0].data
        }]
      });
      common.common.drugFun({
        data: data,
        dom: chart
      })
    }
  });
  chart.setOption(option, true);

  common.common.drugFun({
    data: data,
    dom: chart
  })

  chart.on('dataZoom', function () {
    common.common.updatePosition({
      data: data,
      dom: chart
    });
  });
  return chart;
}

Page({
  onShareAppMessage: function(res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function() {},
      fail: function() {}
    }
  },
  data: {
    ec: {}
  },

  onReady() {},

  echartInit(e) {
    initChart(e.detail.canvas, e.detail.width, e.detail.height);
  }
});