<!--
 * @Author: your name
 * @Date: 2020-02-24 15:47:49
 * @LastEditTime: 2020-02-24 16:00:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-ts-app\src\components\Button.vue
 -->
<template>
  <div>
    <button @click="onClick">{{ props.text }}</button>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    // 仍然可以想2.0那样接收传值，后期可能废弃
    // props: {
    //   text: String
    // },
    setup (props, { emit }) {
      console.log(props)
      const onClick = () => {
        console.lpg('clicked')
        emit('foobar', Data.now())
      }
      return {
        // 这种props方式差不多是定稿了
        props,
        onClick
      }
    }
  })
</script>

<style lang="scss" scoped>

</style>