// 重置路由名称
export default function(key) {
  return {
    methods: {
      setRouteName() {
        if (this.$route.query[key]) {
          this.$route.meta.oldTitle =
            this.$route.meta.oldTitle || this.$route.meta.title;
          this.$route.meta.title =
            this.$route.query[key] + " : " + this.$route.meta.oldTitle;
        }
      },
      resetRouteName() {
        // this.$route.meta.title = this.$route.meta.oldTitle;
      }
    },
    created() {
      this.setRouteName();
    },
    destroyed() {
      this.resetRouteName();
    },
    activated() {
      this.setRouteName();
    },
    deactivated() {
      this.resetRouteName();
    }
  };
}
