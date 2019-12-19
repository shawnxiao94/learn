<template>
  <div>
    HomePage
    <img class="avatar" :src="require('@/assets/images/test.jpg')" alt=""/>
    <div class="box">
      <p>stylus</p>
    </div>
    <div class="teststyl">test-styl</div>
  </div>
</template>

<script>
import "@/assets/styles/box.styl";
export default {
  name: "HomePage"
};
</script>

<style lang="stylus" scoped>
.teststyl
  color green
</style>
