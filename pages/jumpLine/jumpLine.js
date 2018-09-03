import * as echarts from '../../ec-canvas/echarts.min';
let common = require('../../utils/common.js');
let data = require('../../utils/data.js');
let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  common.common.getLineOption({
    title: '闪烁折线图',
    dom: chart,
    dataZoom: true,
    markLine: true,
    markArea: true,
    time: 100,
    allLine: true,
    timeSlot: 12,
    data: data.data.jumpData
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
    ec: {
      onInit: initChart
    }
  },

  onReady() {}
});