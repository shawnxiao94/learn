import React, { Component, createContext, lazy, Suspense } from 'react';

import './App.css';

const BatteryContext = createContext(90);
const OnlineContext = createContext();

const About = lazy(() => import('./About.js'));

class Leaf extends Component {
  static contextType = BatteryContext;
  render () {
    const battery = this.context
    return (
      <div>
      <h1>Battery: {battery}</h1>
      <Suspense fallback={<div>loading</div>}>
        <About/>
      </Suspense>
      </div>
      // <BatteryContext.Consumer>
      // {
      //   battery => (
      //     <OnlineContext.Consumer>
      //     {
      //       online => <h1>Battery: {battery}, Online: {String(online)}</h1>
      //     }
      //     </OnlineContext.Consumer>
      //   )
      // }
      // </BatteryContext.Consumer>
    )
  }
}

class Middle extends Component {
  render () {
    return <Leaf/>
  }
}

class App extends Component {
  state = {
    online: false,
    battery: 60
  };

  render () {
    const { battery, online } = this.state;
    return (
      <BatteryContext.Provider value={battery}>
        <OnlineContext.Provider value={online}>
          <button type="button" onClick={() => this.setState({battery: battery - 1})}>
            press
          </button>
          <button type="button" onClick={() => this.setState({online: !online})}>
            switch
          </button>
          <Middle/>
        </OnlineContext.Provider>
      </BatteryContext.Provider>
    )
  }
}

export default App;
