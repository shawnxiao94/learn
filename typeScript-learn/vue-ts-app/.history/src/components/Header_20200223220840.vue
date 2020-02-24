<!--
 * @Author: your name
 * @Date: 2020-02-23 20:55:38
 * @LastEditTime: 2020-02-23 22:08:39
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
    components: {}
  })
  export default class Header extends Vue {
    private input = ''
  // submit () {
  //   // console.log(this.input)
  //   if (!this.input) return
  //   // 触发事件的方式1
  //   this.$emit('submit', this.input)
  //   this.input = ''
  // }

    @Emit('submit')
    submit111 () {
      if (!this.input) return
      const text = this.input
      this.input = ''
      return text
    }

    mounted () {
      console.log('header component mounted')
    }    
  }
</script>

<style lang="scss" scoped>

</style>