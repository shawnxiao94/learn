import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { HeaderWrapper } from './style'

class Header extends PureComponent {
  render () {
    return (
      <HeaderWrapper>
        it is Header
      </HeaderWrapper>
    )
  }

  componentDidMount () {

  }
}

const mapState = (state) => ({
})

const mapDispatch = (dispatch) => ({

})

export default connect(mapState, mapDispatch)(Header)
