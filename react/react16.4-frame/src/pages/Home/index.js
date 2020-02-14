import React, { PureComponent, createContext, lazy, Suspense } from 'react';
import { connect } from 'react-redux';

const About = lazy(() => import('./components/About.jsx'));

const BatteryContext = createContext(90);
const OnlineContext = createContext();

class Leaf extends PureComponent {
	static contextType = BatteryContext
  render () {
		const battery = this.context;
    return (
			<h2>Battery: {battery}</h2>
      // <BatteryContext.Consumer>
      //   {
      //     battery => (
			// 			<OnlineContext.Consumer>
			// 				{
			// 					online => <h2>Battery: {battery}, online: {String(online)}</h2>
			// 				}
			// 			</OnlineContext.Consumer>
			// 		)
      //   }
      // </BatteryContext.Consumer>
    );
  }
}
class Middle extends PureComponent {
  render () {
    return <Leaf/>;
  }
}
class Home extends PureComponent {
	state = {
		online: false,
		battery: 60
	}
	render() {
		const { battery, online } = this.state;
		return (
			<div>
        <div>
					hello world!
        	it is home page
					{/* 对lazy加载的异步组件，配套使用Suspense来自定义空档期 */}
					<Suspense fallback={<div>loading...</div>}>
						<About></About>
					</Suspense>
				</div>
				<BatteryContext.Provider value={battery}>
					<OnlineContext.Provider value={online}>
						<button
							type="button"
							onClick={() => this.setState({battery: battery - 1})}>
							press battery
						</button>
						<button
							type="button"
							onClick={() => this.setState({online: !online})}>
							press online
						</button>
						<Middle/>
					</OnlineContext.Provider>
				</BatteryContext.Provider>
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
