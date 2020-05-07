<template>
  <el-form
    class="settings"
    ref="form"
    label-width="260px"
    :size="$store.getters.app.size"
    :model="data.form"
  >
    <el-form-item label="菜单模式：">
      <el-radio-group
        v-model="data.form.menuMode"
        @change="change('menu')"
        :disabled="$store.getters.app.responsiveLayout.clientType === 'mobile'"
      >
        <el-radio
          v-for="item in data.options.menu"
          :key="item.value"
          :label="item.value"
          >{{ item.label }}</el-radio
        >
      </el-radio-group>
    </el-form-item>
    <el-form-item label="UI尺寸设置：">
      <el-radio-group
        v-model="data.form.size"
        size="small"
        @change="change('size')"
      >
        <el-radio-button
          v-for="item in data.options.size"
          :key="item.value"
          :label="item.label"
        ></el-radio-button>
      </el-radio-group>
    </el-form-item>
    <!-- <el-form-item label="UI主题颜色设置：">
      <el-radio-group
        v-model="data.form.theme"
        size="small"
        @change="change('theme')"
      >
        <el-radio-button
          v-for="item in data.options.theme"
          :key="item.value"
          :label="item.label"
        ></el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="语言设置：">
      <el-radio-group v-model="data.form.language" @change="change('lan')">
        <el-radio
          v-for="item in data.options.language"
          :key="item.value"
          :label="item.value"
          >{{ item.label }}</el-radio
        >
      </el-radio-group>
    </el-form-item> -->
    <el-form-item label="顶部导航是否固定定位：">
      <el-switch
        :disabled="$store.getters.app.responsiveLayout.clientType === 'mobile'"
        @change="change('topFixed')"
        v-model="data.form.topFixed"
        active-text="是"
        inactive-text="否"
      ></el-switch>
    </el-form-item>
    <el-form-item label="是否启用顶部选项卡菜单：">
      <el-switch
        @change="change('showTagsViews')"
        v-model="data.form.showTagsViews"
        active-text="是"
        inactive-text="否"
      ></el-switch>
    </el-form-item>
    <el-form-item label="是否启用全屏切换：">
      <el-switch
        @change="change('fullScreen')"
        v-model="data.form.showFullScreen"
        active-text="是"
        inactive-text="否"
      ></el-switch>
    </el-form-item>
    <el-form-item label="是否启用侧边栏菜单按钮：">
      <el-switch
        :disabled="$store.getters.app.responsiveLayout.clientType === 'mobile'"
        @change="change('showHamburger')"
        v-model="data.form.showHamburger"
        active-text="是"
        inactive-text="否"
      ></el-switch>
    </el-form-item>
  </el-form>
</template>

<script>
import { sizeFilters } from "@/common/filters/status";
export default {
  name: "SystemManageSettings",
  data () {
    return {
      data: {
        form: {
          // 菜单模式
          menuMode: this.$store.getters.app.menuMode,
          language: this.$store.getters.app.language,
          topFixed: this.$store.getters.app.topFixed,
          size: sizeFilters(this.$store.getters.app.size),
          // 全屏功能按钮是否显示
          showFullScreen: this.$store.getters.app.fullScreen,
          showTagsViews: this.$store.getters.app.showTagsViews,
          showHamburger: this.$store.getters.app.showHamburger
        },
        options: {
          menu: [
            { label: "顶部菜单", value: 1 },
            { label: "侧边栏菜单", value: 2 },
            { label: "tab菜单", value: 3 }
          ],
          language: [
            { label: "中文", value: "zh" },
            { label: "英文", value: "en" }
          ],
          size: [
            { label: "中等尺寸", value: "medium" },
            { label: "小型尺寸", value: "small" },
            { label: "超小尺寸", value: "mini" }
          ],
          theme: [
            { label: "蓝色", value: "medium" },
            { label: "绿色", value: "small" },
            { label: "红色", value: "mini" }
          ]
        }
      }
    };
  },
  methods: {
    change () {
      switch (arguments[0]) {
      case "menu":
        this.$store.dispatch("setMenuMode", this.data.form.menuMode);
        break;
      case "size":
        this.$confirm("修改UI尺寸需要刷新才能生效，是否刷新？", "确认信息", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
            this.$store.dispatch("setSize", sizeFilters(this.data.form.size));
            window.location.reload();
            this.$message({
              type: "info",
              message: "保存修改"
            });
          })
          .catch(action => {
            if (action === "cancel") {
              this.data.form.size = sizeFilters(this.$store.getters.app.size);
            }
            this.$message({
              type: "info",
              message: "已取消修改"
            });
          });
        break;
      case "lan":
        this.$store.dispatch("SetLanguage", this.data.form.language);
        break;
      case "topFixed":
        this.$store.dispatch("SetTopfixed", this.data.form.topFixed);
        break;
      case "showTagsViews":
        this.$store.dispatch("setShowTagsViews", this.data.form.showTagsViews);
        break;
      case "fullScreen":
        this.$store.dispatch(
          "ToggleFullscreen",
          this.data.form.showFullScreen
        );
        break;
      case "showHamburger":
        this.$store.dispatch("ToggleHamburger", this.data.form.showHamburger);
        break;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.settings
  padding 40px 20px
</style>
