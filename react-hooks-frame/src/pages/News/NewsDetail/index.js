import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class NewsDetail extends PureComponent {
  render () {
    return (
      <div>
        it is NewsDetail page
      </div>
    )
  }

  componentDidMount () {

  }
}

const mapState = (state) => ({
})

const mapDispatch = (dispatch) => ({

})

export default connect(mapState, mapDispatch)(NewsDetail)
