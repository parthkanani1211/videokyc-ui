import React from 'react';
import {
    TableCell, TableSortLabel
} from '@material-ui/core';

export default function HeaderColumn(props) {
    const { field, onSort, columnOrder, orderBy } = props;
    const { id, label, options } = field;
    const { sortable } = options || {};
    return (
        <>
            <TableCell
                sortDirection={orderBy}
            >
                {sortable ? (
                    <TableSortLabel
                        active={columnOrder === id}
                        direction={orderBy}
                        onClick={() => onSort({id})}
                    >
                        {label}
                    </TableSortLabel>
                ) : (
                        <>
                            {label}
                        </>
                    )
                }

            </TableCell>
        </>
    )
}