import { Action, createReducer, on } from '@ngrx/store';

import { adapter, TasksState, initialTasksState } from './tasks.state';
import * as TasksActions from './tasks.actions';

const reducer = createReducer(
  initialTasksState,
  on(TasksActions.getTasks, state => {
    console.log('GET_TASKS action being handled!');
    return {
      ...state,
      loading: true
    };
  }),
  on(TasksActions.getTasksSuccess, (state, { tasks }) => {
    console.log('GET_TASKS_SUCCESS action being handled!');
    return adapter.setAll(tasks, {
      ...state,
      loading: false,
      loaded: true
    });
  }),

  on(TasksActions.getTasksError, (state, { error }) => {
    console.log('GET_TASKS_ERROR action being handled!');
    return {
      ...state,
      loading: false,
      loaded: false,
      error
    };
  }),

  on(TasksActions.createTask, state => {
    console.log('CREATE_TASK action being handled!');
    return { ...state };
  }),

  on(TasksActions.createTaskSuccess, (state, { task }) => {
    console.log('CREATE_TASK_SUCCESS action being handled!');
    return adapter.addOne(task, state);
  }),

  on(TasksActions.updateTask, state => {
    console.log('UPDATE_TASK action being handled!');
    return { ...state };
  }),

  on(
    TasksActions.updateTaskSuccess,
    (state, { task }) => {
      console.log('UPDATE_TASK_SUCCESS action being handled!');
      return adapter.updateOne({ id: task.id!, changes: task }, state);
    }
  ),

  on(
    TasksActions.createTaskError,
    TasksActions.updateTaskError,
    TasksActions.deleteTaskError,
    (state, { error }) => {
      console.log('CREATE/UPDATE/DELETE_TASK_ERROR action being handled!');
      return {
        ...state,
        error
      };
    }
  ),

  on(TasksActions.deleteTask, state => {
    console.log('DELETE_TASK action being handled!');
    return { ...state };
  }),

  on(TasksActions.deleteTaskSuccess, (state, { task }) => {
    console.log('DELETE_TASK_SUCCESS action being handled!');
    return adapter.removeOne(task.id!, state);
  })
);

// Must wrap the constant in a function as AOT compiler does not currently
// support function expressions
export function tasksReducer(state: TasksState | undefined, action: Action) {
  return reducer(state, action);
}
