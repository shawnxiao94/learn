<template>
  <div>
    <!-- 柱状图表 -->
    <div id="columnarImg" :style="{ width: '100%', height: '580px' }"></div>
    <!-- {{AbnormalData}} -->
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  props: ["AbnormalData"],
  watch: {
    "AbnormalData.xAxisLabels": function(newVal) {
      this.anomalyUser.xAxis[0].data = newVal;
      this.columnarEcharts();
    }
  },
  data() {
    return {
      anomalyUser: {
        title: {
          text: "异常用户数量分布",
          x: "70",
          y: "20",
          textStyle: {
            color: "#fff",
            fontSize: "16px"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            animation: false,
            label: {
              fontSize: "10px"
            },
            lineStyle: {
              type: "dashed",
              // 隐藏线条
              opacity: 0
            }
          }
        },
        legend: {
          data: ["未消费", "低于中位数", "自定义"],
          align: "left",
          right: 50,
          top: 20,
          textStyle: {
            color: "#fff"
          },
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 35
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            // show:true,
            data: this.AbnormalData.xAxisLabels,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#063374",
                width: 1,
                type: "solid"
              }
            },
            axisTick: {
              show: true
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#00c7ff"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value}K"
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#00c7ff",
                width: 1,
                type: "solid"
              }
            },
            splitLine: {
              lineStyle: {
                // 设置y轴线条为虚线
                type: "dashed",
                color: "#063374"
              }
            }
          }
        ],
        series: [
          {
            name: "未消费",
            type: "bar",
            data: [20, 50, 100, 58],
            // 柱子宽度
            barWidth: 30,
            // 柱子之间间距
            barGap: 0.1,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(141,71,200,1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(228,58,187,1)"
                  }
                ]),
                opacity: 1
              }
            }
          },
          {
            name: "低于中位数",
            type: "bar",
            data: [50, 70, 60, 61],
            barWidth: 30,
            barGap: 0.1,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(255,210,81,1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(230,114,29,1)"
                  }
                ]),
                opacity: 1
              }
            }
          },
          {
            name: "自定义",
            type: "bar",
            data: [70, 48, 73, 68],
            barWidth: 30,
            barGap: 0.1,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(0,132,148,1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(84,161,255,1)"
                  }
                ]),
                opacity: 1
              }
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.columnarEcharts();
  },
  methods: {
    columnarEcharts() {
      var myChart = echarts.init(document.getElementById("columnarImg"));
      myChart.clear();
      myChart.setOption(this.anomalyUser);
      this.anomalyUser.xAxis[0].data = this.AbnormalData.xAxisLabels;
      // 改变窗体时改变图表大小
      window.addEventListener("resize", this.columnarEcharts);
    }
  },
  // 注销页面时触发的钩子
  destroyed() {
    window.removeEventListener("resize", this.columnarEcharts);
  }
};
</script>
<style lang="stylus" scoped></style>
