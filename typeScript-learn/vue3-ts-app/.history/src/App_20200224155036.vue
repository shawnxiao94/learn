<!--
 * @Author: your name
 * @Date: 2020-02-24 13:11:14
 * @LastEditTime: 2020-02-24 15:50:36
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
  <div>{{count}} --- {{state.message}}</div>
  <div>doubleCount--- {{doubleCount}}</div>
  <Button text="test props"/>
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
  import { defineComponent, ref, reactive, computed, onMounted, onUnmounted } from 'vue'
  // Data, Method,Hooks,Computed,Props,Emit,Components
  import Button from './components/Button.vue'

  export default defineComponent ({
    components: {
      Button
    },
    // 组件初始化执行，比vue2的created还早一些
    setup () {
      // let count = 1
      // const state = {
      //   count: 1
      // }      
      // 创建引用
      // 普通值string,number,boolean数据响应用ref,对象数据做响应用 reactive
      const count = ref(1)
      const state = reactive({
        message: 'hello'
      })
      // 计算属性使用范例
      const doubleCount = computed(() => count.value + 2)

      const incremennt = (e) => {
        count.value++
        state.message = 'helle world'
        console.log(e, count)

      }

      onMounted(() => {
        // 相对与vue2的mounted 生命周期函数
        console.log('onMounted=>mounted')
      })

      onUnmounted(() => {
        console.log('onUnmounted')
      })

      // setup返回值中的成员可以在模版中直接使用
      return {
        title: 'vue.js 3.0',
        count,
        doubleCount,
        incremennt,
        state
      }
    }
  })
</script>

<style lang="css" scoped>
div{
  color: blue;
}
</style>