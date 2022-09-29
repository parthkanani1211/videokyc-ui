import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CircularProgress } from "@material-ui/core";

import './Loadable.scss';

export default function Loadable({ children, loading = false, className }) {
    return (
        <div className={classnames("loadable", {
            'loadable--loading': loading,
        })}>
            <div className={className}>
                {children}
            </div>
            <div className="loading-overlay">
                <div className="loading-overlay-spinner">
                    <CircularProgress color="secondary" className="loading-overlay-image loading-overlay-image-loading" />
                </div>
            </div>
        </div>
    );
}

Loadable.prototype = {
    loading: PropTypes.bool,
    children: PropTypes.element.isRequired
};