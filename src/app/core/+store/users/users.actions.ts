import { Action } from '@ngrx/store';

import { UserModel } from './../../../users/models/user.model';

// Actions
// [Users] - namespace
export enum UsersActionTypes {
  GET_USERS = '[Users] GET_USERS',
  GET_USERS_SUCCESS = '[Users] GET_USERS_SUCCESS',
  GET_USERS_ERROR = '[Users] GET_USERS_ERROR',
  GET_USER = '[Users] GET_USER',
  GET_USER_SUCCESS = '[Users] GET_USER_SUCCESS',
  GET_USER_ERROR = '[Users] GET_USER_ERROR',
  CREATE_USER = '[Users] CREATE_USER',
  CREATE_USER_SUCCESS = '[Users] CREATE_USER_SUCCESS',
  CREATE_USER_ERROR = '[Users] CREATE_USER_ERROR',
  UPDATE_USER = '[Users] UPDATE_USER',
  UPDATE_USER_SUCCESS = '[Users] UPDATE_USER_SUCCESS',
  UPDATE_USER_ERROR = '[Users] UPDATE_USER_ERROR',
  DELETE_USER = '[Users] DELETE_USER',
  DELETE_USER_SUCCESS = '[Users] DELETE_USER_SUCCESS',
  DELETE_USER_ERROR = '[Users] DELETE_USER_ERROR',
  SET_ORIGINAL_USER = '[Users] SET_ORIGINAL_USER'
}

// Action Creators
export class GetUsers implements Action {
  readonly type = UsersActionTypes.GET_USERS;
}

export class GetUsersSuccess implements Action {
  readonly type = UsersActionTypes.GET_USERS_SUCCESS;
  constructor(public payload: UserModel[]) {}
}

export class GetUsersError implements Action {
  readonly type = UsersActionTypes.GET_USERS_ERROR;
  constructor(public payload: Error | string) {}
}

export class GetUser implements Action {
  readonly type = UsersActionTypes.GET_USER;
  constructor(public payload: number) {}
}

export class GetUserSuccess implements Action {
  readonly type = UsersActionTypes.GET_USER_SUCCESS;
  constructor(public payload: UserModel) {}
}

export class GetUserError implements Action {
  readonly type = UsersActionTypes.GET_USER_ERROR;
  constructor(public payload: Error | string) {}
}

export class CreateUser implements Action {
  readonly type = UsersActionTypes.CREATE_USER;
  constructor(public payload: UserModel) {}
}

export class CreateUserSuccess implements Action {
  readonly type = UsersActionTypes.CREATE_USER_SUCCESS;
  constructor(public payload: UserModel) {}
}

export class CreateUserError implements Action {
  readonly type = UsersActionTypes.CREATE_USER_ERROR;
  constructor(public payload: Error | string) {}
}

export class UpdateUser implements Action {
  readonly type = UsersActionTypes.UPDATE_USER;
  constructor(public payload: UserModel) {}
}

export class UpdateUserSuccess implements Action {
  readonly type = UsersActionTypes.UPDATE_USER_SUCCESS;
  constructor(public payload: UserModel) {}
}

export class UpdateUserError implements Action {
  readonly type = UsersActionTypes.UPDATE_USER_ERROR;
  constructor(public payload: Error | string) {}
}

export class DeleteUser implements Action {
  readonly type = UsersActionTypes.DELETE_USER;
  constructor(public payload: UserModel) {}
}

export class DeleteUserSuccess implements Action {
  readonly type = UsersActionTypes.DELETE_USER_SUCCESS;
  constructor(public payload: UserModel) {}
}

export class DeleteUserError implements Action {
  readonly type = UsersActionTypes.DELETE_USER_ERROR;
  constructor(public payload: Error | string) {}
}

export class SetOriginalUser implements Action {
  readonly type = UsersActionTypes.SET_ORIGINAL_USER;
  constructor(public payload: UserModel) {}
}

export type UsersActions =
  | GetUsers
  | GetUsersSuccess
  | GetUsersError
  | GetUser
  | GetUserSuccess
  | GetUserError
  | CreateUser
  | CreateUserSuccess
  | CreateUserError
  | UpdateUser
  | UpdateUserSuccess
  | UpdateUserError
  | DeleteUser
  | DeleteUserSuccess
  | DeleteUserError
  | SetOriginalUser;
