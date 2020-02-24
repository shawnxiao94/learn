<!--
 * @Author: your name
 * @Date: 2020-02-24 13:11:14
 * @LastEditTime: 2020-02-24 14:04:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-ts-app\src\App.vue
 -->
<template>
<!-- template 在vue2时下只能有一个子节点，3.0后可以有多个节点 -->
  <div>
    hello {{title}}
  </div>
  <div>{{title}}</div>
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
import { defineComponent } from 'vue'
  export default defineComponent ({
    setup () {
      return {
        title: 'vue.js 3.0'
      }
    }
  })
</script>

<style lang="css" scoped>
div{
  color: blue;
}
</style>