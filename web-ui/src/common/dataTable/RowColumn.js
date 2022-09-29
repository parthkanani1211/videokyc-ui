import React from 'react';

import {
    TableCell
} from '@material-ui/core';

export default function RowColumn(props) {
    const { field , rowData } = props;
    const columnData  = field.renderString(rowData[field.id]);

    return (
        <>
            <TableCell>{columnData}</TableCell>
        </>
    )
}