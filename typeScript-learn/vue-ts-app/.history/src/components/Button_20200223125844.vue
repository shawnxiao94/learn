<!--
 * @Author: your name
 * @Date: 2020-02-23 12:31:02
 * @LastEditTime: 2020-02-23 12:58:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Editvb
 * @FilePath: \vue-ts-app\src\components\Button.vue
 -->
<template>
  <div>
    <button @click="increment">size {{count}}</button>
  </div>
</template>

<script lang="ts">
  // =================主流写法 class-style 方式=================
  // 使用这种class风格的组件声明方式并没有什么特别的好处，只是为了提供给开发者多种编码风格的选择性
  // Data： 使用类的实例属性声明
  // Medthod：使用类的实例方法声明
  // Computed： 使用Getter 属性声明
  // Hooks： 使用类的实例方法声明
  // 其他特性： 例如components，props，filters，directives之类的，则需要使用修饰器参数传入
  import Vue from 'vue'
  import component from 'vue-class-component'
  @component({
    props: {
      size: String
    }
  })
  export default class Button extends Vue {
    // data 使用类的实例属性申明
    private count: number = 6
    private text: string = 'click me'
    constructor () {
      super()
      this.count = 1
    }
    get content () {
      return `${this.text}-${this.count}`
    }
    increment () {
      this.count++
    }
    mounted() {
      console.log('button is mounted')
    }
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