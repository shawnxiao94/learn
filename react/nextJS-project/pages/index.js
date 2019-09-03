import Router from 'next/router'
import Link from 'next/link'

const events = [
  'routeChangeStart',
  'routeChangeComplete',
  'routeChangeError',
  'beforeHistoryChange',
  'hashChangeStart',
  'hashChangeComplete'
]

function makeEvent(type) {
  return (...args) => {
    console.log(type, ...args)
  }
}

events.forEach(event => {
  Router.events.on(event, makeEvent(event))
})


export default () => {
  function gotoB () {
    Router.push({
      pathname: '/b',
      query: {
        id: 2
      }
    }, '/b/2')
  }
  return (
    <div>
      <h2>index page</h2>
      <Link href='/c'>
        <div>
          <h1>goto C</h1>
        </div>
      </Link>
      <button onClick={gotoB}>goto B page</button>
    </div>
  )
}
