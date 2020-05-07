<template>
  <div>
    NewsIndexDetail -- {{ $route.params }}
    <p>
      {{ content }}
    </p>
  </div>
</template>

<script>
export default {
  name: "NewsIndexDetail",
  data () {
    return {
      content: `
{
    var routeList = [];
    router.beforeEach((to, from, next) => {
      var index = -1;
    //   判断路由之前是否存在，并返回位置
      for (var i = 0; routeList.length; i++) {
        if (routeList[i].name == to.name) {
          index = i;
          break;
        }
      }
      if (index !== -1) {
        //   如果存在，则回到重复路由的之前位置
        routeList.splice(index + 1, routeList.length - index - 1);
      } else {
        //   不存在则加入循环数组内 （注1）
        routeList.push({ name: to.name, path: to.path});
      }
      to.meta.routeList = routeList;
      next();
    });
  }
}; 
}      
      `
    };
  }
};
</script>

<style lang="stylus" scoped></style>
