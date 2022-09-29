import React from 'react';

import Box from '../Box';
import Button from '../Button';
import Icon from '../Icon';
import Typography from '../Typography';

import { useBigButtonStyles } from './BigButtonStyle'


const BigButton = (props) => {
    const { title, iconName = 'person', iconWidth = '150px' } = props;
    const classes = useBigButtonStyles({ iconWidth })();

    return (
        <Button className={classes.button} {...props}>
            <Box>
                <Icon iconName={iconName} className={classes.icon} />
                <Typography variant="h1" className={classes.typography}>
                    {title}
                </Typography>
            </Box>
        </Button>
    );
};

export default BigButton;
