### 关于JSON.parse(JSON.stringify(obj))
```
> 实现深拷贝应该注意的坑

JSON.parse(JSON.stringify(obj))我们一般用来深拷贝，
其过程说白了 就是利用JSON.stringify 将js对象序列化（JSON字符串），
再使用JSON.parse来反序列化(还原)js对象；
序列化的作用是存储(对象本身存储的只是一个地址映射，
，对象将不复存在，
因此需将对象的内容转换成字符串的形式再保存在磁盘上 )和传输
（例如 如果请求的Content-Type是 application/x-www-form-urlencoded，
则前端这边需要使用qs.stringify(data)来序列化参数再传给后端，否则后端接受不到；
ps:  Content-Type为application/json;
charset=UTF-8或者 multipart/form-data 则可以不需要  ）；
我们在使用 JSON.parse(JSON.stringify(xxx))时应该注意一下几点：

1、如果obj里面有时间对象，则JSON.stringify后再JSON.parse的结果，
时间将只是字符串的形式。而不是时间对象；
var test = {
    name: 'a',
    date: [new Date(1536627600000), new Date(1540047600000)]
};
let b;
b = JSON.parse(JSON.stringify(test))
// typeof b.date[0]  string
//tyoeof test.date[0] object
 
2、如果obj里有RegExp、Error对象，
则序列化的结果将只得到空对象；

const test = {
    name: 'a',
    date: new RegExp('\\w+')
};
// debugger
const copyed = JSON.parse(JSON.stringify(test));
test.name = 'test'
console.error('ddd', test, copyed)

3、如果obj里有函数，undefined，则序列化的结果会把函数或 undefined丢失；

const test = {
    name: 'a',
    date: function hehe() {
      console.log('fff')
    }
};
// debugger
const copyed = JSON.parse(JSON.stringify(test));
test.name = 'test'
console.error('ddd', test, copyed)

4、如果obj里有NaN、Infinity和-Infinity，则序列化的结果会变成null

5、JSON.stringify()只能序列化对象的可枚举的自有属性，
例如 如果obj中的对象是有构造函数生成的，
则使用JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的constructor；

function Person(name) {
    this.name = name;
    console.log(name)
}

const liai = new Person('liai');

const test = {
name: 'a',
date: liai,
};
// debugger
const copyed = JSON.parse(JSON.stringify(test));
test.name = 'test'
console.error('ddd', test, copyed)

6、如果对象中存在循环引用的情况也无法正确实现深拷贝；

以上，如果拷贝的对象不涉及上面讲的情况，可以使用JSON.parse(JSON.stringify(obj))实现深拷贝，
但是涉及到上面的情况，可以考虑使用如下方法实现深拷贝：

export function deepClone (data) {
  const type = judgeType(data)
  let obj
  if (type === 'array') {
    obj = []
  } else if (type === 'object') {
    obj = {}
  } else {
    // 不再具有下一层次
    return data
  }
  if (type === 'array') {
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]))
    }
  } else if (type === 'object') {
    // 对原型上的方法也拷贝了....
    for (const key in data) {
      obj[key] = deepClone(data[key])
    }
  }
  return obj
}

function judgeType (obj) {
  // tostring会返回对应不同的标签的构造函数
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  if (obj instanceof Element) {
    return 'element'
  }
  return map[Object.prototype.toString.call(obj)]
}

```