<!--
  * @see add
-->
<template>
  <!--表单布局-->
  <el-card class="form-layout">
    <el-form>
      <div class="form-layout-main">
        <el-row :gutter="40">
          <el-col :xs="20" :sm="12" :lg="8">
            <el-form-item>
              <span slot="label" v-once>
                {{ getRandomNum() }}
              </span>
              <el-input
                v-model="form.a1"
                clearable
                placeholder="支持批量模糊搜索"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <span slot="label" v-once>
                {{ getRandomNum() }}
              </span>
              <el-date-picker
                v-model="form.a2"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <span slot="label" v-once> {{ getRandomNum() }} </span>
              <el-select v-model="form.a3" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <span slot="label" v-once> {{ getRandomNum() }} </span>
              <el-cascader
                change-on-select
                placeholder="试试搜索：指南"
                :options="options"
                filterable
              ></el-cascader>
            </el-form-item>
            <el-form-item>
              <span slot="label" v-once> {{ getRandomNum() }} </span>
              <el-input
                v-model="form.a4"
                clearable
                placeholder="支持批量模糊搜索"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <span slot="label" v-once> {{ getRandomNum() }} </span>
              <el-input
                v-model="form.a5"
                clearable
                placeholder="支持批量模糊搜索"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <span slot="label" v-once> {{ getRandomNum() }} </span>
              <el-input
                v-model="form.a6"
                clearable
                placeholder="支持批量模糊搜索"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <span slot="label" v-once> {{ getRandomNum() }} </span>
              <el-input
                v-model="form.a7"
                clearable
                placeholder="支持批量模糊搜索"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="20" :sm="12" :lg="8">
            <el-form-item>
              <span slot="label" v-once> {{ getRandomNum() }} </span>
              <el-input
                v-model="form.a8"
                clearable
                placeholder="支持批量模糊搜索"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <span slot="label" v-once> {{ getRandomNum() }} </span>
              <el-input
                v-model="form.a9"
                clearable
                placeholder="支持批量模糊搜索"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <span slot="label" v-once> {{ getRandomNum() }} </span>
              <el-input
                v-model="form.a11"
                clearable
                placeholder="支持批量模糊搜索"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <span slot="label" v-once> {{ getRandomNum() }} </span>
              <el-input
                v-model="form.a12"
                clearable
                placeholder="支持批量模糊搜索"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <span slot="label" v-once> {{ getRandomNum() }} </span>
              <el-input
                v-model="form.a13"
                clearable
                placeholder="支持批量模糊搜索"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <span slot="label" v-once> {{ getRandomNum() }} </span>
              <el-input
                v-model="form.a14"
                clearable
                placeholder="支持批量模糊搜索"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <span slot="label" v-once> {{ getRandomNum() }} </span>
              <el-input
                v-model="form.a15"
                clearable
                placeholder="支持批量模糊搜索"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <span slot="label" v-once> {{ getRandomNum() }} </span>
              <el-input
                v-model="form.a16"
                clearable
                placeholder="支持批量模糊搜索"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="form-layout-footer">
        <el-form-item>
          <el-button type="primary">
            <span>提交</span>
          </el-button>
          <el-button type="primary">
            <span>提交</span>
          </el-button>
        </el-form-item>
      </div>
    </el-form>
  </el-card>
</template>

<script>
// 获取随机数
import { getRandomNum } from "@/common/utils/index";
export default {
  methods: {
    // 获取随机数
    getRandomNum
  },
  data() {
    return {
      form: {
        a1: "",
        a2: "",
        a3: "",
        a4: "",
        a5: "",
        a6: "",
        a7: "",
        a8: "",
        a9: "",
        a11: "",
        a12: "",
        a13: "",
        a14: "",
        a15: "",
        a16: ""
      },
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped></style>
