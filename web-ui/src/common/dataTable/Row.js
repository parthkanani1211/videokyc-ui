import React from 'react';
import {
    TableRow, TableCell, makeStyles,
    IconButton,
  } from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import RowColumn from './RowColumn';

const useStyles = makeStyles(theme => ({
    IconButton: {
      padding: 0,
      marginLeft: theme.spacing(1),
    },
  }));

export default function Row(props) {
    const classes = useStyles();
    const { rowData, fields, onEdit, onDelete } = props;
    return (
        <>
            <TableRow key={rowData.id}>
                {fields.map((field, index) => (
                    <RowColumn
                        key={`column-${index}`}
                        field={field}
                        rowData={rowData}
                    />
                ))}
                {(onEdit || onDelete) && (
                    <TableCell>
                        {
                            (onEdit && (
                                <IconButton
                                    color="primary"
                                    className={classes.IconButton}
                                    aria-label="Edit"
                                    onClick={() => onEdit(rowData)}
                                    >
                                    <EditIcon />
                                </IconButton>
                            ))
                        }
                        {
                            ((onDelete) && (
                                <IconButton
                                    color="primary"
                                    className={classes.IconButton}
                                    aria-label="Delete"
                                    onClick={() => onDelete(rowData)}
                                    >
                                    <DeleteIcon />
                                </IconButton>
                            ))
                        }
                    </TableCell>
                )}
            </TableRow>
        </>
    )
}