import { createAction, props } from '@ngrx/store';

import { UserModel } from './../../../users/models/user.model';

export const getUsers = createAction('[Users Page (App)] GET_USERS');
export const getUsersSuccess = createAction(
  '[Get Users Effect] GET_USERS_SUCCEESS',
  props<{ users: UserModel[] }>()
);
export const getUsersError = createAction(
  '[Get Users Effect] GET_USERS_ERROR',
  props<{ error: Error | string | null }>()
);

export const createUser = createAction(
  '[Add/Edit User Page] CREATE_USER',
  props<{ user: UserModel }>()
);

export const createUserSuccess = createAction(
  '[Create User Effect] CREATE_USER_SUCCESS',
  props<{ user: UserModel }>()
);

export const createUserError = createAction(
  '[Create User Effect] CREATE_USER_ERROR',
  props<{ error: Error | string | null }>()
);

export const updateUser = createAction(
  '[Add/Edit User Page] UPDATE_USER',
  props<{ user: UserModel }>()
);

export const updateUserSuccess = createAction(
  '[Update User Effect] UPDATE_USER_SUCCESS',
  props<{ user: UserModel }>()
);

export const updateUserError = createAction(
  '[Update User Effect] UPDATE_USER_ERROR',
  props<{ error: Error | string | null }>()
);

export const deleteUser = createAction(
  '[User List Page] DELETE_USER',
  props<{ user: UserModel }>()
);

export const deleteUserSuccess = createAction(
  '[Delete User Effect] DELETE_USER_SUCCESS',
  props<{ user: UserModel }>()
);

export const deleteUserError = createAction(
  '[Delete User Effect] DELETE_USER_ERROR',
  props<{ error: Error | string | null }>()
);

export const setOriginalUser = createAction(
  '[Add/Edit User Page (App)] SET_ORIGINAL_USER',
  props<{ user: UserModel }>()
);
