<!--
 * @Author: your name
 * @Date: 2020-02-24 13:11:14
 * @LastEditTime: 2020-02-24 14:28:08
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
    setup () {
      // let count = 1
      // const state = {
      //   count: 1
      // }      
      // 创建引用
      const count = ref[1]

      const incremennt = () => {
        console.log(111, count)
        count.value++
      }
      
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