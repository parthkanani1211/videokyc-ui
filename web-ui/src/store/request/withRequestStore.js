import React from 'react';
import { connect } from 'react-redux';

import { injectActions } from '../../util/store';

import selectors from './selectors';
import actions from './actions';
import helper from './helper';

const withRequestStore = (WrappedComponent) => {
    const mapState = ({ request }) => ({ request });

    const mapDispatch = injectActions('requestActions', actions);

    const Component = ({ request, requestActions, ...other }) => {

        return (
            <WrappedComponent
                requestActions={requestActions}
                requestListState={request.list}
                requestHelper={helper}
                requestSingleState={request.single}
                requestSelectors={selectors}
                {...other}
            />
        );
    };

    return connect(mapState, mapDispatch)(Component);
};

export default withRequestStore;
