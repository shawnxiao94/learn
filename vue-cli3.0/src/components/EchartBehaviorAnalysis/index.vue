<template>
  <!-- ECharts图表测试 -->
  <div class="user-behavior-chart" ref="userBehaviorChart">
    <div id="userBehavior" v-show="!emptyData"></div>
    <div class="panel-con-message" v-show="emptyData">{{ text }}</div>
  </div>
</template>
<script>
import echarts from "echarts";
import color from "@/assets/styles/var/color";

export default {
  props: ["userBehavior"],
  watch: {
    userBehavior() {
      // 设置图表数据
      this.setChartData();
    }
  },
  data() {
    return {
      emptyData: false,
      charts: "",
      text: "暂无数据",
      option: {
        backgroundColor: "",
        color: [],
        legend: {
          itemGap: 30,
          itemWidth: 10,
          top: "20px",
          right: "2%",
          data: [],
          textStyle: {
            color: "",
            fontSize: 14
          }
        },
        grid: {
          top: "100px",
          left: "5%",
          right: "5%",
          bottom: "15%"
        },
        tooltip: {
          padding: 10,
          backgroundColor: "",
          formatter: obj => {
            let seriesName = obj.seriesName;
            let name = obj.name;
            let tips = obj.data[3];
            let returnArr = [[`${seriesName}-${name}`]];
            // 从x轴数据中提取需要的数据
            for (let i = 0; i < tips.length; i++) {
              returnArr.push(`
                <br>
                ${tips[i].name}: ${tips[i].value}
              `);
            }
            return returnArr.join("");
          }
        },
        xAxis: {
          boundaryGap: false,
          type: "category",
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: ""
            }
          },
          axisLine: {
            lineStyle: {
              color: ""
            }
          }
        },
        yAxis: {
          show: false,
          type: "value"
        },
        series: [
          {
            name: "",
            type: "scatter",
            data: [],
            symbolSize: function(data) {
              return Math.sqrt(data[2]) / 0.04;
            }
          },
          {
            name: "",
            type: "scatter",
            data: [],
            symbolSize: function(data) {
              return Math.sqrt(data[2]) / 0.04;
            }
          },
          {
            name: "",
            type: "scatter",
            data: [],
            symbolSize: function(data) {
              return Math.sqrt(data[2]) / 0.04;
            }
          },
          {
            name: "",
            type: "scatter",
            data: [],
            symbolSize: function(data) {
              return Math.sqrt(data[2]) / 0.04;
            }
          },
          {
            name: "",
            type: "scatter",
            data: [],
            symbolSize: function(data) {
              return Math.sqrt(data[2]) / 0.04;
            }
          },
          {
            name: "",
            type: "scatter",
            data: [],
            symbolSize: function(data) {
              return Math.sqrt(data[2]) / 0.04;
            }
          }
        ]
      }
    };
  },
  methods: {
    // 设置图表数据
    setChartData() {
      // 设置颜色
      this.option.backgroundColor = color.gray.colorGraySSSS;
      this.option.color = [
        color.echart.c1,
        color.echart.c2,
        color.echart.c3,
        color.echart.c4,
        color.echart.c5,
        color.echart.c6
      ];
      this.option.xAxis.axisLine.lineStyle.color =
        color.echart.axis.lineStyleColor;
      this.option.xAxis.axisLabel.textStyle.color =
        color.echart.axis.textStyleColor;
      this.option.legend.textStyle.color = color.echart.axis.textStyleColor;
      this.option.tooltip.backgroundColor =
        color.echart.tooltip.backgroundColor;
      // 判断传递来数据
      if (this.userBehavior && this.userBehavior.length > 0) {
        this.emptyData = false;
        this.$refs.userBehaviorChart.style.height = "360px";
        // this.option.series.length = this.userBehavior.length
        for (let i = 0; i < this.option.series.length; i++) {
          if (this.userBehavior[i]) {
            this.option.series[i].name = this.userBehavior[i].name;
            this.option.series[i].type = "scatter";
            this.option.series[i].data = this.userBehavior[i].data;
            this.option.series[i].symbolSize = function(data) {
              return Math.sqrt(data[2]) / 0.04;
            };
            this.option.legend.data[i] = this.userBehavior[i].name;
          }
        }
        this.$nextTick(() => {
          this.setChart();
        });
      } else {
        this.emptyData = true;
        this.text = "暂无数据";
        this.$refs.userBehaviorChart.style.height = "120px";
      }
    },
    resizeCharts() {
      this.charts.resize();
    },
    // 渲染图表
    setChart() {
      let userBehavior = document.getElementById("userBehavior");
      this.charts = echarts.init(userBehavior);
      this.charts.clear();
      this.charts.setOption(this.option);
      // 改变窗体时改变图表大小
      window.addEventListener("resize", this.resizeCharts);
    }
  },
  // 注销页面时触发的钩子
  destroyed() {
    window.removeEventListener("resize", this.resizeCharts);
  }
};
</script>
<style lang="stylus" scoped>
.user-behavior-chart
  width 100%
  height 360px
#userBehavior
  width 100%
  height 100%
</style>
