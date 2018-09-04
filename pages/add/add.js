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
  var data = [
    [15, 0],
    [-50, 10],
    [-56.5, 20],
    [-46.5, 30],
    [-22.1, 40]
  ];
  var option = {
    title: {
      text: 'Click to Add Points'
    },
    tooltip: {
      formatter: function(params) {
        var data = params.data || [0, 0];
        return data[0].toFixed(2) + ', ' + data[1].toFixed(2);
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      min: -60,
      max: 20,
      type: 'value',
      axisLine: {
        onZero: true
      }
    },
    yAxis: {
      min: 0,
      max: 40,
      type: 'value',
      axisLine: {
        onZero: true
      }
    },
    series: [{
      id: 'a',
      type: 'line',
      smooth: true,
      symbolSize: symbolSize,
      data: data
    }]
  };
  var zr = chart.getZr();
  zr.on('click', function(params) {
    var pointInPixel = [params.offsetX, params.offsetY];
    var pointInGrid = chart.convertFromPixel('grid', pointInPixel);
    if (chart.containPixel('grid', pointInPixel)) {
      data.push(pointInGrid);
      chart.setOption({
        series: [{
          id: 'a',
          data: data
        }]
      });
    }
  });

  zr.on('mousemove', function(params) {
    var pointInPixel = [params.offsetX, params.offsetY];
    zr.setCursorStyle(chart.containPixel('grid', pointInPixel) ? 'copy' : 'default');
  });
  chart.setOption(option);
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