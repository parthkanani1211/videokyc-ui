import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';

import UsersPageComponent from './UsersPage.js';
import { list, deleteUser, startCreate, startUpdate } from '../../store/actions/users';
import { list as roleList}  from '../../store/actions/roles';
import { set } from '../../store/actions/pages';
import { selectUsers } from '../../store/selectors/users';
import { createFilteredSortedDataSelector } from '../../util/selector';
import {createNumberDataField, createStringDataField} from '../../util/format';

const DEFAULT_SORT = [{ id: 'firstName', orderBy: 'asc' }];
const selectFields = createSelector(() => [
    createStringDataField('firstName', 'Firstname', { sortable: true }),
    createStringDataField('lastName', 'Lastname', { sortable: true }),
    createNumberDataField('mobileNumber', 'MobileNumber'),
    createStringDataField('emailAddress', 'Email'),
]);

const selectSort = createSelector(
    (state) => state.pages['users-landing'].sort,
    (sort) => sort || DEFAULT_SORT
);

const selectFilteredFields = createSelector(selectFields, (fields) => {
    return fields.map((field) => field.id);
});

const selectFilteredData = createFilteredSortedDataSelector(
    selectFilteredFields,
    (state) => state.pages['users-landing'].filter,
    selectSort,
    selectUsers
);

export const UsersPage = connect(
    (state) => ({
        order: state.pages['users-landing'].order,
        filter: state.pages['users-landing'].filter,
        sort: selectSort(state),
        users: selectUsers(state),
        usersFilteredData: selectFilteredData(state),
        fields: selectFields(state),
        userListPending: state.users.list.pending,
        userDeletePending: state.users.delete.pending,
    }),
    (dispatch) => ({
        actions: bindActionCreators(
            {
                usersList: list,
                roleList: roleList,
                userDelete: deleteUser,
                userCreateStart: startCreate,
                userUpdateStart: startUpdate,
                setFilter: (value) => set('users-landing', 'filter', value),
                setOrder: (value) => set('users-landing', 'order', value),
                setSort: (value) => set('users-landing', 'sort', value),
            },
            dispatch
        ),
    })
)(UsersPageComponent);
