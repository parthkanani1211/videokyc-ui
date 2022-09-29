import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { LastLocationProvider } from "react-router-last-location";

import { Routes } from "./router";
import LayoutSplashScreen from "./containers/Layout/LayoutSplashScreen";

import "./App.scss";
import { theme } from "./styles";
import { GlobalStyle } from "styles/GlobalStyle";

function App({ store, Layout, basename }) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store} loading={<LayoutSplashScreen />}>
        <GlobalStyle />
        <BrowserRouter basename={basename}>
          <LastLocationProvider>
            <React.Suspense fallback={<LayoutSplashScreen />}>
              <Routes Layout={Layout} />
            </React.Suspense>
          </LastLocationProvider>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
