<!--
 * @Author: your name
 * @Date: 2020-02-23 12:31:02
 * @LastEditTime: 2020-02-23 12:34:09
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
  // 写法一：导出对象方式
  export default {
    name: 'Button',
    data () {
      return {
        count: 1
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>