import { makeStyles } from '@material-ui/core/styles';

export const useBigButtonStyles = (props) =>
    makeStyles(() => ({
        icon: {
            width: props.iconWidth,
            height: 'auto',
            color: 'white',
        },
        button: {
            borderRadius: '20px',
            color: '',
            backgroundColor: 'rgb(32 168 216)',
            margin: '10px',
        },
        typography: {
            textAlign: 'center',
            fontSize: 'x-large',
            color: 'white',
            fontWeight: 400,
        },
    }));
