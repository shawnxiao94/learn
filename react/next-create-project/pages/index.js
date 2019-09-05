import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'

// nextJs里动态路由只能query方式来传参
const Home = () => {
  function gotoTestA() {
    // Router.push('/a')
    Router.push({
      pathname: '/a',
      query: {
        id: 1
      }
    },'/a/1')
  }
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      index page
      {/* as 路由映射， 以/a/1比较好看的方式来传参 等于/a/?id=1 */}
      <Link href='/a?id=1' as="/a/1">
        <div>
          <h1>title</h1>
          <p>Learn more about Next.js on GitHub and in their examples.</p>
          <button onClick={gotoTestA}>click goto a</button>
        </div>
      </Link>
    </div>
  )
}

export default Home
