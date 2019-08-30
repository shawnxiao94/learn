import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class News extends PureComponent {
  render () {
    return (
      <div>
        it is news page
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

export default connect(mapState, mapDispatch)(News)
