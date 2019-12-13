import React, { Component } from "react";
import avatar from "@/assets/images/test.jpg";

class Home extends Component {
  render() {
    return (
      <div>
      HomePage
        <p className="hello">test</p>
        <div className="avatar"><img alt="" src={avatar} /></div>
      </div>
    );
  }
}

export default Home;
