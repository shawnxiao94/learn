import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Redirect
} from 'react-router-dom';
import { MainWrapper } from './style'

import { getRouterDoms } from '@router';



class Main extends PureComponent {
	render() {
    const { routerPermissions } = this.props
    const Routers = () => {
      return getRouterDoms(routerPermissions)
    }
		return (
			<MainWrapper>
        <Redirect from="/" to="/home"></Redirect>
        <Routers/>
			</MainWrapper>
		)
	}
}

const mapState = (state) => ({
  routerPermissions: state.getIn(['login','routerPermissions'])
})

export default connect(mapState, null)(Main);
