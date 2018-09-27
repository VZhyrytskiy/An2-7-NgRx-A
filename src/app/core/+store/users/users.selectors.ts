import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UsersState } from './users.state';
import { UserModel } from './../../../users/models/user.model';
import { getRouterState } from './../router/router.selectors';

const getEntities = (state: UsersState) => state.entities;
const getOriginalUser = (state: UsersState) => state.originalUser;
const getLoaded = (state: UsersState) => state.loaded;
const getLoading = (state: UsersState) => state.loading;
const getError = (state: UsersState) => state.error;

export const getUsersState = createFeatureSelector<UsersState>('users');

const getUsersEntitites = createSelector(getUsersState, getEntities);
export const getUsersOriginalUser = createSelector(getUsersState, getOriginalUser);
export const getUsersLoaded = createSelector(getUsersState, getLoaded);
export const getUsersLoading = createSelector(getUsersState, getLoading);
export const getUsersError = createSelector(getUsersState, getError);

/**
 * transform object to array
 */
export const getUsers = createSelector(getUsersEntitites, entities => {
    return Object.keys(entities).map(id => entities[+id]);
});

export const getEditedUser = createSelector(
    getUsersEntitites,
    getRouterState,
    (users, router): UserModel => {
        const userID = router.state.params.editedUserID;
        if (userID) {
            return users[userID];
        } else {
            return null;
        }
});

export const getSelectedUserByUrl = createSelector(
    getUsersEntitites,
    getRouterState,
    (users, router): UserModel => {
        const userID = router.state.params.userID;
        if (userID) {
            return users[userID];
        } else {
            return new UserModel(null, '', '');
        }
});
