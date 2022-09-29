import moment from 'moment';
import { DATE_FORMAT } from '../../store/constants/date';

export const createStringDataField = (id, label, options = {}) => {
    return {
        id,
        label,
        renderString: (value) => (typeof value === 'string' && value) ? value : '',
        options
    };
};

export const createNumberDataField = (id, label, options = {}) => {
    return {
        id,
        label,
        renderString: (value) => (typeof value === 'number' && value) ? value : '',
        options
    };
};

export const createBooleanDataField = (id, label, options = {}) => {
    return {
        id,
        label,
        renderString: (value) => {
            if (typeof value === 'boolean') {
                if (value) {
                    return 'Active';
                }
                else {
                    return 'In Active'
                }
            }
            return '';
        },
        options
    };
};

export const createDateField = (id, label, options = {}) => {
    return {
        id,
        label,
        renderString: (value) => (typeof value === 'string' && value) ? moment(value, 'YYYY-MM-DDHH:mm:ss').format(DATE_FORMAT) : '',
        options
    };
};
