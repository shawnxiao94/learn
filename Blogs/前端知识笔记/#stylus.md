### 变量
```
$font-size = 14px
body {
  font:$font-size sans-serif;
}
```
### 属性查找
```
1: 定义引用属性用法
#logo
  position: absolute
  top: 50%
  left: 50%
  width: w = 150px
  height: h = 80px
  margin-left: -(w / 2)
  margin-top: -(h / 2)
  
  2:@用法
  #logo
  position: absolute
  top: 50%
  left: 50%
  width: 150px
  height: 80px
  margin-left: -(@width / 2)
  margin-top: -(@height / 2)
  
  3:unless用法
  
  另外使用案例是基于其他属性有条件地定义属性。在下面这个例子中，我们默认指定z-index值为1，但是，只有在z-index之前未指定的时候才这样
  position()
  position: arguments
  z-index: 1 unless @z-index

#logo
  z-index: 20
  position: absolute

#logo2
  position: absolute
  
  
  属性会“向上冒泡”查找堆栈直到被发现，或者返回null（如果属性搞不定）。
  下面这个例子，@color被弄成了blue.

body
  color: red
  ul
    li
      color: blue
      a
        background-color: @color
        
```
### 插值(Interpolation)
```
vendor(prop, args)
  -webkit-{prop} args
  -moz-{prop} args
  {prop} args

border-radius()
  vendor('border-radius', arguments)

box-shadow()
  vendor('box-shadow', arguments)

button
  border-radius 1px 2px / 3px 4px
  
  
变身：
button {
  -webkit-border-radius: 1px 2px / 3px 4px;
  -moz-border-radius: 1px 2px / 3px 4px;
  border-radius: 1px 2px / 3px 4px;
}
```
### 选择器插值
```
插值也可以在选择器上起作用。例如，我们可以指定表格前5行的高度，如下：

table
  for row in 1 2 3 4 5
    tr:nth-child({row})
      height: 10px * row
也就是：

table tr:nth-child(1) {
  height: 10px;
}
table tr:nth-child(2) {
  height: 20px;
}
table tr:nth-child(3) {
  height: 30px;
}
table tr:nth-child(4) {
  height: 40px;
}
table tr:nth-child(5) {
  height: 50px;
}
```