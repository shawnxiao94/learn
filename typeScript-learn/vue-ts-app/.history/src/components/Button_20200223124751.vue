<!--
 * @Author: your name
 * @Date: 2020-02-23 12:31:02
 * @LastEditTime: 2020-02-23 12:47:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Editvb
 * @FilePath: \vue-ts-app\src\components\Button.vue
 -->
<template>
  <div>
    <button>button {{count}}</button>
  </div>
</template>

<script lang="ts">
  // =================主流写法 class-style 方式=================
  import Vue from 'vue'
  import component from 'vue-class-component'
  @component
  export default class Button extends Vue {
    // data 使用类的实例属性申明
    private count: number = 6
  }

  // ===========写法2：导出对象方式,传统写组件方式=========
  // export default {
  //   name: 'Button',
  //   data () {
  //     return {
  //       count: 1
  //     }
  //   },
  //   mounted () {
  //     // typescript 里面会报错，但是不影响执行，vue3里斯没有this的
  //     console.log(this.count)
  //   }
  // }
  // extend 写法比较稳，typescript规范不会报错
  // import Vue from 'vue'
  // export default Vue.extend({
  //   name: 'Button',
  //   data () {
  //     return {
  //       count: 2
  //     }
  //   },
  //   mounted () {
  //     console.log(this.count)
  //   }
  // })
</script>

<style lang="scss" scoped>

</style>