import React, { useState } from 'react';
import classnames from 'classnames';

import {
    Table, TableBody, TableHead, TableRow, Dialog, DialogActions,
    DialogContent, DialogTitle, DialogContentText, Button,
} from '@material-ui/core';
import { Loadable } from '../loadable';

import Row from './Row';
import Header from './Header';

import './Datatable.scss';

export default function DataTable(props) {

    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState();
    const {
        data, fields, onEdit, onDelete,
        hasActions, loading, sort,
    } = props;

    const { id: columnOrder, orderBy } = (sort && sort.length > 0 && sort[0]) || {};

    const openDeleteConfirmation = (row) => {
        setSelectedRow(row);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteConfirmation = () => {
        setOpen(false);
        onDelete(selectedRow);
    }

    const handleSort = ({ id, orderBy }) => {
        const { onSort, sort } = props;
        if (!onSort) {
            return;
        }

        const sorts = [...sort];
        const updatedSort = { id };
        const oldSort = sorts.find((sort) => {
            return sort.id === id;
        });

        // sort exists, toggle sort
        if (oldSort && oldSort.id === id) {
            const index = sorts.indexOf(oldSort);
            updatedSort.orderBy = oldSort.orderBy === 'asc' ? 'desc' : 'asc';
            sorts[index] = updatedSort;
        }
        // new sort
        else {
            updatedSort.orderBy = orderBy || 'asc';
            sorts.splice(0, sorts.length);
            sorts.push(updatedSort);
        }

        onSort(sorts);

    }

    return (
        <div className={classnames('datatable', {
            'datatable--loading': loading
        })}>
            <Loadable loading={loading}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <Header
                                key="header"
                                fields={fields}
                                hasActions={hasActions}
                                onSort={handleSort}
                                orderBy={orderBy}
                                columnOrder={columnOrder}
                            />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((rowData, index) => (
                            <Row
                                key={`column-${index}`}
                                rowData={rowData}
                                fields={fields}
                                onEdit={onEdit}
                                onDelete={onDelete ? openDeleteConfirmation : undefined}
                            />
                        ))}
                    </TableBody>
                </Table>
            </Loadable>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteConfirmation}
                        color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}