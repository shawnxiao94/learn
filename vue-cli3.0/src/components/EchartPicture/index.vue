/* eslint-disable no-tabs */
<template>
  <div id="chartsB"></div>
</template>
<script>
import echarts from "echarts";
// 水波图logo图片
import logo from "@/assets/images/common/logo.png";
import wycLogo from "@/assets/images/charts/waterLogo/wyc.png";
import fcshjLogo from "@/assets/images/charts/waterLogo/fangche.png";
import datongLogo from "@/assets/images/charts/waterLogo/datong.png";
import hqcxLogo from "@/assets/images/charts/waterLogo/evcard.png";
import cxjLogo from "@/assets/images/charts/waterLogo/chexiang.png";
import cycLogo from "@/assets/images/charts/waterLogo/chengyongche.png";
// 水波图logo图片置灰
import wycLogohui from "@/assets/images/charts/waterLogo/wyc-hui.png";
import fcshjLogohui from "@/assets/images/charts/waterLogo/fangche-hui.png";
import datongLogohui from "@/assets/images/charts/waterLogo/datong-hui.png";
import hqcxLogohui from "@/assets/images/charts/waterLogo/evcard-hui.png";
import cxjLogohui from "@/assets/images/charts/waterLogo/chexiang-hui.png";
import cycLogohui from "@/assets/images/charts/waterLogo/chengyongche-hui.png";
import "echarts-liquidfill";
const imageObject = {
  logo,
  wycLogo,
  fcshjLogo,
  datongLogo,
  hqcxLogo,
  cxjLogo,
  cycLogo,
  wycLogohui,
  fcshjLogohui,
  datongLogohui,
  hqcxLogohui,
  cxjLogohui,
  cycLogohui
};
export default {
  props: {
    pictureDataProps: {
      type: Array
    }
  },
  watch: {
    pictureDataProps() {
      this.setCharts();
    }
  },
  data() {
    return {
      pictureData: [],
      echarts: {
        a: {
          chart: null,
          option: {
            backgroundColor: "",
            series: [
              {
                radius: "60%",
                waveAnimation: true,
                animationDuration: 0,
                animationDurationUpdate: 0,
                type: "graph",
                layout: "force",
                symbolSize: 79,
                focusNodeAdjacency: false,
                roam: false,
                draggable: false,
                force: {
                  repulsion: 1000,
                  layoutAnimation: false
                },
                label: {
                  normal: {
                    show: true,
                    position: "bottom",
                    textStyle: {
                      fontSize: 12
                    }
                  }
                },
                lineStyle: {
                  normal: {
                    opacity: 0.9,
                    width: 1
                  },
                  emphasis: {
                    color: "#ec407a"
                  }
                },
                data: [
                  {
                    name: "",
                    symbol: "image://" + logo,
                    itemStyle: {
                      normal: {
                        color: "#FF4081"
                      }
                    }
                  }
                ],
                links: []
              }
            ]
          }
        }
      }
    };
  },
  mounted() {
    this.setCharts();
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeCharts);
  },
  methods: {
    resizeCharts() {
      this.echarts.a.chart.resize();
    },
    renderEcharts() {
      this.echarts.a.chart = echarts.init(document.getElementById("chartsB"));
      this.echarts.a.chart.setOption(this.echarts.a.option);
      this.resizeCharts();
      window.addEventListener("resize", this.resizeCharts);
    },
    setCharts() {
      this.reset();
      // const sourceArr = this.$store.getters.permission.dataPermissionArr
      this.pictureData = JSON.parse(JSON.stringify(this.pictureDataProps));
      // sourceArr.map(item => {
      //   this.pictureData.map(_item => {
      //     if (~~item.code === ~~_item.channelCode) {
      //       _item.flag = 1
      //     }
      //   })
      // })
      this.pictureData.map((itemWave, index) => {
        // 改变窗体时该表图表大小
        // 0: {sourceId: 1, sourceCode: "cyc", flag: 0, sourceName: "乘用车"}
        // 1: {sourceId: 2, sourceCode: "cxj", flag: 1, sourceName: "车享家"}
        // 2: {sourceId: 3, sourceCode: "fcshj", flag: 1, sourceName: "房车生活家"}
        // 3: {sourceId: 4, sourceCode: "hqcx", flag: 1, sourceName: "环球车享"}
        // 4: {sourceId: 5, sourceCode: "datong", flag: 0, sourceName: "大通"}
        // 5: {sourceId: 6, sourceCode: "wyc", flag: 0, sourceName: "网约车"}
        this.echarts.a.option.series[0].links.push({
          source: 0,
          target: Number(index) + 1
        });
        if (itemWave.sourceName !== "集团") {
          if (Number(itemWave.flag) === 1) {
            this.echarts.a.option.series[0].data.push({
              name: itemWave.sourceName,
              symbol: "image://" + imageObject[itemWave.sourceCode + "Logo"],
              itemStyle: {
                normal: {
                  borderColor: "#4BCADB",
                  borderWidth: 4,
                  shadowBlur: 20,
                  shadowColor: "#4BCADB",
                  color: "#2B2B2B"
                }
              }
            });
          } else {
            this.echarts.a.option.series[0].data.push({
              name: itemWave.sourceName,
              symbol: "image://" + imageObject[itemWave.sourceCode + "Logohui"],
              itemStyle: {
                normal: {
                  borderColor: "#717171",
                  borderWidth: 4,
                  shadowBlur: 20,
                  shadowColor: "#717171",
                  color: "#2B2B2B"
                }
              }
            });
          }
        }
        window.addEventListener("resize", this.resizeCharts);
      });
      this.renderEcharts();
    },
    reset() {
      this.echarts.a.option.series[0].links = [];
      this.echarts.a.option.series[0].data = [
        {
          name: "",
          symbol: "image://" + logo,
          itemStyle: {
            normal: {
              color: "#FF4081"
            }
          }
        }
      ];
    }
  }
};
</script>
<style lang="stylus" scoped>
@import "~@/assets/styles/variable.styl"
#chartsB
  width 1000px
  height 380px
</style>
