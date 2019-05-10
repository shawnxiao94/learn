<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import { listennerDocumentEvent } from '@/common/permission/check'
export default {
  name: "App",
  mounted() {
    // 侦听5分钟内是否有操作否则跳转登录页
    // listennerDocumentEvent()
  }
};
</script>
