import moment from 'moment';
import { DATE_FORMAT } from '../store/constants/date';

export const formatDateForInput = (pickedDate) => {
    if (pickedDate) {
        return moment(pickedDate).format(DATE_FORMAT);
    }
    return null;
};
