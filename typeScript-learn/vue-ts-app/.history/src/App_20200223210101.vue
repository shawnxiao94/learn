<!--
 * @Author: your name
 * @Date: 2020-02-22 23:16:55
 * @LastEditTime: 2020-02-23 21:01:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-ts-app\src\App.vue
 -->
<template>
  <div id="app">
    <Button size="100x20"/>
  </div>
</template>

<script lang="ts">
import Button from './components/Button.vue';

import { Vue, Component } from 'vue-property-decorator'
import Header from './components/Header.vue'
  @Component({
    components: {
      Header,
      
      Button
    }
  })
  export default class App extends Vue {
    
  }
</script>

