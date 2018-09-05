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
  let drugData = data.data.dragData;
  common.common.drugOption({
    dom: chart,
    title: '折线图拖拽',
    data: drugData
  });
  common.common.drugFun({
    data: drugData,
    dom: chart
  })

  chart.on('dataZoom', function() {
    common.common.updatePosition({
      data: drugData,
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
    drag: {
      onInit: initChart
    }
  },

  onReady() {}
});