> Koa 是由 Express 原班人马打造的，致力于成为一个更小、更富有表现力、更健壮的 Web 框架，采用了async和await的方式执行异步操作

> Koa 依赖 node v7.6.0 或 ES2015及更高版本和 async 方法支持

### koa2特性
```
只提供封装好http上下文、请求、响应，以及基于async/await的中间件容器。
利用ES7的async/await的来处理传统回调嵌套问题和代替koa@1的generator，
但是需要在node.js7.x的harmony模式下才能支持async/await。
中间件只支持async/await封装的，如果要使用koa@1基于generator中间件，
需要通过中间件koa-convert封装一下才能使用。
```


### HTTP Response 的类型
```
Koa 默认的返回类型是text/plain，
如果想返回其他类型的内容，可以先用ctx.request.accepts判断一下，
客户端希望接受什么数据（根据 HTTP Request 的Accept字段），
然后使用ctx.response.type指定返回类型

const Koa = require('koa');
const app = new Koa();

const main = ctx => {
  if (ctx.request.accepts('xml')) {
    ctx.response.type = 'xml';
    ctx.response.body = '<data>Hello World</data>';
  } else if (ctx.request.accepts('json')) {
    ctx.response.type = 'json';
    ctx.response.body = { data: 'Hello World' };
  } else if (ctx.request.accepts('html')) {
    ctx.response.type = 'html';
    ctx.response.body = '<p>Hello World</p>';
  } else {
    ctx.response.type = 'text';
    ctx.response.body = 'Hello World';
  }
};

app.use(main);
app.listen(3000);
```

### 使用cookie
```
koa提供了从上下文直接读取、写入cookie的方法
ctx.cookies.get(name, [options])
读取上下文请求中的cookie
ctx.cookies.set(name, value, [options])
在上下文中写入cookie

const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {

  if ( ctx.url === '/index' ) {
    ctx.cookies.set(
      'cid', 
      'hello world',
      {
        domain: 'localhost',  // 写cookie所在的域名
        path: '/index',       // 写cookie所在的路径
        maxAge: 10 * 60 * 1000, // cookie有效时长
        expires: new Date('2017-02-15'),  // cookie失效时间
        httpOnly: false,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
      }
    )
    ctx.body = 'cookie is ok'
  } else {
    ctx.body = 'hello world' 
  }

})

app.listen(3000, () => {
  console.log('[demo] cookie is starting at port 3000')
})
访问http://localhost:3000/index
可以在控制台的cookie列表中中看到写在页面上的cookie
在控制台的console中使用document.cookie可以打印出在页面的所有cookie（需要是httpOnly设置false才能显示）

```

### 路由
```
> koa是个极简的web框架，简单到连路由模块都没有配备，我们先来可以根据ctx.request.url或者ctx.request.path获取用户请求的路径，来实现简单的路由。

const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  let _html = '404 NotFound'
  switch (ctx.url) {
    case '/':
      _html = '<h1>Index</h1>';
      break;
    case '/adout':
      _html = '<h1>About</h1>';
      break;
    case '/hello':
      _html = '<h1>world</h1>';
      break;
    default:
      break;
  }
  ctx.body = _html;
});

app.listen(3000);

运行这段代码，访问http://localhost:3000/hello将看见world，
访问http://localhost:3000/about将看见返回about，
访问http://localhost:3000将看见Index。是不是很有成就感…但是这也太麻烦了吧。
如果依靠ctx.request.url去手动处理路由，将会写很多代码，
这时候就需要对应的路由中间件来对路由进行控制: koa-router
```

### 使用koa-router中间件
```

> npm i koa-router --save

const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
  let html = `
      <ul>
        <li><a href="/hello">helloworld</a></li>
        <li><a href="/about">about</a></li>
      </ul>
    `
  ctx.body = html
}).get('/hello', async (ctx) => {
  ctx.body = 'helloworld'
}).get('/about', async (ctx) => {
  ctx.body = 'about'
})

app.use(router.routes(), router.allowedMethods())

app.listen(3000);
```

### 多路由
```
const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')

let homerouter = new Router()
homerouter.get('/demo', async(ctx) => {
  ctx.body = 'demo home page'
}).get('/todo', async(ctx) => {
  ctx.body = 'demo home todo'
})

let pagerouter = new Router()
pagerouter.get('/demo',async(ctx) =>{
  ctx.body = 'page demo'
}).get('/todo', async(ctx) => {
  ctx.body = 'page todo'
})

// 装载所有子路由 
let router = new Router()
router.use('/home',homerouter.routes(), homerouter.allowedMethods())
router.use('/page',pagerouter.routes(), pagerouter.allowedMethods())

// 加载路由中间件
app.use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, _ => {
  console.log('demo server is starting at port 3000')
})
```

