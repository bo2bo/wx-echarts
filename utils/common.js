var jumpIntervalMap = new Object();
var common = {
  lineColoObj: {
    'VA': '#3acffe',
    'GDP': '#a2784c',
    'GFP': '#ff421d',
    'OPI': '#dadada',
    'IC': '#a5ff4d',
    'FGI': '#18ccb9',
    'DF': '#2b8189',
    'PPI': '#b64dff',
    'CPI': '#888888',
    'EXP': '#ff9600',
    'IMP': '#e4977f',
    'PROF': '#f372a0',
    'RCU': '#77fff1',
    'AS': '#fffc00',
    'AD': '#2ffe91',
    'ICbak': '#18ccb9',
    'Deflator': '#2b8189',
    'CU': '#77fff1'
  },
  structColorObj: {
    'IC': '#a5ff4d',
    'OPI': '#dadada',
    'EXP': '#ff9600',
    'GFP': '#ff421d',
    'IMP': '#e4977f',
    'OUTPUT': '#fffc00'
  },
  dataZoomConfig: [{
      show: false,
      type: 'inside',
      start: 0,
      end: 100,
      startValue: null,
      zoomOnMouseWheel: false,
    },
    {
      height: 3,
      backgroundColor: '#B4B4B3',
      borderColor: 'transparent',
      fillerColor: '#00D8FF',
      showDetail: false,
      handleSize: 12,
      handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      handleStyle: {
        color: '#00D8FF',
        shadowBlur: 8,
        shadowColor: '#4795B4',
        shadowOffsetX: 2,
        shadowOffsetY: 2
      },
      bottom: '1.5%'
    }
  ],
  xAxisConfig: {
    type: 'time',
    position: 'bottom',
    axisLabel: {
      margin: 10,
      textStyle: {
        color: '#b4b4b4',
        fontSise: 10,
      },
      formatter: function(param) {
        var year = (new Date(param)).getFullYear();
        var month = (new Date(param)).getMonth() + 1;
        if (month < 10) {
          month = '0' + month;
        }
        var date = (new Date(param)).getDate();
        if (date < 10) {
          date = '0' + date;
        }
        return year + '-' + month + '-' + date;
      },
    },
    axisLine: {
      lineStyle: {
        color: '#9c9ca0',
        width: 1,
        type: 'solid'
      }
    },
    axisTick: {
      show: false,
      alignWithLabel: true,
      inside: true
    },
    splitLine: {
      show: false,
    },
    splitArea: {
      show: false,
    }
  },
  yAxisConfig: {
    type: 'value',
    nameGap: 10,
    scale: true, //脱离0值比例
    splitNumber: 4,
    boundaryGap: false,
    axisLabel: {
      margin: 12,
      color: '#b4b4b4',
      fontFamily: 'arial',
      fontWeight: 'bolder',
      fontSise: 10,
      formatter: function(v) {
        if (1) {
          return v.toFixed(1);
        } else {
          return '';
        }
      }
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: '#ddd', //y轴
        width: 1,
        type: 'solid'
      }
    },
    axisTick: {
      onGap: false,
      show: false,
    },
    splitArea: {
      show: false
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#62636d'
      }
    },
    axisPointer: {
      show: false,
    }
  },
  gridConfig: {
    containLabel: true,
    top: '7%',
    left: 'left',
    width: '96%',
    height: '88%'
  },
  lineToolTipConfig: {
    trigger: 'item',
    axisPointer: {
      show: true,
      type: 'line',
      label: {
        show: true,
        formatter: function(v) {
          var date = new Date(v.value);
          return date.getFullYear() + '-' + (parseInt(date.getMonth()) + 1) + '-' + date.getDate();
        }
      },
      lineStyle: {
        type: 'solid',
        width: 1
      }
    },
    showDelay: 0, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
    backgroundColor: 'rgba(0,0,0,0.3)',
    formatter: function(param) {
      var tips = '';
      var date;
      if (Array.isArray(param)) {
        date = new Date(param[0].data[0]);
        var tipsTime = '时间：' + date.getFullYear() + '-' +
          (date.getMonth() + 1) + '-' +
          date.getDate() + "<br/>";
        for (var i = 0; i < param.length; i++) {
          var name = param[i].seriesName;
          if (param[i].seriesName.slice(param[i].seriesName.length - 2, param[i].seriesName.length) == '预测' && param[i].dataIndex == 0) {
            name = name.slice(0, name.length - 2) + '历史';
          }
          if (i == 0) {
            tipsTime = tipsTime + name + '：' + parseFloat(param[i].value[1]).toFixed(2) + '<br>';
          } else {
            if (param[i + 1].seriesName == param[i].seriesName) {
              continue;
            } else {
              tipsTime = tipsTime + name + '：' + parseFloat(param[i].value[1]).toFixed(2) + '<br>';
            }
          }
        }
        return tipsTime;
      } else {
        date = new Date(param.data[0]);
        var tipsTime = '时间：' + date.getFullYear() + '-' +
          (date.getMonth() + 1) + '-' +
          date.getDate() + "<br/>";
        var name = param.seriesName;
        if (param.seriesName.slice(param.seriesName.length - 2, param.seriesName.length) == '预测' && param.dataIndex == 0) {
          name = name.slice(0, name.length - 2) + '历史';
        }
        tips += tipsTime + (name || 'value') + '：' + parseFloat(param.data[1]).toFixed(2);
      }
      return tips;
    }
  },
  stackToolTipConfig: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      show: true,
      type: 'cross',
      lineStyle: {
        type: 'line',
        width: 1
      }
    },
    showDelay: 0, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
    backgroundColor: 'rgba(0,0,0,0.6)',
    formatter: function(param, ticket, callback) {
      var tips = param[0].name + '</br>';
      var paramlen = param.length;
      for (var i = 0; i < paramlen; i++) {
        tips += param[i].seriesName + ':' + Math.abs(param[i].value.toFixed(2)) + '<br/>'
      }
      return tips;
    }
  },
  markAreaConfig: {
    silent: true,
    itemStyle: {
      normal: {
        color: 'rgba(255,255,255,0.6)',
        opacity: 0.1
      }
    },
    data: [
      [{
        xAxis: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      }, {
        xAxis: 'max'
      }]
    ]
  },
  markLineConfig: {
    symbol: ['none', 'none'],
    silent: true,
    label: {
      normal: {
        show: true,
        formatter: function() {
          return common.getTime().untilDay + ' ' + common.getTime().untilSecond
        }
      }
    },
    lineStyle: {
      normal: {
        type: 'dotted',
        color: "#eeeeef",
        width: 2
      }
    },
    data: [{
      xAxis: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
    }]
  },
  // yyyy-mm-dd转Date类型
  time2Datetime: function(array) {
    var copyArray = new Array(),
      xAxisArray = new Array(),
      yAxisArray = new Array();
    for (var i = 0; i < array.length; i++) {
      copyArray[i] = [new Date(array[i].date || array[i].statDate), array[i].value];
      xAxisArray[i] = array[i].date || array[i].statDate;
      yAxisArray[i] = array[i].value;
    }
    return {
      serieData: copyArray,
      xAxisData: xAxisArray,
      yAxisData: yAxisArray
    };
  },
  // 获取MarkLine的time值
  getTime: function() {
    var timeNow = new Date();
    var year = timeNow.getFullYear();
    var month = timeNow.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    var date = timeNow.getDate();
    if (date < 10) {
      date = '0' + date;
    }
    var hours = timeNow.getHours();
    if (hours < 10) {
      hours = '0' + hours;
    }
    var minutes = timeNow.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    var second = timeNow.getSeconds();
    if (second < 10) {
      second = '0' + second;
    }
    var untilDay = year + '-' + month + '-' + date,
      untilMonth = year + month,
      untilSecond = hours + ':' + minutes + ':' + second;
    return {
      year: year,
      month: month,
      untilDay: untilDay,
      untilMonth: untilMonth,
      untilSecond: untilSecond
    }
  },
  // 闪图option
  getLineOption: function(param) {
    let option = {
      tooltip: common.lineToolTipConfig,
      title: {
        text: param.title,
        left: 'left',
        textStyle: {
          color: '#fff'
        }
      },
      grid: common.gridConfig,
      dataZoom: common.dataZoomConfig,
      xAxis: common.xAxisConfig,
      yAxis: [common.yAxisConfig, common.yAxisConfig],
      series: []
    };
    option.xAxis.type = 'time';
    common.getOptionData({
      url: param.url,
      dom: param.dom,
      dataZoom: param.dataZoom,
      markLine: param.markLine,
      markArea: param.markArea,
      time: param.time,
      option: option,
      allLine: param.allLine,
      timeSlot: param.timeSlot,
      data: param.data
    })
  },
  barLineOption: function(param) {
    var returnOption = param.option;
    returnOption.series[0].type = 'bar';
    returnOption.series[1].type = 'bar';
    // 设置左右y轴
    returnOption.series[0].yAxisIndex = 1;
    returnOption.series[1].yAxisIndex = 1;
    // dataZoom改变时bar重叠
    returnOption.series[0].barWidth = '36px';
    returnOption.series[1].barWidth = '36px';
    returnOption.series[0].barMaxWidth = '36px';
    returnOption.series[1].barMaxWidth = '36px';
    // line点放到柱状图的正中间
    returnOption.series[0].barCategoryGap = '60%';
    returnOption.series[1].barCategoryGap = '60%';
    returnOption.series[0].barGap = '-100%';
    returnOption.series[1].barGap = '-100%';
    // bar渐变色
    returnOption.series[0].itemStyle.normal.color = new echarts.graphic.LinearGradient(
      0, 0, 0, 1, [{
          offset: 0,
          color: '#0ec8ff'
        },
        {
          offset: 1,
          color: '#185aff'
        }
      ]
    );
    returnOption.series[1].itemStyle.normal.color = new echarts.graphic.LinearGradient(
      0, 0, 0, 1, [{
          offset: 0,
          color: '#0ec8ff'
        },
        {
          offset: 1,
          color: '#185aff'
        }
      ]
    );
    returnOption.xAxis.axisLine.onZero = false;
    returnOption.yAxis[0].axisLabel.fontSise = 12;
    returnOption.yAxis[1].axisLabel.fontSise = 12;
    returnOption.yAxis[1].axisLabel.margin = 30;
    returnOption.yAxis[0].axisLabel.margin = 30;
    param.dom.on('datazoom', function(dataZoomChange) {
      if ((returnOption.dataZoom[0].end - returnOption.dataZoom[0].start) < 15) {
        returnOption.series[0].barWidth = '36px';
        returnOption.series[1].barWidth = '36px';
        returnOption.series[0].barMaxWidth = '36px';
        returnOption.series[1].barMaxWidth = '36px';
      } else {
        returnOption.series[0].barWidth = 'auto';
        returnOption.series[1].barWidth = 'auto';
        returnOption.series[0].barMaxWidth = 'auto';
        returnOption.series[1].barMaxWidth = 'auto';
      }
    });
    return returnOption;
  },
  //请求带闪烁的option数据
  getOptionData: function(param) {
    var result = param.data;
    var seriesData = [];
    for (let i = 0; i < result.length; i++) {
      var item, serieData = common.time2Datetime(result[i].children).serieData,
        regstr = /[\u4e00-\u9fa5、]+/,
        dataName = result[i].itemName.split(regstr).join(""),
        color = common.lineColoObj[dataName];
      if (color == undefined) {
        color = '#ffff00';
      }
      item = {
        name: result[i].itemName,
        type: 'line',
        showAllSymbol: false,
        symbol: 'circle',
        symbolSize: 4,
        data: serieData,
        yAxisIndex: 0,
        smooth: true,
        itemStyle: {
          normal: {
            color: color,
            lineStyle: {
              width: 2,
              type: 'solid',
              color: color
            }
          }
        },
        markLine: {},
        markArea: {}
      };
      seriesData.push(item);
    }
    param.option.series = seriesData;
    if (!param.allLine) {
      param.option = common.barLineOption({
        option: param.option,
        dom: param.dom
      })
    }
    common.jumpChart({
      dom: param.dom,
      option: param.option,
      dataZoom: param.dataZoom,
      markLine: param.markLine,
      markArea: param.markArea,
      time: param.time,
      timeSlot: param.timeSlot
    });
  },
  //预测折线图闪烁
  jumpChart: function(param) {
    let option = param.option,
      id = param.dom.id,
      opacity = 1,
      flagOpcity = 2,
      chartStart, chartStartV,
      chartEnd = 100;
    param.dom.clear();
    // 获取闪烁数据的series
    let jumpSeriesIndex = [],
      historyIndex;
    for (var i = 0; i < option.series.length; i++) {
      if (option.series[i].name.substr(option.series[i].name.length - 2, 2) == '预测') {
        jumpSeriesIndex.push(i);
      } else {
        historyIndex = i;
      }
    }
    // 设置dataZoom
    param.dom.on('datazoom', function(param) {
      chartStart = param.start;
      chartEnd = param.end;
    });
    // 设置dataZoom初始值
    var jumpDataLen, historyTime;
    if (option.series[historyIndex + 1] != undefined) {
      jumpDataLen = option.series[historyIndex + 1].data.length;
      historyTime = option.series[historyIndex].data[option.series[historyIndex].data.length - (param.timeSlot + 1) + jumpDataLen][0];
    } else {
      jumpDataLen = option.series[historyIndex - 1].data.length;
      historyTime = option.series[historyIndex].data[option.series[historyIndex].data.length - (param.timeSlot + 1) + jumpDataLen][0];
    }
    var month = new Date(historyTime).getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    chartStartV = new Date(historyTime).getFullYear() + '-' + month + '-' + new Date(historyTime).getDate();
    // 添加时间戳
    var thisJumpInterval = jumpIntervalMap[param.dom.id];
    if (thisJumpInterval) {
      clearInterval(thisJumpInterval);
    }
    thisJumpInterval = setInterval(function() {
      if (opacity == 1) {
        flagOpcity = 2;
      }
      if (opacity == 9) {
        flagOpcity = -2;
      }
      opacity += flagOpcity;
      opacity = opacity % 10;
      for (var j = 0; j < jumpSeriesIndex.length; j++) {
        var index = jumpSeriesIndex[j];
        option.series[index].lineStyle = {
          normal: {
            opacity: opacity / 10,
          }
        };
      }
      for (var i = 0; i < jumpSeriesIndex.length; i++) {
        if (option.series[jumpSeriesIndex[i]].data.length == 1) {
          continue;
        } else {
          if (param.markLine) {
            option.series[jumpSeriesIndex[i]].markLine = common.markLineConfig;
          }
          if (param.markArea) {
            option.series[jumpSeriesIndex[i]].markArea = common.markAreaConfig;
          }
          break;
        }
      }
      if (param.dataZoom) {
        common.dataZoomConfig[0].start = chartStart;
        common.dataZoomConfig[0].end = chartEnd;
        common.dataZoomConfig[0].startValue = chartStartV;
        option.dataZoom = common.dataZoomConfig;
      }
      param.dom.setOption(option);
    }, param.time);
    jumpIntervalMap[id] = thisJumpInterval;
  },
  // 获取堆积图Option
  getStackOption: function(param) {
    var resjson, xAxisData, legendData = [];
    let option = {
      tooltip: common.lineToolTipConfig,
      title: {
        text: param.title,
        left: 'left',
        textStyle: {
          color: '#fff'
        },
        show: false
      },
      legend: {
        data: [],
        textStyle: {
          color: "#fff"
        }
      },
      grid: common.gridConfig,
      dataZoom: common.dataZoomConfig,
      xAxis: common.xAxisConfig,
      yAxis: [common.yAxisConfig, common.yAxisConfig],
      series: function() {
        var serie = [],
          resjson = param.data;
        if (param.chartType == 'struct') {
          for (var i = 0; i < resjson.length; i++) {
            if (resjson[i]['itemName'] == 'IMP' || resjson[i]['itemName'] == 'OUTPUT') {
              for (var j = 0; j < resjson[i]['children'].length; j++) {
                resjson[i]['children'][j]['value'] = -resjson[i]['children'][j]['value'];
              }
            }
          }
        };
        for (let i = 0; i < resjson.length; i++) {
          var item,
            serieData = common.time2Datetime(resjson[i].children).yAxisData,
            dataName = resjson[i].itemName,
            color = common.structColorObj[dataName];
          legendData.push(dataName);
          xAxisData = common.time2Datetime(resjson[i].children).xAxisData;
          if (color == undefined) {
            color = '#ffff00';
          }
          item = {
            name: resjson[i].itemName,
            type: 'bar',
            showAllSymbol: false,
            symbol: 'circle',
            symbolSize: 4,
            data: serieData,
            yAxisIndex: 0,
            smooth: true,
            itemStyle: {
              normal: {
                color: color,
                lineStyle: {
                  width: 2,
                  type: 'solid',
                  color: color
                }
              }
            },
            stack: '总量',
            markLine: {},
            markArea: {}
          };
          serie.push(item);
        }
        return serie;
      }()
    };
    option.xAxis.type = 'category';
    option.xAxis.data = xAxisData;
    option.legend.data = legendData;
    option.tooltip = common.stackToolTipConfig;
    option.yAxis[0].axisLabel.formatter = function(v) {
      if (v > 0)
        return Math.round(v)
      else
        return -Math.round(v)
    };
    return option;
  },
  // 饼图option
  getPieOption: function(param) {
    var pieOption = {
      tooltip: {
        trigger: 'item',
        formatter: function(param) {
          return param.data.name + '<br/>数值:' + parseFloat(param.data.value).toFixed(2) + '(' + param.percent + '%)';
        },
      },
      color: param.color,
      series: [{
        type: 'pie',
        radius: '55%',
        center: ['50%', '55%'],
        label: {
          normal: {
            color: '#fff',
            formatter: '{b}:\n{c}\n{d}%',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 12
            },
            position: 'outside'
          }
        },
        data: param.data,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
    param.dom.setOption(pieOption, true);
  },
  // 结构饼图optionData
  getPieData: function(param) {
    var needPieDatas = [],
      needPieColors = [],
      givePieDatas = [],
      givePieColors = [],
      series = param.chart.getOption().series;
    for (var i = 0; i < series.length; i++) {
      if (series[i].name == 'OUTPUT' || series[i].name == 'IMP' || (series[i].name == 'IC' && series[i].data[param.index] < 0)) {
        var valueData = {
            value: -series[i].data[param.index].toFixed(2),
            name: series[i].name
          },
          colorData = series[i].itemStyle.color;
        needPieDatas.push(valueData);
        needPieColors.push(colorData);
      } else {
        var valueData = {
            value: series[i].data[param.index].toFixed(2),
            name: series[i].name
          },
          colorData = series[i].itemStyle.color;
        givePieDatas.push(valueData);
        givePieColors.push(colorData);
      }
    }
    var datasObj = {
      need:{
        data: needPieDatas,
        color: needPieColors
      },
      give:{
        data: givePieDatas,
        color: givePieColors
      }
    }
    return datasObj;
  }
};
module.exports = {
  common: common
}