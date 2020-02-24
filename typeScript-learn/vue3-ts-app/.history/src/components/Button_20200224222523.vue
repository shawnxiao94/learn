<!--
 * @Author: your name
 * @Date: 2020-02-24 15:47:49
 * @LastEditTime: 2020-02-24 22:25:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-ts-app\src\components\Button.vue
 -->
<template>
  <div>
    <button @click="onClick">{{ props.text }}</button>
    <div>width*heihgt=>{{width}}*{{height}}</div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  import windowSize from '../utils/window-size'
  
  export default defineComponent({
    // 仍然可以想2.0那样接收传值，后期可能废弃
    // props: {
    //   text: String
    // },
    setup (props, { emit }) {
      console.log(props)
      const onClick = () => {
        console.log('clicked')
        emit('foobar', Date.now())
      }

      // 类似react hooks但vue里它只执行一次，但react执行多次
      const { width, height } = windowSize()

      return {
        // 这种props方式差不多是定稿了
        props,
        onClick,
        width,
        height
      }
    }
  })
</script>

<style lang="scss" scoped>

</style>