import React, { Component } from 'react';
import ReactDom from 'react-dom';
import '@/assets/styles/index.scss'

class App extends Component {
	render() {
		return (
			<div>
				<div class="hello">This is Home Page</div>
			</div>
		)
	}
}

ReactDom.render(<App />, document.getElementById('root'));