import * as loginSelectors from './login/selectors';
import * as authenticationSelectors from './authentication/selectors';

export default {
    ...loginSelectors,
    ...authenticationSelectors,
};
