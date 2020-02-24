<!--
 * @Author: your name
 * @Date: 2020-02-24 13:11:14
 * @LastEditTime: 2020-02-24 13:17:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-ts-app\src\App.vue
 -->
<template>
<!-- template 在vue2时下只能有一个子节点，3.0后可以有多个节点 -->
  <div>
    hello {{title}}
  </div>
  <div></div>
</template>

<script>
import { defineComponent } from 'vue'
  export default defineComponent {
    setup () {
      return {
        title: 'vue.js 3.0'
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>