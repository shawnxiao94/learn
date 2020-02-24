<!--
 * @Author: your name
 * @Date: 2020-02-23 20:55:44
 * @LastEditTime: 2020-02-23 22:00:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-ts-app\src\components\Main.vue
 -->
<template>
  <section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox">
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <!-- These are here just to show the structure of the list items -->
      <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
      <li v-for="item in todos" :key="item.text" :class="{ completed: item.completed }">
        <div class="view">
          <input class="toggle" type="checkbox" :checked="item.completed">
          <label>{{ item.text }}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Todo } from '../types'
  // @Component({
  //   props: {
  //     todos: Array
  //   },
  //   components: {}
  // })
  @Component
  export default class Main extends Vue {
    @Prop(Array)
    readonly todos!: Todo[]
  }
</script>

<style lang="scss" scoped>

</style>