import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TasksState } from './tasks.state';
import { getRouterState } from './../router';
import { TaskModel } from './../../../tasks/models/task.model';

export const getTasksState = createFeatureSelector<TasksState>('tasks');

export const getTasksData = createSelector(
  getTasksState,
  (state: TasksState) => state.data
);
export const getTasksError = createSelector(
  getTasksState,
  (state: TasksState) => state.error
);
export const getTasksLoaded = createSelector(
  getTasksState,
  (state: TasksState) => state.loaded
);

export const getSelectedTaskByUrl = createSelector(
  getTasksData,
  getRouterState,
  (tasks, router): TaskModel => {
    const taskID = router.state.params.taskID;
    if (taskID) {
      return tasks.find(task => task.id === +taskID);
    } else {
      return new TaskModel();
    }
  }
);