### 中间件
```
Koa 的最大特色，也是最重要的一个设计，就是中间件（middleware）Koa 应用程序是一个包含一组中间件函数的对象，它是按照类似堆栈的方式组织和执行的。
Koa中使用app.use()用来加载中间件，基本上Koa 所有的功能都是通过中间件实现的。
每个中间件默认接受两个参数，第一个参数是 Context 对象，第二个参数是next函数。只要调用next函数，就可以把执行权转交给下一个中间件

我们来运行Koa官网这个小例子：

const Koa = require('koa');
const app = new Koa();

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// response

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);

上面的执行顺序就是：
请求 ==> x-response-time中间件 ==> logger中间件 ==> 响应中间件 ==> logger中间件 ==> response-time中间件 ==> 响应。
通过这个顺序我们可以发现这是个栈结构以"先进后出"（first-in-last-out）的顺序执行。
Koa已经有了很多好用的中间件(https://github.com/koajs/koa/wiki#middleware)你需要的常用功能基本上都有人实现了
```

### 模版引擎
```
在实际开发中，返回给用户的网页往往都写成模板文件。 
Koa 先读取模板文件，然后将这个模板返回给用户，这事我们就需要使用模板引擎了，
关于Koa的模版引擎，我们只需要安装koa模板使用中间件koa-views 
然后在下载你喜欢的模板引擎(支持列表)便可以愉快的使用了。如安装使用ejs

# 安装koa模板使用中间件
$ npm i --save koa-views

# 安装ejs模板引擎
$ npm i --save ejs
const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()

// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}))

app.use(async (ctx) => {
    let title = 'Koa2'
    await ctx.render('index', {
        title,
    })
})

app.listen(3000)
./view/index.ejs 模板

<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
</head>
<body>
    <h1><%= title %></h1>
    <p>EJS Welcome to <%= title %></p>
</body>
</html>
打开http://localhost:3000/，你将看到返回了页面：
```

### 静态资源服务器
```
网站一般都提供静态资源（图片、字体、样式表、脚本……），
我们可以自己实现一个静态资源服务器，但这没必要，
koa-static模块封装了这部分功能。

$ npm i --save koa-static
const Koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app = new Koa()

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'

app.use(static(
  path.join(__dirname, staticPath)
))

app.use(async (ctx) => {
  ctx.body = 'hello world'
})

app.listen(3000)
我们访问http://localhost:3000/css/app.css 将返回app.css 的内容，
访问http://localhost:3000/koa2.png我们将看见返回图
```
### 请求数据的获取
```
1.GET请求参数的获取

在koa中，获取GET请求数据源头是koa中request对象中的query方法或querystring方法，
query返回是格式化好的参数对象，querystring返回的是请求字符串。

请求对象ctx.query(或ctx.request.query)，返回如 { a:1, b:2 }
请求字符串 ctx.querystring(或ctx.request.querystring)，返回如 a=1&b=2
const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {
  const url = ctx.url
  const query = ctx.query
  const querystring = ctx.querystring

  ctx.body = {
    url,
    query,
    querystring
  }
})

app.listen(3000)
运行程序并访问http://localhost:3000/?page=2&limit=10，
我们将得到如下结果

{"url":"/?page=2&limit=10","query":{"page":"2","limit":"10"},"querystring":"page=2&limit=10"}
对了，在这儿推荐个插件：JSONView，用了它你将得到格式化json数据，如下：

{
  url: "/?page=2&limit=10",
  query: {
    page: "2",
    limit: "10"
  },
  querystring: "page=2&limit=10"
}
更多Koa Request API 请查看http://koajs.com/#request


2.POST请求数据获取

对于POST请求的处理，koa2没有封装获取参数的方法，
需要通过自己解析上下文context中的原生node.js请求对象req，
将POST表单数据解析成querystring（例如：a=1&b=2&c=3），
再将querystring 解析成JSON格式（例如：{"a":"1", "b":"2", "c":"3"}），
我们来直接使用koa-bodyparser 模块从 POST 请求的数据体里面提取键值对。

const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')

// 使用koa-bodyparser中间件
app.use(bodyParser())

app.use(async (ctx) => {

  if (ctx.url === '/' && ctx.method === 'GET') {
    // 当GET请求时候返回表单页面
    let html = `
      <h1>koa-bodyparser</h1>
      <form method="POST" action="/">
        Name:<input name="name" /><br/>
        Age:<input name="age" /><br/>
        Email: <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    // 当POST请求的时候，中间件koa-bodyparser解析POST表单里的数据，并显示出来
    ctx.body = ctx.request.body
  } else {
    // 404
    ctx.body = '<h1>404 Not Found</h1>'
  }
})

app.listen(3000)
运行程序，填写并提交表单，请求结果为：

{
  name: "ogilhinn",
  age: "120",
  email: "ogilhinn@gmail.com"
}
```