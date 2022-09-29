import React from "react";
import ReactDOM from "react-dom";
import "react-app-polyfill/ie9"; // For IE 9-11 support
import "react-app-polyfill/stable";

import * as serviceWorker from "./serviceWorker";
import store from "./store";
import App from "./App";
// import { fromLocalStorage, toLocalStorage } from "./util/storage";
// import { SESSION_CONSTRUCT, SESSION_LOGIN_FULFILLED } from "./store/actions/session";

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { PUBLIC_URL } = process.env;

// let authToken = fromLocalStorage("aut    hToken", null);

// if (authToken) {
//   store.dispatch({ type: SESSION_LOGIN_FULFILLED, payload: { authToken } });
//   store.dispatch({ type: SESSION_CONSTRUCT, payload: {} });
// } else {
//   toLocalStorage("authToken", null);
//   authToken = undefined;
// }

const Layout = React.lazy(() => import("./containers/Layout"));

const render = (Component) => {
  return ReactDOM.render(
    <React.StrictMode>
      <Component store={store} Layout={Layout} basename={PUBLIC_URL} />
    </React.StrictMode>,
    document.getElementById("root")
  );
};

render(App);

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    render(NextApp);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
