import {ROLE_SUPERADMIN, ROLE_ADMIN, ROLE_PARTNER} from '../../constants/roles';
import { createHasSessionAccessSelector } from '../session';

export const selectCanAccessUsers = createHasSessionAccessSelector([ROLE_SUPERADMIN, ROLE_ADMIN, ROLE_PARTNER]);