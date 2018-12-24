
// PageSlide接收三个参数:页面元素,要设定的滑动方向,可选的扩展函数
var PageSlide = function(el, swipe, options) {
    this.options = options || {}  //可选函数
    this.current = 0  //当前页面索引
    this.pageX  //横向的手指落点
    this.pageY   //纵向的手指落点
    this.height //设备高度
    this.width   //设备宽度
    this.flag  //判断滑动方向的变量
    this.move  //滑动的距离

    this.$el = el //当前页面的对象
    this.swipe = swipe || 'X' //滑动方向参数
    this.resize().init().bindEvents() //初始化
}


PageSlide.prototype.init = function(i) {
    var current = i ? this.$el.children[i] : this.$el.firstElementChild
    if (!current) throw 'ERROR';
//moving类名作为当前滑动页面的标记,也在样式中作滑动的扩展效果
    current.classList.add('moving')
    current.style.webkitTransform = 'translate3d(0,0,0)'
//以swipe的值预设置其他页面的宽高，获得流畅的交互效果
for(var i = 1; i <this.$el.children.length ; i++){
        this['set' + this.swipe](this.$el.children[i],  (this.swipe === 'X' ? this.width : this.height)) 
        }
    setTimeout(function() {
        current.classList.remove('moving')
        current.classList.add('play')
    }, 3e2)
    return this
}

//为页面绑定各种事件的绑定函数
PageSlide.prototype.bindEvents = function() {
    var self = this

    window.addEventListener('resize orientationchange', this.resize.bind(this), false)

    'touchstart touchmove touchend touchcancel'.split(' ').forEach(function(evn) {
   //将四个触控函数（申明在后面）绑定到每个页面
        self.$el.addEventListener(evn, self[evn].bind(self), false)
    })
}
//获得当前触控的页面对象
PageSlide.prototype.getCurrent = function() {
    return this.$el.children[this.current]
}
//初始化时获得设备的宽高
PageSlide.prototype.resize = function() {
    this.width = this.$el.parentNode.clientWidth
    this.height = this.$el.parentNode.clientHeight
    return this
}
//到达任意页面的random()方法
PageSlide.prototype.random = function() {
    var count = this.$el.children.length
    var current = this.current
    var arr = []
    var num

    for (var i = 0; i < count; i++) {
        if (i !== current) arr.push(i.toString())
    }

    num = Math.floor(Math.random() * arr.length)
    this.direct(+arr[num])
}
// 四个内建的滑动事件函数,与前面绑定函数相呼应
PageSlide.prototype.touchstart = function(e) {
    var touches = e.touches[0]

    //touch start initializing
    this.flag = null
    this.move = 0

    //record coordinates
    this.pageX = touches.pageX
    this.pageY = touches.pageY
}

PageSlide.prototype.touchmove = function(e) {
    var touches = e.touches[0]
    var X = touches.pageX - this.pageX
    var Y = touches.pageY - this.pageY
    var current = this.getCurrent()
    var next = current.nextElementSibling
    var prev = current.previousElementSibling

    //add moving styled

    if (!this.flag) {
        this.flag = Math.abs(X) > Math.abs(Y) ? 'X' : 'Y'

        if (this.flag === this.swipe) {
            current.classList.add('moving')
            next && next.classList.add('moving')
            prev && prev.classList.add('moving')
        }
    }

    if (this.flag === this.swipe) {
        e.preventDefault()
        e.stopPropagation()

        switch (this.swipe) {
            case 'X':
                //swipe horizontal
                this.move = X

                this.setX(current, X)
                next && (this.setX(next, X + this.width))
                prev && (this.setX(prev, X - this.width))
                break;
            case 'Y':
                //swipe vertical
                this.move = Y

                this.setY(current, Y)
                next && (this.setY(next, Y + this.height))
                prev && (this.setY(prev, Y - this.height))
                break;
        }
    }
}

