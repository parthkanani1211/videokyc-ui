import * as singleSelectors from './single/selectors';
import * as listSelectors from './list/selectors';

export default {
    ...singleSelectors,
    ...listSelectors,
};
