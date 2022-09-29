/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/pages/auth/AuthPage`, `src/pages/home/HomePage`).
 */

import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { useLastLocation } from "react-router-last-location";

import * as routerHelpers from "./RouterHelpers";
import { applyPreAuthentication, applyProtected } from "./util/ApplyProtected";
// import { LoginPage } from "../pages/LoginPage";
import Customer from "pages/Customer";
import AdminPage from "pages/AdminPage";
import AgentPage from "pages/AgentPage";
// import { AuditPage } from "pages/AuditPage";
import CheckerPage from "pages/CheckerPage";
import AuditorPage from "pages/AuditorPage";
import { ProfilePage } from "pages/Profile";
import { LogoutPage } from "pages/LogoutPage";
import KycDetailPage from "pages/KycDetailPage";
import VideoKycLogin from "pages/VideoKycLogin";
import AdminUsersPage from "pages/AdminUsersPage";
import { VideoKycPage } from "pages/VideoKycPage";
import { UsersPage } from "pages/UsersPage/index";
import AuditDetailPage from "pages/AuditDetailPage";
import CustomerContent from "pages/Customer/Content";
import { LOGIN_TYPE } from "store/constants/videoKyc";
import { AdminSignUp } from "pages/UsersPage/AdminSignUp";
// import { VideoLandingPage } from "pages/VideoLandingPage";
// import { VideoKyc } from 'pages/VideoKyc';
// import { DashboardPage } from 'pages/DashboardPage';
import { UsersEditPage } from "pages/UsersPage/UsersEditPage";
import { VideoKycSuccessPage } from "pages/VideoKycSuccessPage";
import CustomerDetailsForm from "pages/Customer/CustomerDetailsForm";
import { removeCookie } from "utils/cookie";

// import { UsersPage } from "../pages/UsersPage";
// import { UsersEditPage } from "../pages/UsersPage/UsersEditPage";
// // import AiBlock from "../pages/WorkflowPage/AiBlock/AiBlock";

// import { AiBlockPage } from "../pages/AiBlockPage";
// import { AiBlockEditPage } from "../pages/AiBlockPage/AiBlockEditPage";

// import { WorkflowPage } from "../pages/WorkflowPage";
// import { WorkflowEditPage } from "../pages/WorkflowPage/WorkflowEditPage";

// const PreAuthenticationLogInPage = applyPreAuthentication(LoginPage);
// const PreAuthenticationDashboardPage = applyProtected(DashboardPage);
// const PreAuthenticationVideoKyc = applyProtected(VideoKyc);
// const PreAuthenticationCustomerLoginPage = applyProtected(CustomerLoginPage);

const ProtectedAdminSignUp = applyProtected(AdminSignUp);
const ProtectedUsersEditPage = applyProtected(UsersEditPage);
const PreAuthenticationUsersPage = applyProtected(AdminUsersPage);

// const PreAuthenticationAiBlockPage = applyProtected(AiBlockPage);
// const ProtectedAiBlockEditPage = applyProtected(AiBlockEditPage);

// const PreAuthenticationWorkflowPage = applyProtected(WorkflowPage);
//const ProtectedWorkflowEditPage = applyProtected(WorkflowEditPage);

//Video kyc pages
const ProfileViewPage = applyProtected(ProfilePage);
const PreAuthenticationCustomer = applyProtected(Customer);
const PreAuthenticationAgentPage = applyProtected(AgentPage);
// const PreAuthenticationAuditPage = applyProtected(AuditPage);
const PreAuthenticationAdminPage = applyProtected(AdminPage);
const PreAuthenticationCheckerPage = applyProtected(CheckerPage);
const PreAuthenticationAuditorPage = applyProtected(AuditorPage);
const AuthenticateCustomer = applyProtected(CustomerDetailsForm);
const PreAuthenticationVideoKycPage = applyProtected(VideoKycPage);
const PreAuthenticationKycDetailPage = applyProtected(KycDetailPage);
const PreAuthenticationAuditDetailPage = applyProtected(AuditDetailPage);
const PreAuthenticationCustomerContent = applyProtected(CustomerContent);
const PreAuthenticationVideoKycLogin = applyPreAuthentication(VideoKycLogin);

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

const REDIRECT_URL = {
  [LOGIN_TYPE.CUSTOMER]: "/videoKyc/customer-details",
  // [LOGIN_TYPE.AUDITOR]: "/videoKyc/auditor",
  [LOGIN_TYPE.AUDITOR]: "/videoKyc/auditor",
  [LOGIN_TYPE.ADMIN]: "/admin/requests",
  [LOGIN_TYPE.AGENT]: "/videoKyc/agent",
  // [LOGIN_TYPE.AGENT]: "/audit-report/1",
  [LOGIN_TYPE.CHECKER]: "/videoKyc/checker",
  // [LOGIN_TYPE.CHECKER]: "/audit-report/1",
};

export default function Routes(props) {
  const isKycCompleted = useSelector((state) => state.request.list.data);
  const lastLocation = useLastLocation();
  routerHelpers.saveLastLocation(lastLocation);
  const { Layout, isAuthorized, authenticationType, authRoleMap, orgAdminExist } = props;

  useEffect(() => {
    if (authenticationType && authenticationType !== LOGIN_TYPE.CUSTOMER) {
      removeCookie("refId");
    }
  }, [authenticationType]);

  return (
    <Switch>
      {!orgAdminExist ? (
        <Route exact path="/registration" component={ProtectedAdminSignUp} />
      ) : null}
      {!isAuthorized && orgAdminExist ? (
        /* Render auth page when user at `/auth` and not authorized. */
        <Route path="/auth/login" component={PreAuthenticationVideoKycLogin} />
      ) : (
        <Redirect
          from="/auth"
          to={
            routerHelpers.getLastLocation() === "/videoKyc/start-kyc"
              ? "/videoKyc/customer"
              : routerHelpers.getLastLocation()
          }
        />
      )}

      <Route path="/logout" component={LogoutPage} />
      {/* <Route exact path="/videoKyc/autologin" component={VideoLandingPage} />
      <Route exact path="/videoKyc/success" component={VideoKycSuccessPage} /> */}
      {/* <Route exact path="/kyc/details" component={KycDetailPage} /> */}

      {!isAuthorized ? (
        /* Redirect to `/auth` when user is not authorized */
        <Redirect to="/auth/login" />
      ) : (
        <Layout routerProps={props}>
          <Suspense fallback={loading()}>
            <Switch>
              {/* <Route path="/dashboard" component={PreAuthenticationDashboardPage} /> */}
              {/* All routes goes here */}

              {authenticationType && (
                <Redirect exact from="/" to={REDIRECT_URL[authenticationType]} />
              )}

              <Route
                path="/videoKyc/start-kyc/:sessionId"
                component={PreAuthenticationVideoKycPage}
              />
              {authRoleMap?.get(LOGIN_TYPE.AGENT) ? (
                <>
                  <Route path="/videoKyc/agent" component={PreAuthenticationAgentPage} />
                  <Route
                    exact
                    path="/audit-report/:id"
                    component={PreAuthenticationKycDetailPage}
                  />
                </>
              ) : null}

              {authRoleMap?.get(LOGIN_TYPE.CHECKER) ? (
                <>
                  <Route path="/videoKyc/checker" component={PreAuthenticationCheckerPage} />
                  <Route
                    exact
                    path="/audit-report/:id"
                    component={PreAuthenticationKycDetailPage}
                  />
                </>
              ) : null}

              {authRoleMap?.get(LOGIN_TYPE.CUSTOMER) ? (
                <>
                  <Route exact path="/videoKyc/customer" component={PreAuthenticationCustomer} />
                  <Route
                    path="/videoKyc/customer/content"
                    component={PreAuthenticationCustomerContent}
                  />
                  <Route exact path="/videoKyc/customer-details" component={AuthenticateCustomer} />
                  {/* {isKycCompleted && <Route exact path="/profile" component={ProfileViewPage} />} */}
                  <Route exact path="/profile" component={ProfileViewPage} />
                  <Route exact path="/videoKyc/success" component={VideoKycSuccessPage} />
                </>
              ) : null}

              {authRoleMap?.get(LOGIN_TYPE.AUDITOR) ? (
                <>
                  <Route exact path="/videoKyc/auditor" component={PreAuthenticationAuditorPage} />
                  <Route
                    exact
                    path="/audit-report/:id"
                    component={PreAuthenticationKycDetailPage}
                  />
                </>
              ) : null}

              {authRoleMap?.get(LOGIN_TYPE.ADMIN) ? (
                <>
                  <Route exact path="/admin/users" component={PreAuthenticationUsersPage} />
                  <Route exact path="/admin/users/new" component={ProtectedUsersEditPage} />
                  <Route exact path="/admin/requests" component={PreAuthenticationAdminPage} />
                  <Route
                    exact
                    path="/audit-report/:id"
                    component={PreAuthenticationKycDetailPage}
                  />
                  <Route exact path="/admin/users/edit/:id" component={ProtectedUsersEditPage} />
                </>
              ) : null}
            </Switch>
          </Suspense>
        </Layout>
      )}
    </Switch>
  );
}
