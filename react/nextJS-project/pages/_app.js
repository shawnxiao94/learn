import App, { Container } from 'next/app'

// import 'antd/dist/antd.css'

class myApp extends App {

  static async getInitialProps( ctx ) {
    const { Component } = ctx
    let pageProps = {}
    console.log('app init')
    if(Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return {
      pageProps
    }
  }
  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Component {...pageProps}></Component>
      </Container>
    )
  }
}

export default myApp