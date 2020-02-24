<!--
 * @Author: your name
 * @Date: 2020-02-22 23:16:55
 * @LastEditTime: 2020-02-23 21:19:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-ts-app\src\App.vue
 -->
<template>
  <section class="todoapp">
    <Header></Header>
    <Main></Main>
    <Footer></Footer>
    <Button size="100x20"/>
  </section>
</template>

<script lang="ts">
interface Todo {
  text: string
  completed: boolean
}
import { Vue, Component } from 'vue-property-decorator'
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import Footer from './components/Footer.vue'
import Button from './components/Button.vue';
// 能在class内部实现的特性都在内部使用,不能在内部实现的都用components装饰器的参数传递
  @Component({
    components: {
      Header,
      Main,
      Footer,
      Button
    }
  })
  export default class App extends Vue {
    private todos: Todo[]
    constructor () {
      super()
      this.todos = [
        {text: 'aa',completed: false}
      ]
    }
  }
</script>

