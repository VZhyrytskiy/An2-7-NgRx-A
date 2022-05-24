import { createFeatureSelector, createSelector } from '@ngrx/store';

import { tasksFeatureKey } from '../app.state';
import { type TasksState } from './tasks.state';

export const selectTasksState = createFeatureSelector<TasksState>(tasksFeatureKey);

export const selectTasksData = createSelector(selectTasksState, (state: TasksState) => state.data);
export const selectTasksError = createSelector(selectTasksState, (state: TasksState) => state.error);
export const selectSelectedTask = createSelector(selectTasksState, (state: TasksState) => state.selectedTask);
export const selectTasksLoaded = createSelector(selectTasksState, (state: TasksState) => state.loaded);
