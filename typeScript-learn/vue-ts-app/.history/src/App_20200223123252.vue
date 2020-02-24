<!--
 * @Author: your name
 * @Date: 2020-02-22 23:16:55
 * @LastEditTime: 2020-02-23 12:32:51
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-ts-app\src\App.vue
 -->
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import Button from './components/Button.vue';

@Component({
  components: {
    HelloWorld,
    Button
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
