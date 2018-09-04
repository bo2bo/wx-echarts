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
  // let drugData = data.data.dragData;
  // common.common.drugOption({
  //   dom: chart,
  //   title: '折线图拖拽',
  //   data: drugData
  // });
  // common.common.drugFun({
  //   data: drugData,
  //   dom: chart
  // })

  // chart.on('dataZoom', function() {
  //   common.common.updatePosition({
  //     data: drugData,
  //     dom: chart
  //   });
  // });
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
      text: 'Try Dragging these Points'
    },
    tooltip: {
      triggerOn: 'none',
      formatter: function(params) {
        return 'X: ' + params.data[0].toFixed(2) + '<br>Y: ' + params.data[1].toFixed(2);
      }
    },
    grid: {},
    xAxis: {
      min: -100,
      max: 80,
      type: 'value',
      axisLine: {
        onZero: false
      }
    },
    yAxis: {
      min: -30,
      max: 60,
      type: 'value',
      axisLine: {
        onZero: false
      }
    },
    dataZoom: [{
        type: 'slider',
        xAxisIndex: 0,
        filterMode: 'empty'
      },
      {
        type: 'slider',
        yAxisIndex: 0,
        filterMode: 'empty'
      },
      {
        type: 'inside',
        xAxisIndex: 0,
        filterMode: 'empty'
      },
      {
        type: 'inside',
        yAxisIndex: 0,
        filterMode: 'empty'
      }
    ],
    series: [{
      id: 'a',
      type: 'line',
      smooth: true,
      symbolSize: symbolSize,
      data: data
    }]
  };
  if (!app.inNode) {
    setTimeout(function() {
      // Add shadow circles (which is not visible) to enable drag.
      chart.setOption({
        graphic: echarts.util.map(data, function(item, dataIndex) {
          return {
            type: 'circle',
            position: chart.convertToPixel('grid', item),
            shape: {
              cx: 0,
              cy: 0,
              r: symbolSize / 2
            },
            invisible: true,
            draggable: true,
            ondrag: echarts.util.curry(onPointDragging, dataIndex),
            onmousemove: echarts.util.curry(showTooltip, dataIndex),
            onmouseout: echarts.util.curry(hideTooltip, dataIndex),
            z: 100
          };
        })
      });
    }, 0);
    // window.addEventListener('resize', updatePosition);
  }

  chart.on('dataZoom', updatePosition);
  return chart;
}


function updatePosition() {
  chart.setOption({
    graphic: echarts.util.map(data, function(item, dataIndex) {
      return {
        position: chart.convertToPixel('grid', item)
      };
    })
  });
}

function showTooltip(dataIndex) {
  chart.dispatchAction({
    type: 'showTip',
    seriesIndex: 0,
    dataIndex: dataIndex
  });
}

function hideTooltip(dataIndex) {
  chart.dispatchAction({
    type: 'hideTip'
  });
}

function onPointDragging(dataIndex, dx, dy) {
  data[dataIndex] = chart.convertFromPixel('grid', this.position);
  chart.setOption({
    series: [{
      id: 'a',
      data: data
    }]
  });
};
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