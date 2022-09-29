import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';

import {
    KYC_DOCUMENT_LIST,
    CUSTOMER_DOCUMENT_STATUS_LIST,
} from '../../../../store/constants/videoKyc';

const styles = {
    customerStatuses: {
        display: 'grid',
        gridGap: 10,
        background: 'rgb(0, 0, 0, .4)',
        padding: 10,
    },
};

const CustomerStatuses = ({ classes, kycStatus }) => {
    return (
        <Box
            maxWidth={200}
            maxHeight={200}
            position="absolute"
            bottom={0}
            right={0}
            boxShadow={1}
            className={classes.customerStatuses}
        >
            {KYC_DOCUMENT_LIST.map(({ type, label }) => {
                const status = kycStatus[type];

                const bgColor = status
                    ? CUSTOMER_DOCUMENT_STATUS_LIST[status].color
                    : 'gray';

                return (
                    <Chip
                        size="small"
                        label={label}
                        style={{ background: bgColor, color: 'white' }}
                    />
                );
            })}
        </Box>
    );
};

export default withStyles(styles)(CustomerStatuses);
