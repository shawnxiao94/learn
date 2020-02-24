<!--
 * @Author: your name
 * @Date: 2020-02-24 13:11:14
 * @LastEditTime: 2020-02-24 13:15:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-ts-app\src\App.vue
 -->
<template>
  <div>
    hello {{title}}
  </div>
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