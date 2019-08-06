import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Routes from '@router'
import { MainWrapper } from './style'

class Main extends PureComponent {
	render() {
		return (
			<MainWrapper>
        <Routes></Routes>
			</MainWrapper>
		)
	}

	componentDidMount() {

	}

}

export default connect(null, null)(Main);
