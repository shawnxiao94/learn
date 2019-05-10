<template>
  <!-- 饼状图组件 -->
  <div :id="id" class="pie-chart"></div>
</template>
<script>
import echarts from "echarts";
import colors from "@/assets/styles/var/color";
export default {
  props: {
    PieChartData: {
      type: Object
    },
    id: {
      type: String,
      default: "pieChart"
    }
  },
  watch: {
    PieChartData(newVal) {
      if (newVal) {
        this.renderEcharts();
      }
    }
  },
  data() {
    return {
      nameList: [],
      loading: false,
      echarts: {
        chart: null,
        option: {
          tooltip: {
            trigger: "item",
            padding: 10,
            backgroundColor: colors.echart.tooltip.backgroundColor,
            borderColor: colors.echart.tooltip.borderColor,
            borderWidth: 1,
            formatter: "{b}<br/> {c}<br/> {d}%",
            textStyle: {
              color: colors.echart.tooltip.textColor,
              fontSize: "12"
            },
            extraCssText: "width:120px"
          },
          legend: {
            icon: "circle",
            orient: "vertical",
            itemGap: 16,
            top: "center",
            left: 60,
            data: [],
            textStyle: {
              color: colors.echart.axis.textStyleColor,
              fontWeight: "normal",
              fontSize: "14"
            }
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              center: ["60%", "50%"],
              radius: ["48%", "57%"],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: "center"
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: "14",
                    color: colors.echart.axis.textStyleColor
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: function(params) {
                    // build a color map as your need.
                    var colorList = [
                      colors.echart.c1,
                      colors.echart.c2,
                      colors.echart.c3,
                      colors.echart.c4,
                      colors.echart.c5,
                      colors.echart.c6
                    ];
                    return colorList[params.dataIndex];
                  }
                }
              },
              data: []
            }
          ]
        }
      }
    };
  },
  mounted() {
    // ECharts图表
    this.renderEcharts();
    // // 标签数分布
    // this.getTagNumberData()
  },
  methods: {
    resizeCharts() {
      this.echarts.chart.resize();
    },
    // ECharts图表
    renderEcharts() {
      this.echarts.chart = echarts.init(document.getElementById(this.id));
      this.PieChartData.map(val => {
        this.nameList.push(val.name);
      });
      this.echarts.option.series[0].data = this.PieChartData;
      this.echarts.option.legend.data = this.nameList;
      this.echarts.chart.setOption(this.echarts.option);
      // 改变窗体时改变图表大小
      window.addEventListener("resize", this.resizeCharts);
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeCharts);
  }
};
</script>
<style lang="stylus" scoped>
.pie-chart
  width 100%
  height 375px
</style>
