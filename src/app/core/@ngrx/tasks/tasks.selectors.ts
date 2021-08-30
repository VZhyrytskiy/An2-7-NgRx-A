import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from './../app.state';
import { TasksState } from './tasks.state';
import { selectRouterState } from './../router';
import { TaskModel } from './../../../tasks/models/task.model';

export const selectTasksState = createFeatureSelector<AppState, TasksState>('tasks');

export const selectTasksData = createSelector(
  selectTasksState,
  (state: TasksState) => state.data
);
export const selectTasksError = createSelector(
  selectTasksState,
  (state: TasksState) => state.error
);
export const selectTasksLoaded = createSelector(
  selectTasksState,
  (state: TasksState) => state.loaded
);

export const selectSelectedTaskByUrl = createSelector(
  selectTasksData,
  selectRouterState,
  (tasks, router): TaskModel => {
    const taskID = router.state.params.taskID;
    if (taskID && Array.isArray(tasks)) {
      return tasks.find(task => task.id === +taskID);
    } else {
      return new TaskModel();
    }
  }
);

