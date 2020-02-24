<!--
 * @Author: your name
 * @Date: 2020-02-23 20:55:38
 * @LastEditTime: 2020-02-23 22:05:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-ts-app\src\components\Header.vue
 -->
<template>
  <header class="header">
    <h1>todos</h1>
    <input
      class="new-todo"
      placeholder="What needs to be done?"
      autofocus
      v-model.trim="input"
      @keyup.enter="submit111"
    />
  </header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
  @Component({
    components: {

    }
  })
  export default class Header extends Vue {
    
  }
</script>

<style lang="scss" scoped>

</style>