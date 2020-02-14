import React, { PureComponent, createContext } from 'react';

const BatteryContext = createContext();
class Leaf extends PureComponent {
  render () {
    return (
      <BatteryContext.Consumer>
        {
          battery => <h2>Battery: {battery}</h2>
        }
      </BatteryContext.Consumer>
    );
  }
}

class Middle extends PureComponent {
  render () {
    return <Leaf/>;
  }
}

export default Middle