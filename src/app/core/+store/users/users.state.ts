import { UserModel } from './../../../users/models/user.model';

export interface UsersState {
  entities: Readonly<{ [id: number]: UserModel }>;
  originalUser: Readonly<UserModel>;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export const initialUsersState: UsersState = {
  entities: {},
  originalUser: null,
  loading: false,
  loaded: false,
  error: null
};
