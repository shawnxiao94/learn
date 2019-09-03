import App, { Container } from 'next/app'

import 'antd/dist/antd.css'

class myApp extends App {

  static async getInitialProps({ Component }) {
    let pageProps
    console.log('app init')
    if(Component.getInitialProps) {
      pageProps = await Component.getInitialProps()
    }
    return {
      pageProps
    }
  }
  render() {
    const { Component } = this.props
    return (
      <Container>
        <Component {...pageProps}></Component>
      </Container>
    )
  }
}

export default myApp