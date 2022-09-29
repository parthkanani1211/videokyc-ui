import { createSelector } from 'reselect';

export const selectUserList = (state) => state.users.data;

export const selectUsers = createSelector(selectUserList, (users) => users);

export const createUserSelector = (selectUserId) =>
    createSelector(selectUserId, selectUsers, (userId, users) => {
        return users?.find((user) => user.id === parseInt(userId));
    });

export const selectUserListTiny = (state) => state.users.tinyList;
