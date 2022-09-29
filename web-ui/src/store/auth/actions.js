import * as loginActions from './login/actions';
import * as authenticationActions from './authentication/actions';

export default {
    ...loginActions,
    ...authenticationActions,
};
