<!--
 * @Author: your name
 * @Date: 2020-02-22 23:16:55
 * @LastEditTime: 2020-02-23 21:08:13
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
import Button from './components/Button.vue';

import { Vue, Component } from 'vue-property-decorator'
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import Footer from './components/Footer.vue'
// 能在class内部实现的特性都在内部使用
  @Component({
    components: {
      Header,
      Main,
      Footer,
      Button
    }
  })
  export default class App extends Vue {
    
  }
</script>

