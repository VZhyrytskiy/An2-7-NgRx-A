import { createFeatureSelector, createSelector } from '@ngrx/store';

import { usersFeatureKey } from '../app.state';
import { UserModel } from './../../../users/models/user.model';
import { selectRouterState } from './../router/router.selectors';
import { type UsersState } from './users.state';

const selectEntities = (state: UsersState) => state.entities;
const selectOriginalUser = (state: UsersState) => state.originalUser;
const selectLoaded = (state: UsersState) => state.loaded;
const selectLoading = (state: UsersState) => state.loading;
const selectError = (state: UsersState) => state.error;

export const selectUsersState = createFeatureSelector<UsersState>(usersFeatureKey);

const selectUsersEntitites = createSelector(
  selectUsersState,
  selectEntities
);
export const selectUsersOriginalUser = createSelector(
  selectUsersState,
  selectOriginalUser
);
export const selectUsersLoaded = createSelector(
  selectUsersState,
  selectLoaded
);
export const selectUsersLoading = createSelector(
  selectUsersState,
  selectLoading
);
export const selectUsersError = createSelector(
  selectUsersState,
  selectError
);

/**
 * transform object to array
 */
export const selectUsers = createSelector(
  selectUsersEntitites,
  entities => {
    return Object.keys(entities).map(id => entities[+id]);
  }
);

export const selectEditedUser = createSelector(
  selectUsersEntitites,
  selectRouterState,
  (users, router): UserModel | null => {
    const userID = router.state.params['editedUserID'];
    if (userID && users) {
      return users[userID];
    } else {
      return null;
    }
  }
);

export const selectSelectedUserByUrl = createSelector(
  selectUsersEntitites,
  selectRouterState,
  (users, router): UserModel => {
    const userID = router.state.params['userID'];
    if (userID && users) {
      return users[userID];
    } else {
      return new UserModel(null, '', '');
    }
  }
);
