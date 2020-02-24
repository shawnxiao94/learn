<!--
 * @Author: your name
 * @Date: 2020-02-23 20:55:44
 * @LastEditTime: 2020-02-23 21:40:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-ts-app\src\components\Main.vue
 -->
<template>
  <div>
    <ul>
      <li v-for="item in todos" :key="item.text">
        <label for="">{{item.text}}</label>
        <button>click</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Todo } from './components/types.d.ts'
  // @Component({
  //   props: {
  //     todos: Array
  //   },
  //   components: {}
  // })
  @Component
  export default class Main extends Vue {
    @Prop()
    todos: Todo[]
  }
</script>

<style lang="scss" scoped>

</style>