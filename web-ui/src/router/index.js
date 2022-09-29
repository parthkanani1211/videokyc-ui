import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectAuthenticated } from '../store/selectors/session';
import { getAuthAuthenticationType, getAuthRoleMap } from '../store/auth/authentication/selectors';
import RoutesComponent from './Routes.js';
import {getOrgAdminExist} from "../store/organization/selectors";

export const Routes = withRouter(
    connect((state) => ({
        isAuthorized: selectAuthenticated(state),
        authenticationType: getAuthAuthenticationType(state),
        authRoleMap: getAuthRoleMap(state),
        orgAdminExist: getOrgAdminExist(state),
    }))(RoutesComponent)
);
