import type { TasksState } from './tasks';
import type { UsersState } from './users';

export const tasksFeatureKey = 'tasks';
export const usersFeatureKey = 'users';
export interface AppState {
  [tasksFeatureKey]: TasksState;
  [usersFeatureKey]: UsersState;
}
