import { createReducer, on } from '@ngrx/store';

import { initialUsersState } from './users.state';
import { type UserModel } from './../../../users/models/user.model';
import * as UsersActions from './users.actions';

export const usersReducer = createReducer(
  initialUsersState,
  on(UsersActions.getUsers, state => {
    return {
      ...state,
      loading: true
    };
  }),

  on(UsersActions.getUsersSuccess, (state, { users }) => {
    const data = [...users];

    const entities = data.reduce(
      (result: { [id: number]: UserModel }, user: UserModel) => {
        return {
          ...result,
          [user.id!]: user
        };
      },
      {
        ...state.entities
      }
    );

    return {
      ...state,
      loading: false,
      loaded: true,
      entities
    };
  }),

  on(UsersActions.getUsersError, (state, { error }) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      error
    };
  }),

  on(
    UsersActions.createUserSuccess,
    UsersActions.updateUserSuccess,
    (state, { user }) => {
      const createdUpdatedUser = { ...user };
      const entities = {
        ...state.entities,
        [createdUpdatedUser.id!]: createdUpdatedUser
      };
      const originalUser = { ...createdUpdatedUser };

      return {
        ...state,
        entities,
        originalUser
      };
    }
  ),

  on(
    UsersActions.createUserError,
    UsersActions.updateUserError,
    UsersActions.deleteUserError,
    (state, { error }) => {
      return {
        ...state,
        error
      };
    }
  ),

  on(UsersActions.deleteUserSuccess, (state, { user }) => {
    const { [user.id!]: removed, ...entities } = state.entities;

    return {
      ...state,
      entities
    };
  }),

  on(UsersActions.setOriginalUser, (state, { user }) => {
    const originalUser = { ...user };

    return {
      ...state,
      originalUser
    };
  })
);
