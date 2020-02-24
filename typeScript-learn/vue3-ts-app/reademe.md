<!--
 * @Author: your name
 * @Date: 2020-02-23 23:46:36
 * @LastEditTime: 2020-02-24 15:46:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-ts-app\reademe.md
 -->
```
### vue3.0
安装=> yarn add vue@next // 下一个版本
工具安装=> yarn add webpack webpack-cli webpack-dev-server -D // vue3还没出支持vue的vue-cli工具，所以手动配
vue3  必须用到的插件 yarn add @vue/compiler-sfc vue-loader@next -D

#### vue3.0 废弃了this，没了this，cxt上下文替代,
变量声明没有了data，直接return返回，通过ref包一层进行数据引用来达到数据更新
### template模版可以有多个子节点，vue2只能有一个子节点

### vue3 方法都通过引入实现，通过tree shaking 摇晃掉不要的方法模块达到节省空间

### VUE3.0优势
1.没有this
2.更好的类型推导能力
3.更大的代码压缩空间
4.更友好的Tree Shaking支持
5.更灵活的逻辑复用能力
```