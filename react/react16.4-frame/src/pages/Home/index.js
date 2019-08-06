import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class Home extends PureComponent {
	render() {
		return (
			<div>
        hello world!
        it is home page
			</div>
		)
	}

	componentDidMount() {

	}

}

const mapState = (state) => ({
})

const mapDispatch = (dispatch) => ({

});

export default connect(mapState, mapDispatch)(Home);
