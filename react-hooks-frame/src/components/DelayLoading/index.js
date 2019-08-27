// import React from 'react'

// const DelayLoading = ({ pastDelay, error }) => {
//     if (pastDelay) {
//         return <div>Loading...</div>
//     } else if (error) {
//         return <div>Sorry, there was a problem loading the page.</div>
//     } else {
//         return null
//     }
// }
// export default DelayLoading

/** Loading组件 用于按需加载时过渡显示等 **/
import React from 'react'
import './index.css'
import ImgLoading from '@/assets/images/loading.gif'
export default class DelayLoading extends React.PureComponent {
  static propTypes = {};

  constructor (props) {
    super(props)
    this.state = {}
  }

  makeType (p) {
    let msg
    if (p.error) {
      msg = '加载出错，请刷新页面'
    } else if (p.timedOut) {
      msg = '加载超时'
    } else if (p.pastDelay) {
      msg = '加载中…'
    }
    return msg
  }

  render () {
    return (
      <div className="loading">
        <img alt="" src={ImgLoading} />
        <div>{this.makeType(this.props)}</div>
      </div>
    )
  }
}
