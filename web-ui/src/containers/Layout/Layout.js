import React, { Suspense } from "react";
import { Container } from "reactstrap";
// import * as router from 'react-router-dom';
import {
  AppFooter,
  AppHeader,
  // AppSidebar,
  // AppSidebarMinimizer,
  // AppBreadcrumb2 as AppBreadcrumb,
  // AppSidebarNav2 as AppSidebarNav,
} from "@coreui/reactV2";
// sidebar nav config
// import navigation from '../../_nav';
import LayoutSplashScreen from "./LayoutSplashScreen";
import { useLocation } from "react-router-dom";
import { LOGIN_TYPE } from "../../store/constants/videoKyc";

const Footer = React.lazy(() => import("./Footer"));
const Header = React.lazy(() => import("./Header"));

export default function Layout(props) {
  // const {authAuthenticationData, routerProps} = props;
  const { routerProps, hideUserDetails } = props;
  const { isAuthorized, authenticationType, location } = routerProps;
  const isAdminInPath =
    location.pathname.indexOf("/admin") === 0 || location.pathname.indexOf("/Admin") === 0;

  const { pathname } = useLocation();

  return (
    <div className="app">
      {!hideUserDetails && (
        <AppHeader fixed>
          <Suspense fallback={<LayoutSplashScreen />}>
            <Header {...props} />
          </Suspense>
        </AppHeader>
      )}

      <div className="app-body">
        {/* <AppSidebar
                    display="lg"
                    hidden={
                        !(
                            isAuthorized &&
                            isAdminInPath &&
                            authenticationType === LOGIN_TYPE.ADMIN
                        )
                    }
                >
                    <Suspense fallback={<LayoutSplashScreen />}>
                        <AppSidebarNav
                            navConfig={navigation}
                            {...props.routerProps}
                            router={router}
                            authAuthenticationData={
                                !(
                                    isAuthorized &&
                                    isAdminInPath &&
                                    authenticationType === LOGIN_TYPE.ADMIN
                                )
                            }
                        />
                    </Suspense>
                    <AppSidebarMinimizer />
                        </AppSidebar> */}

        <main
          className={`main ${
            ["/profile", "/videoKyc/customer-details"].includes(pathname) ? "layout-background" : ""
          }`}
        >
          {/* {!authAuthenticationData && (
                        <AppBreadcrumb
                            router={router}
                            hidden={
                                !(
                                    isAuthorized &&
                                    isAdminInPath &&
                                    authenticationType === LOGIN_TYPE.ADMIN
                                )
                            }
                        />
                    )} */}
          <Container fluid style={{ height: "100%" }}>
            {props.children}
          </Container>
        </main>
      </div>
      <AppFooter>
        <Suspense fallback={<LayoutSplashScreen />}>
          <Footer />
        </Suspense>
      </AppFooter>
    </div>
  );
}
