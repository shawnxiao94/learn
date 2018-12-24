### 坑一：指令与v-for循环共用时：
```
自定义指令和v-for共用，v-for的数据发生变化时，自定义指令传的参数并没有改变，还是第一次渲染是的参数，大概是这样的：
<template>
    <ul>
        <li v-for="item in list" v-tap="item">第{{ item }}个</li>
    </ul>
</template>
<script>
    data(){
        return{
            list:[ 1,2,3,4,5 ],
            list1:[ 'a','b','c','d' ]
        }
    },
    directives:{
        tap:{
            bind:function(el,binding){
            console.log(binding.value)
            //第一次渲染时，打印的是1，2，3，4
            //当list的值变成list1的值是，没有重新打印 
            //也就是说，dom没有重新渲染，指令里接收的值还是1，2，3，4
            }
        }
    }
</script>

为什么dom没有重新渲染呢，这源于v-for的就地复用机制 
官方的解释是： 
当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。这个类似 Vue 1.x 的 track-by=”$index” 。

这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出。

为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性。理想的 key 值是每项都有的且唯一的 id。这个特殊的属性相当于 Vue 1.x 的 track-by ，但它的工作方式类似于一个属性，所以你需要用 v-bind 来绑定动态值 (在这里使用简写)：

<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>


简单来说就地复用就是能继续用的dom就不重新渲染，这就导致了自定义指令传参一直是第一次渲染的数据，我试了一下官方的解决方案，确实可以，dom被强制渲染了，后来我想找一种自定义指令里就可以解决的方法，还真让我找到了，自定义指令钩子函数的第三个参数vnode：Vue 编译生成的虚拟节点。 
打印这个虚拟节点里面有一个key，这个key就是上面说到的key，只要给他赋一个唯一的id，就可以强制dom刷新了

directives:{
    tap:{
        bind:function(el,binding,vnode){
            console.log(vnode)
            vnode.key = '一个唯一的id'
        }
    }
}
```


