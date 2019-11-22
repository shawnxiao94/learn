var fn_index = async (ctx, next) => {
  ctx.response.body = `<h1>login page2</h1>
    <form action="/login" method="post">
      <p>Name: <input name="name" value="koa"/></p>
      <p>Password: <input name="password" type="password"/></p>
      <p><input type="submit" value="登录"/></p>
    </form>
  `
}

var fn_login = async (ctx, next) => {
  var name = ctx.request.body.name || ''
  var password = ctx.request.body.password || ''
  console.log(`login with name:${name}, password: ${password}`)
  if(name === 'koa' && password === '12345') {
    ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
  } else {
    ctx.response.body = `<h1>Login failed!</h1>
      <p><a href="/">Try again</a></p>
    `
  }
};

module.exports = {
  "GET /": fn_index,
  "POST /login": fn_login
};