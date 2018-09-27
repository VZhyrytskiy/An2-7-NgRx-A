import { UsersActionTypes, UsersActions } from './users.actions';
import { initialUsersState, UsersState } from './users.state';

import { UserModel } from './../../../users/models/user.model';

export function usersReducer(
  state = initialUsersState,
  action: UsersActions
): UsersState {
  console.log(`Reducer: Action came in! ${action.type}`);

  switch (action.type) {
    case UsersActionTypes.GET_USERS:
    case UsersActionTypes.GET_USER: {
      return {
        ...state,
        loading: true
      };
    }

    case UsersActionTypes.GET_USERS_SUCCESS: {
      const users = <UserModel[]>action.payload;
      console.log(users);

      const entities = users.reduce(
        (result: { [id: number]: UserModel }, user: UserModel) => {
          return {
            ...result,
            [user.id]: user
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
    }

    case UsersActionTypes.GET_USER_SUCCESS: {
      const originalUser = { ...(<UserModel>action.payload) };

      return {
        ...state,
        loading: false,
        loaded: true,
        originalUser
      };
    }

    case UsersActionTypes.GET_USERS_ERROR:
    case UsersActionTypes.GET_USER_ERROR: {
      const error = action.payload;

      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    }

    case UsersActionTypes.CREATE_USER:
    case UsersActionTypes.UPDATE_USER:
    case UsersActionTypes.DELETE_USER: {
      return {
        ...state
      };
    }

    case UsersActionTypes.CREATE_USER_SUCCESS:
    case UsersActionTypes.UPDATE_USER_SUCCESS: {
      const user = <UserModel>action.payload;
      const entities = {
        ...state.entities,
        [user.id]: user
      };
      const originalUser = { ...(<UserModel>action.payload) };

      return {
        ...state,
        entities,
        originalUser
      };
    }

    case UsersActionTypes.DELETE_USER_SUCCESS: {
      const user = <UserModel>action.payload;
      const { [user.id]: removed, ...entities } = state.entities;

      return {
        ...state,
        entities
      };
    }

    case UsersActionTypes.CREATE_USER_ERROR:
    case UsersActionTypes.UPDATE_USER_ERROR:
    case UsersActionTypes.DELETE_USER_ERROR: {
      const error = action.payload;
      return {
        ...state,
        error
      };
    }

    case UsersActionTypes.SET_ORIGINAL_USER: {
      const originalUser = { ...(<UserModel>action.payload) };

      return {
        ...state,
        originalUser
      };
    }

    default: {
      console.log('UNKNOWN_USER action being handled!');
      return state;
    }
  }
}
