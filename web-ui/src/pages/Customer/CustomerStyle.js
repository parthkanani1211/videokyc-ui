import { withStyles } from '@material-ui/core/styles';
import { Table } from '../../components';

export const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: 'rgb(32 168 216)',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(Table.Cell);

export const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(Table.Row);