### 坑二：路由开启keep-alive时的注意点：
```
>> 1. 什么阶段获取数据

页面生命周期钩子如上面的代码所示，这四个是最常用到的部分。
这部分需要注意下，当引入keep-alive 的时候，页面第一次进入，钩子的触发顺序created-> mounted-> activated，退出时触发deactivated
。当再次进入（前进或者后退）时，只触发activated。

我们知道 keep-alive 之后页面模板第一次初始化解析变成HTML片段后，
再次进入就不在重新解析而是读取内存中的数据，即，只有当数据变化时，才使用VirtualDOM进行diff更新。
故，页面进入的数据获取应该在activated中也放一份。
数据下载完毕手动操作DOM的部分也应该在activated中执行才会生效。

所以，应该activated中留一份数据获取的代码，或者不要created部分，
直接将created中的代码转移到activated中。


>> 2. $route 中的数据读不到


以前的写法是在data中将需要的 $route 数据进行赋值，便于其余方法使用，
但是使用了 keep-alive 后数据需要进入页面在activated中再次获取，才能达到更新的目的。
定义一个initData方法，然后在activated中启动。

initData: function () {
        let _this = this;
        _this.fromLocation = JSON.parse(this.$route.query.fromLocation);
        _this.toLocation = JSON.parse(this.$route.query.toLocation);
        _this.activeIndex = parseInt(this.$route.params.activeIndex) || 0;
        _this.policyType = parseInt(this.$route.params.policyType) || 0;
      },
      
      
>> 3. 当页动态修改url


需求描述：当页面在进行轮播操作的时候希望能记录当前显示的轮播ID(activeIndex)。当进入下一个页面再返回的时候能记住之前的选择，将轮播打到之前的ID位置。
所以我想将这部分信息固化在url中，轮播发生变化时，修改URL。这样实现比较符最小修改原则，其余页面不用变动。

之前的写法是将activeIndex放在 $route 的query中，当轮播后，将

activeIndex的值存入 $route.query.activeIndex 中，然后 $router.replace 当前路由，理论上应该能发生变化，但实际没有。

查看文档后说， $route 是只读模式。当然，对象部分是他监管不到的，我修改了并不是正统的做法。

神奇的地方来了：当我将activeIndex记在params中，轮播变动修改params中的参数，然后 $router.replace 当前路由，却能发生对应的变化。代码如下：

let swiperInstance = new Swiper('#swiper', {
    pagination: '.swiper-pagination',
    paginationClickable: false,
    initialSlide: activeIndex,
    onSlideChangeEnd: function (swiper) {
        let _activeIndex = swiper.activeIndex;
        _this.$route.params.activeIndex = _activeIndex;
        // $router我放到了window上方便调用
        window.$router.replace({
            name: _this.$route.name,
            params: _this.$route.params,
            query: _this.$route.query
        });
        // 根据activeIndex，在这里初始化下面显示的数据
        _this.transferDetail = _this.allData.plans[_activeIndex].segments;
        _this.clearBusDetailFoldState();
    }
});


>> 4. 事件如何处理


估计你也能猜到，发生的问题是事件绑定了很多次，比如上传点击input监听change事件，突然显示了多张相同图片的问题。

也就是说，DOM在编译后就缓存在内容中了，如果再次进入还再进行事件绑定初始化则就会发生这个问题。

解决办法：在mounted中绑定事件，因为这个只执行一次，并且DOM已准备好。
如果插件绑定后还要再执行一下事件的handler函数的话，那就提取出来，放在activated中执行。
比如：根据输入内容自动增长textarea的高度，这部分需要监听textarea的input和change事件，
并且页面进入后还要再次执行一次handler函数，更新textarea高度（避免上次输入的影响）。

>> 5. 地图组件处理


想必这是使用 keep-alive 最直接的性能表现。之前是进入地图页面后进行地图渲染+线路标记；
现在是清除以前的线路标记绘制新的线路，性能优化可想而知！

我这里使用的是高德地图，在mounted中初始化map，代码示例如下：

export default {
    name: 'transferMap',
    data: function () {
        return {
            map: null,
        }
    },
    methods: {
        initData: function () {},
        searchTransfer: function (type) {},
        // 地图渲染 这个在transfer-map.html中使用
        renderTransferMap: function (transferMap) {}
    },
    mounted: function () {
        this.map = new AMap.Map("container", {
            showBuildingBlock: true,
            animateEnable: true,
            resizeEnable: true,
            zoom: 12 //地图显示的缩放级别
        });
    },
    activated: function () {
        let _this = this;
        _this.initData();
        // 设置title
        setDocumentTitle('换乘地图');
        _this.searchTransfer(_this.policyType).then(function (result) {
            // 数据加载完成
            // 换乘地图页面
            let transferMap = result.plans[_this.activeIndex];
            transferMap.origin = result.origin;
            transferMap.destination = result.destination;
            // 填数据
            _this.transferMap = transferMap;
            // 地图渲染
            _this.renderTransferMap(transferMap);
        });
    },
    deactivated: function () {
        // 清理地图之前的标记
        this.map.clearMap();
    },
}


>> 6. document.title修改


这个不是 keep-alive 的问题，不过我也在这里分享下。

问题是，使用下面这段方法，可以修改Title，但是页面来回切换多次后就不生效了，
我也不知道为啥，放到setTimeout中就直接不执行。

document.title = '页面名称';
下面是使用2种环境的修复方法：

纯js实现

function setDocumentTitle(title) {
    "use strict";
    //以下代码可以解决以上问题，不依赖jq
    setTimeout(function () {
        //利用iframe的onload事件刷新页面
        document.title = title;
        var iframe = document.createElement('iframe');
        iframe.src = '/favicon.ico'; // 必须
        iframe.style.visibility = 'hidden';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.onload = function () {
            setTimeout(function () {
                document.body.removeChild(iframe);
            }, 0);
        };
        document.body.appendChild(iframe);
    }, 0);
}

```

### #vue中各选项及钩子函数执行顺序
```
在页面首次加载执行顺序有如下：

beforeCreate //在实例初始化之后、创建之前执行
created //实例创建后执行
beforeMounted //在挂载开始之前调用
filters //挂载前加载过滤器
computed  //计算属性
directives-bind //只调用一次，在指令第一次绑定到元素时调用
directives-inserted //被绑定元素插入父节点时调用
activated //keek-alive组件被激活时调用，则在keep-alive包裹的嵌套的子组件中触发
mounted //挂载完成后调用

{{}} //mustache表达式渲染页面



修改页面input时，被自动调用的选项顺序如下：
watch //首先先监听到了改变事件
filters  //过滤器没有添加在该input元素上，但是也被调用了
beforeUpdate //数据更新时调用，发生在虚拟dom打补丁前
directived-update//指令所在的组件的vNode更新时调用，但可能发生在其子vNode更新前
directives-componentUpdated//指令所在的组件的vNode及其子组件的vNode全部更新后调用
updated //组件dom已经更新



组件销毁时，执行顺序如下
beforeDestroy //实例销毁之前调用
directives-unbind  //指令与元素解绑时调用，只调用一次
deactivated //keep-alive组件停用时调用
destroyed //实例销毁之后调用


```