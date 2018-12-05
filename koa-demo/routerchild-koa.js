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