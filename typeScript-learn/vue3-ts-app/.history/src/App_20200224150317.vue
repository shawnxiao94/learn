<!--
 * @Author: your name
 * @Date: 2020-02-24 13:11:14
 * @LastEditTime: 2020-02-24 15:03:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-ts-app\src\App.vue
 -->
<template>
  <!-- template 在vue2时下只能有一个子节点，3.0后可以有多个节点 -->
  <div>
    hello {{title}}
  </div>
  <button @click="incremennt">click add</button>
  <div>{{count}}</div>
  <input type="text">
</template>

<script>
// 两种写法
// export default {
//   setup () {
//     return {
//       title: 'vue 3.0'
//     }
//   }
// }
  import { defineComponent, ref } from 'vue'
  export default defineComponent ({
    // 组件初始化执行，比vue2的created还早一些
    setup () {
      // let count = 1
      // const state = {
      //   count: 1
      // }      
      // 创建引用
      const count = ref(1)

      const incremennt = () => {
        count.value++
        console.log(111, count)

      }
      // setup返回值中的成员可以在模版中直接使用
      return {
        title: 'vue.js 3.0',
        count,
        incremennt
      }
    }
  })
</script>

<style lang="css" scoped>
div{
  color: blue;
}
</style>