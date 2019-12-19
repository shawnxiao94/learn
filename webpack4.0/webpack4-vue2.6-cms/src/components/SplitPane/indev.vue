<template>
  <div class="split-pane-wrapper" ref="outer">
    <div
      class="pane pane-left"
      :style="{
        width: leftOffsetPercent,
        paddingRight: `${this.triggerWidth / 2}px`
      }"
    >
      <slot name="left"></slot>
    </div>
    <div
      class="pane-trigger-con"
      @mousedown="handleMousedown"
      :style="{ left: triggerLeft, width: `${triggerWidth}px` }"
    >
      <div class="pane-trigger-con-vertical">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>
    <div
      class="pane pane-right"
      :style="{
        left: leftOffsetPercent,
        paddingLeft: `${this.triggerWidth / 2}px`
      }"
    >
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "SplitPane",
  props: {
    value: {
      type: Number,
      default: 0.5
    },
    triggerWidth: {
      type: Number,
      default: 8
    },
    min: {
      type: Number,
      default: 0.1
    },
    max: {
      type: Number,
      default: 0.9
    }
  },
  data () {
    return {
      canMove: false,
      initOffset: 0
    };
  },
  computed: {
    leftOffsetPercent () {
      return `${this.value * 100}%`;
    },
    triggerLeft () {
      return `calc(${this.value * 100}% - ${this.triggerWidth / 2}px)`;
    }
  },
  methods: {
    handleClick () {
      this.leftOffset -= 0.02;
    },
    handleMousedown (event) {
      document.addEventListener("mousemove", this.handleMousemove);
      document.addEventListener("mouseup", this.handleMouseup);
      this.initOffset =
        event.pageX - event.srcElement.getBoundingClientRect().left;
      this.canMove = true;
    },
    handleMousemove (event) {
      if (!this.canMove) return;
      const outerRect = this.$refs.outer.getBoundingClientRect();
      let offsetPercent =
        (event.pageX -
          this.initOffset +
          this.triggerWidth / 2 -
          outerRect.left) /
        outerRect.width;
      if (offsetPercent < this.min) offsetPercent = this.min;
      if (offsetPercent > this.max) offsetPercent = this.max;
      // this.$emit('input', offsetPercent)
      this.$emit("update:value", offsetPercent);
    },
    handleMouseup () {
      this.canMove = false;
    }
  }
};
</script>
<style lang="stylus">
.split-pane-wrapper
  height 100%
  width 100%
  position relative
  .pane
    position absolute
    top 0
    height 100%
    &-right
      right 0
      bottom 0
    &-trigger-con
      height 100%
      background #f8f8f9
      border-top none
      border-bottom none
      // border 1px solid #dcdee2
      border 1px solid transparent
      position absolute
      top 0
      z-index 10
      user-select none
      cursor col-resize
      &-vertical
        position absolute
        left 1px
        top 50%
        width 100%
        height 32px
        transform translateY(-50%)
        i
          width 100%
          height 1px
          background rgba(23,35,61,.25)
          float left
          margin-top 3px
</style>
