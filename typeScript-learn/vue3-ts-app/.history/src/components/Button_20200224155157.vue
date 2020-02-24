<!--
 * @Author: your name
 * @Date: 2020-02-24 15:47:49
 * @LastEditTime: 2020-02-24 15:51:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-ts-app\src\components\Button.vue
 -->
<template>
  <div>
    <button>{{ text }}</button>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    // 仍然可以想2.0那样接收传值，后期可能废弃
    props: {
      text: String
    },
    setup () {

    }
  })
</script>

<style lang="scss" scoped>

</style>