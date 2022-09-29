import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function Message({ children, theme = 'primary' }) {
    return (
        <div className={classnames("alert", {
            'alert-success': theme === 'success',
            'alert-danger': theme === 'error',
            'alert-warning': theme === 'warning',
        })}>
            {children}
        </div>
    );
}

Message.prototype = {
    theme: PropTypes.oneOf(['primary', 'success', 'error', 'warning']),
    children: PropTypes.any,
}