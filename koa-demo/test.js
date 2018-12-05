const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const static = require('koa-static')
const staticPath = './static'
const app = new Koa()

app.use(static(
  path.join(__dirname, staticPath)
))

// 加载模版引擎
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

app.use(async (ctx) => {
  let title = 'hello koa2 ejs 模版'
  let src = '/images/icon.png'
  await ctx.render('index', {
    title,
    src
  })
})

app.listen(3000, _ => {
  console.log('server is starting at port 3000')
})