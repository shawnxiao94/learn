import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ReactDom from "react-dom";
import "@/assets/styles/index.scss";

import Home from "./home";
import List from "./list";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/list" component={List} />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDom.render(<App />, document.getElementById("root"));

// PWA => 判断该浏览器支不支持 serviceWorker
if (process.env.envList.NODE_ENV === "production") {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(registration => {
          console.log("service-worker registed", registration);
        })
        .catch(error => {
          console.log("service-worker registed error", error);
        });
    });
  }
} else {
  /**
   * 启动热加载
   */
  if (module.hot) {
    module.hot.accept();
  }
  console.log(process.env.NODE_ENV, process.env.envList);
}
