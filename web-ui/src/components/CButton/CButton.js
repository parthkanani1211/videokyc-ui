import React from 'react';
import { CButton as CorButton } from '@coreui/react';

const CButton = (props) => {
    return <CorButton style={{ textTransform: 'uppercase' }} {...props} />;
};

export default CButton;
