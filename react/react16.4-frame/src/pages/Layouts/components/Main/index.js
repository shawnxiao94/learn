import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
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
        <Routers/>
			</MainWrapper>
		)
	}
}

const mapState = (state) => ({
  routerPermissions: state.getIn(['permission','routerPermissions'])
})

export default connect(mapState, null)(Main);
