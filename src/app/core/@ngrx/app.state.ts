import type { TasksState } from './tasks';

export const tasksFeatureKey = 'tasks';
export interface AppState {
  [tasksFeatureKey]: TasksState;
}

