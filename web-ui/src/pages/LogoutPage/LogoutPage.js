import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import LayoutSplashScreen from "../../containers/Layout/LayoutSplashScreen";

class LogoutPage extends Component {
  componentDidMount() {
    //TODO need to pass manual flag here.
    const {
      actions: { sessionLogout }
    } = this.props;

    sessionLogout(true);
  }

  render() {
    const { hasAuthToken } = this.props;

    return hasAuthToken ? <LayoutSplashScreen /> : <Redirect to="/auth" />;
  }
}

export default LogoutPage;
