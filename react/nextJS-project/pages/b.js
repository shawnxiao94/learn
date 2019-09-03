import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'

const B = ({router, name}) => {
  return (
    <div>
      B page
      {/* as 路由映射， 以/1比较好看的方式来传参 等于/?id=1 */}
      <Link href='/#?id=1' as="/1">
        <div>
          <h1>goto index</h1>
          router id: { router.query.id }
          <p>name: {name}</p>
        </div>
      </Link>
    </div>
  )
}

// 只有放在 pages目录页面下才能使用getInitialProps
B.getInitialProps = async () => {
  console.log('-------------------')
  const promise = new Promise((resolve) => {
    // 访问B页面时候 会等待3秒才会渲染 
    setTimeout(() => {
      resolve({
        name: 'jokcy'
      })
    }, 3000)
  })

  return await promise
  // return {
  //   name: 'jokcy'
  // }
}

export default withRouter(B)