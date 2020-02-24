<!--
 * @Author: your name
 * @Date: 2020-02-23 12:31:02
 * @LastEditTime: 2020-02-23 12:36:13
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
    },
    mounted () {
      console.log(this.count)
    }
  }
</script>

<style lang="scss" scoped>

</style>