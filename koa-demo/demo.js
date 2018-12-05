const Koa = require('koa')
const app = new Koa()

// const main = ctx => {
//   ctx.throw(500)
// }

// app.use(main)


app.use(async (ctx) => {
  let url = ctx.url
  let request = ctx.request
  let req_query = request.query
  let req_querystring = request.querystring
  let ctx_quest = ctx.request
  let ctx_questring = ctx.querystring
  ctx.body = {
    url,req_query,req_querystring,ctx_quest,ctx_questring
  }
})



app.listen(3000, _ => {
  console.log('demo listen 3000')
})
