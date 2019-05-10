<template>
  <div class="calendar-water">
    <div class="calendar-search">
      <div></div>
      <el-form :inline="true" class="search-bar">
        <el-form-item label="触点" prop="state">
          <el-select
            size="mini"
            placeholder="请选择"
            v-model="form.activityPlaceCode"
            @change="activityPlaceCodeChanged"
          >
            <el-option
              v-for="item in options.activityPlaceCodes"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="calendar-content" v-show="data.data && data.data.length">
      <div class="calendar-header">
        <div class="left">{{ data.title }}</div>
        <div class="th" v-for="item in data.titleNameList" :key="item">
          <span>{{ item }}</span>
        </div>
      </div>
      <div class="calendar-main">
        <el-scrollbar style="height:100%">
          <div
            class="calendar-row"
            v-for="(item, index) in data.data"
            :key="index"
          >
            <div class="calendar-label">
              <span class="date">{{ item.name }}</span>
            </div>
            <div class="calendar-column-group">
              <div
                class="column"
                v-for="(column, columnIndex) in item.data"
                :key="columnIndex"
                :class="{
                  blue: column.sourceCode === 'cyc',
                  yellow: column.sourceCode === 'cxj',
                  'light-blue': column.sourceCode === 'fcshj',
                  'dark-blue': column.sourceCode === 'hqcx',
                  'light-red': column.sourceCode === 'datong',
                  'light-green': column.sourceCode === 'wyc'
                }"
              >
                <div :key="index" v-for="(item, index) in data.titleList">
                  <template v-if="column.sourceCode === item">
                    <div
                      class="item"
                      v-for="(itemChild, itemIndex) in column.data"
                      :key="itemIndex"
                    >
                      <el-popover
                        placement="right"
                        width="auto"
                        popper-class="port-popover"
                        trigger="hover"
                      >
                        <div class="pop-info">
                          <span class="pop-info-header">{{
                            itemChild.name
                          }}</span>
                          <ul>
                            <li
                              v-for="(hoverItem,
                              hoverItemIndex) in itemChild.hoverData"
                              :key="hoverItemIndex"
                            >
                              <i></i>
                              {{
                                hoverItem && hoverItem.replace("undefined", "-")
                              }}
                            </li>
                          </ul>
                        </div>
                        <span class="item-text" slot="reference">
                          {{ itemChild.name }}
                        </span>
                      </el-popover>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <div
      class="calendar-content calendar-content-message"
      v-show="!data.data || data.data.length < 1"
    >
      暂无数据
    </div>
  </div>
</template>
<script>
// 触点选择框改变
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    activityPlaceCode: {
      type: String,
      default: ""
    },
    activityPlaceCodeTrue: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 监听触点选择框
    activityPlaceCodeChanged(val) {
      this.$emit("activityPlaceCodeChanged", val);
    },
    // 判断是否包含全部
    hasActivityPlaceCodes() {
      if (this.activityPlaceCodeTrue) {
        this.options.activityPlaceCodes.splice(0, 1);
      }
    }
  },
  mounted() {
    this.hasActivityPlaceCodes();
  },
  data() {
    return {
      form: {
        activityPlaceCode: this.activityPlaceCode
      },
      options: {
        activityPlaceCodes: [
          {
            name: "全部",
            value: ""
          },
          {
            name: "官网",
            value: "1"
          },
          {
            name: "APP",
            value: "2"
          },
          {
            name: "公众号",
            value: "3"
          },
          {
            name: "门店",
            value: "4"
          }
        ]
      }
    };
  }
};
</script>
<style lang="stylus" scoped>
@import "~@/assets/styles/variable.styl"
.pop-info
  .pop-info-header
    display block
    padding-bottom 10px
.calendar-water
  width 100%
  .calendar-search
    display flex
    justify-content space-between
    margin-top -5px
    >>>.el-form
      padding-top 0
      .el-form-item
        margin 0
  .calendar-content
    &.calendar-content-message
      padding 20px 0
      text-align center
    margin-top 10px
    .calendar-header
      display flex
      padding 10px 0
      font-size $fontsize-large
      .left
        flex 0 0 170px
        // font-size $fontsize-large-xxxx
        text-align center
        line-height 30px
      .th
        flex 1
        text-align center
        line-height 30px
        &~.th
          margin-left 15px
    .calendar-main
      height 500px
      >>>.el-scrollbar__wrap
        overflow-x hidden
      .calendar-row
        display flex
        &.year-line
          .column
            padding-bottom 20px!important
        .calendar-label
          flex 0 0 170px
          .year
            font-size $fontsize-large-xxxx
            padding 10px 0 0
            text-align center
            display block
          .date
            font-size $fontsize-large
            position relative
            display block
            padding-right 38px
            text-align right
            margin-top 20px
            padding 7px 38px 7px 0
            &:after
              content ''
              display block
              position absolute
              width 8px
              height 8px
              border-radius 100%
              background $color-a
              top 50%
              right 15px
              margin-top -4px
        .calendar-column-group
          display flex
          flex 1
          .column
            background $color-d
            flex 1
            text-align center
            padding 20px 20px 40px
            &~.column
              margin-left 15px
            .item
              width 100%
              border-radius 2px
              background $color-a
              .item-text
                display block
                padding 7px
                cursor pointer
                width 100%
                text-align left
                color $color-white
              &~.item
                margin-top 10px
            &.blue
              .item
                background $color-a
            &.yellow
              .item
                background $color-c
                .item-text
                  color $color-a
            &.light-blue
              .item
                background $color-b
            &.dark-blue
              .item
                background $color-c
            &.light-red
              .item
                background $color-b
            &.light-green
              .item
                background $color-d
</style>
