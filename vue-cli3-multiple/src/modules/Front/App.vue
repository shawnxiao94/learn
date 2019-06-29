<template>
  <div id="app-home-front" v-wechat-title="$route.meta.title">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'AppHomeFront'
}
</script>
