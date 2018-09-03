import * as echarts from '../../ec-canvas/echarts.min';
let common = require('../../utils/common.js');
let data = require('../../utils/data.js');
let stackChart = null,
  pieData = null,
  giveChart = null,
  needChart = null;

function initStrackChart(canvas, width, height) {
  stackChart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(stackChart);
  var option = common.common.getStackOption({
    data: data.data.stackData,
    title: '堆积图',
    chartType: 'struct',
    datatypeName: ''
  });
  stackChart.setOption(option);
  pieData = common.common.getPieData({
    index: stackChart.getOption().series.length - 1,
    chart: stackChart
  })
  stackChart.on('click', function(params) {
    pieData = common.common.getPieData({
      index: params.dataIndex,
      chart: stackChart
    });
    common.common.getPieOption({
      data: pieData.give.data,
      color: pieData.give.color,
      dom: giveChart
    });
    common.common.getPieOption({
      data: pieData.need.data,
      color: pieData.need.color,
      dom: needChart
    });
  })
  return stackChart;
}

function initGiveChart(canvas, width, height) {
  giveChart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(giveChart);
  var data = pieData.give;
  common.common.getPieOption({
    data: data.data,
    color: data.color,
    dom: giveChart
  });
  return giveChart;
}

function initNeedChart(canvas, width, height) {
  needChart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(needChart);
  var data = pieData.need;
  common.common.getPieOption({
    data: data.data,
    color: data.color,
    dom: needChart
  });
  return needChart;
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
    ecStack: {
      onInit: initStrackChart
    },
    ecGive: {
      onInit: initGiveChart
    },
    ecNeed: {
      onInit: initNeedChart
    }
  },

  onReady() {}
});