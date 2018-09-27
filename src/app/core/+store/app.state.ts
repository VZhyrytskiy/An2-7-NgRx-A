import { TasksState } from './tasks';
import { UsersState } from './users';

export interface AppState {
  tasks: TasksState;
  users: UsersState;
}
