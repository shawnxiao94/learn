
import React, { Component } from "react";
import avatar from "@/assets/images/test.JPG";

class Home extends Component {
  render() {
    return <div>
      HomePage
      <p className="hello">test</p>

      <div className='avatar'><img src={avatar}/></div>
    </div>;
  }
}

export default Home;