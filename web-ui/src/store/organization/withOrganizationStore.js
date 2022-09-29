import React from 'react';
import { connect } from 'react-redux';

import { injectActions } from '../../util/store';

import * as selectors from './selectors';
import * as actions from './actions';
// import * as constants from './constants';

const withOrganizationStore = (WrappedComponent) => {
    const mapState = ({ organization }) => ({ organization });

    const mapDispatch = injectActions('organizationAction', actions);

    const Component = ({ organization, organizationAction, ...other }) => (
        <WrappedComponent
            organizationAction={organizationAction}
            // requestConstants={constants}
            organizationState={organization}
            organizationSelectors={selectors}
            {...other}
        />
    );

    return connect(mapState, mapDispatch)(Component);
};

export default withOrganizationStore;
