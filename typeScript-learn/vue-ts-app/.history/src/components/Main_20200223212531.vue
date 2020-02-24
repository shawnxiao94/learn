<!--
 * @Author: your name
 * @Date: 2020-02-23 20:55:44
 * @LastEditTime: 2020-02-23 21:25:27
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

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
  @Component({
    props: {
      todos: Array
    },
    components: {

    }
  })
  export default class Main extends Vue {
    
  }
</script>

<style lang="scss" scoped>

</style>