const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router({
  prefix: '/shawn'
})

router.get('/',(ctx, next) => {
  ctx.body = 'hello shawn'
})
.get('/todo', (ctx,next) => {
  ctx.body = 'todo page'
})
.get('/test', (ctx,next) => {
  ctx.body = 'test page'
})

app
  .use(router.routes())
  .use(router.allowedMethods())

  app.listen(3000, _ => {
    console.log('starting at port 3000')
  })