PageSlide.prototype.touchend = function(e) {
    var minRange = 50
    var move = this.move
    var current = this.getCurrent()
    var next = current.nextElementSibling
    var prev = current.previousElementSibling

    current.classList.remove('moving')
    next && next.classList.remove('moving')
    prev && prev.classList.remove('moving')
    if (!this.flag) return

    e.preventDefault()
   //滑动结束前往下一页面,next()方法调用了go()方法
    if (move < -minRange && next) return this.next()
    if (move > minRange && prev) return this.prev()
    this.reset()
}

PageSlide.prototype.touchcancel = function(e) {
    var current = this.getCurrent()
    var next = current.nextElementSibling
    var prev = current.previousElementSibling

    current.classList.remove('moving')
    next && next.classList.remove('moving')
    prev && prev.classList.remove('moving')
    this.reset()
}

//动态设定translate3d参数方法
PageSlide.prototype.setX = function(el, x, unit) {
    el && (el.style.webkitTransform = 'translate3d(' + x + (unit || 'px') + ',0,0)')
}

PageSlide.prototype.setY = function(el, y, unit) {
    el && (el.style.webkitTransform = 'translate3d(0,' + y + (unit || 'px') + ',0)')
}
//设置当前触控页面translate3d参数为0的方法
PageSlide.prototype.setCurrent = function(el, i) {
    el && (el.style.webkitTransform = 'translate3d(0,0,0)')

    if (i) {
        this.current = i
        this.$current = this.$el.children[i]
    }

}
//调用go()方法前往下一或上一页面
PageSlide.prototype.next = function() {
    this.go(this.current + 1)
}

PageSlide.prototype.prev = function() {
    this.go(this.current - 1)
}
//重置方法,用于初始化以及当前页面的重置
PageSlide.prototype.reset = function() {
    var width = this.width
    var height = this.height
    var swipe = this.swipe
    var current = this.getCurrent()
    var prev = current.previousElementSibling
    var next = current.nextElementSibling

    this.setCurrent(current)
    prev && (this['set' + swipe](prev, -(swipe === 'X' ? width : height)))
    next && (this['set' + swipe](next, swipe === 'X' ? width : height))
}
//去往下一或上一页面的go方法
PageSlide.prototype.go = function(i) {
    var onFinish = this.options.onFinish
    var current = this.getCurrent()
    var total = this.$el.childElementCount
    var target = this.$el.children[i]
    var d = i < this.current ? -1 : 1


    if (i === this.current || i < 0 || i >= total) return
    if (onFinish && (typeof onFinish === 'function')) onFinish.call(this, i)
    // 滑动完成调用方法
    typeof this.options.tranSetionEnd ==='function' && this.options.tranSetionEnd.call(this)
    this.current = i

    this['set' + this.swipe](current, -d * (this.swipe === 'X' ? this.width : this.height))
    this.setCurrent(target, i)
    this.finish(current, target)
}
//滑动完成后删除当前页面.play标记以及为下一页面添加.play标记
PageSlide.prototype.finish = function(curr, target) {
    this.flag = null
    setTimeout(function() {
        curr && curr.classList.remove('play')
        target && target.classList.add('play')
    }, 3e2)
}

/*direct to a page */ 
//直达某一页面的方法, 因为有个项目的需要,写了这个方法,要从任意页面开始滑动依然能保持正常的滑动体验,就需要将直达页面的前面所有页面的translate3d参数都设置为(0,-height,0)  
PageSlide.prototype.direct = function(i){
    if(i&&typeof(i)==='number') 
       { 
       this.go(i) 
    for(var j = 0; j< i ;j++) {
        this['set' + this.swipe](this.$el.children[j], -1 * (this.swipe === 'X' ? this.width : this.height))       
        }
       }
    else  return
        
    
    }



/*========================================================怎么挪动小数点肯定大家是各有妙招，此处附上我写的几个方法： ==========================*/

/**
 * 左补齐字符串
 * 
 * @param nSize
 *            要补齐的长度
 * @param ch
 *            要补齐的字符
 * @return
 */
