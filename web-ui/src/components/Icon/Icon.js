import React from 'react';

import Cached from '@material-ui/icons/Cached';
import ChevronRight from '@material-ui/icons/ChevronRight';
import NotInterested from '@material-ui/icons/NotInterested';
import Person from '@material-ui/icons/Person';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import SendSharp from '@material-ui/icons/SendSharp';

const ICON_COLLECTION = {
    cached: Cached,
    notInterested: NotInterested,
    sendSharp: SendSharp,
    person: Person,
    powerSettingsNew: PowerSettingsNew,
    chevronRight: ChevronRight,
};

const Icon = ({ iconName, ...props }) => {
    const IconComponent = ICON_COLLECTION[iconName] || NotInterested;

    return <IconComponent {...props} />;
};

export default Icon;
