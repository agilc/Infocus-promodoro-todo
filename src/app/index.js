import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from './Home/index';

class MainApp extends React.Component {
  render() {
    return(
      <div className="app-container">
        <div className="app-main-content">
          <Switch>
            <Route
                path={`${this.props.match.url}`}
                component={Home}
              />
          </Switch>
        </div>
      </div>
    )
  }
}
export default MainApp;