import React, { Component } from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom'

class DetailB extends Component {
  render() {
    return (
      <Card>
        <Link to={'/list/index/detailc'}>TO DetailC</Link>
      </Card>
    )
  }
}
export default DetailB