String.prototype.padLeft = function(nSize, ch)
{
    var len = 0;
    var s = this ? this : "";
    ch = ch ? ch : '0';// 默认补0

    len = s.length;
    while (len < nSize)
    {
        s = ch + s;
        len++;
    }
    return s;
}

/**
 * 右补齐字符串
 * 
 * @param nSize
 *            要补齐的长度
 * @param ch
 *            要补齐的字符
 * @return
 */
String.prototype.padRight = function(nSize, ch)
{
    var len = 0;
    var s = this ? this : "";
    ch = ch ? ch : '0';// 默认补0

    len = s.length;
    while (len < nSize)
    {
        s = s + ch;
        len++;
    }
    return s;
}
/**
 * 左移小数点位置（用于数学计算，相当于除以Math.pow(10,scale)）
 * 
 * @param scale
 *            要移位的刻度
 * @return
 */
String.prototype.movePointLeft = function(scale)
{
    var s, s1, s2, ch, ps, sign;
    ch = '.';
    sign = '';
    s = this ? this : "";

    if (scale <= 0) return s;
    ps = s.split('.');
    s1 = ps[0] ? ps[0] : "";
    s2 = ps[1] ? ps[1] : "";
    if (s1.slice(0, 1) == '-')
    {
        s1 = s1.slice(1);
        sign = '-';
    }
    if (s1.length <= scale)
    {
        ch = "0.";
        s1 = s1.padLeft(scale);
    }
    return sign + s1.slice(0, -scale) + ch + s1.slice(-scale) + s2;
}
/**
 * 右移小数点位置（用于数学计算，相当于乘以Math.pow(10,scale)）
 * 
 * @param scale
 *            要移位的刻度
 * @return
 */
String.prototype.movePointRight = function(scale)
{
    var s, s1, s2, ch, ps;
    ch = '.';
    s = this ? this : "";

    if (scale <= 0) return s;
    ps = s.split('.');
    s1 = ps[0] ? ps[0] : "";
    s2 = ps[1] ? ps[1] : "";
    if (s2.length <= scale)
    {
        ch = '';
        s2 = s2.padRight(scale);
    }
    return s1 + s2.slice(0, scale) + ch + s2.slice(scale, s2.length);
}
/**
 * 移动小数点位置（用于数学计算，相当于（乘以/除以）Math.pow(10,scale)）
 * 
 * @param scale
 *            要移位的刻度（正数表示向右移；负数表示向左移动；0返回原值）
 * @return
 */
String.prototype.movePoint = function(scale)
{
    if (scale >= 0)
        return this.movePointRight(scale);
    else
        return this.movePointLeft(-scale);
}

/*
3.2 四舍五入 
好，有了升级降级的基础，我们来看看四舍五入的方法，由于不同浏览器对Number的toFixed方法有不同的支持，
我们需要用自己的方法去覆盖浏览器的默认实现。 
有一个简单的办法是我们自己来判断要截取数据的后一位是否大于等于5，
然后进行舍或者入。我们知道Math.ceil方法是取大于等于指定数的最小整数，
Math.floor方法是取小于等于指定数的最大整数，于是我们可以利用这两个方法来进行舍入处理，
先将要进行舍入的数升级要舍入的位数scale（乘以10的scale次方），进行ceil或floor取整后，再降级要舍入的位数scale（除以10的scale次方）。 
*/
Number.prototype.toFixed = function(scale)
{
    var s, s1, s2, start;

    s1 = this + "";
    start = s1.indexOf(".");
    s = s1.movePoint(scale);

    if (start >= 0)
    {
        s2 = Number(s1.substr(start + scale + 1, 1));
        if (s2 >= 5 && this >= 0 || s2 < 5 && this < 0)
        {
            s = Math.ceil(s);
        }
        else
        {
            s = Math.floor(s);
        }
    }

    return s.toString().movePoint(-scale);
}
/* 
alert(Number(0.009).toFixed(2));//弹出0.01
alert(Number(162.295).toFixed(2));//弹出162.30
*/