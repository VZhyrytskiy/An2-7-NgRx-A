import { createReducer, on } from '@ngrx/store';
import { initialTasksState } from './tasks.state';

import type { Action } from '@ngrx/store';
import type { TasksState } from './tasks.state';
import type { TaskModel } from './../../../tasks/models/task.model';
import * as TasksActions from './tasks.actions';

const reducer = createReducer(
  initialTasksState,
  on(TasksActions.getTasks, state => {
    console.log('GET_TASKS action being handled!');
    return { ...state };
  }),
  on(TasksActions.getTask, state => {
    console.log('GET_TASK action being handled!');
    return { ...state };
  }),
  on(TasksActions.createTask, state => {
    console.log('CREATE_TASK action being handled!');
    return { ...state };
  }),
  on(TasksActions.updateTask, state => {
    console.log('UPDATE_TASK action being handled!');
    return { ...state };
  }),
  on(TasksActions.deleteTask, state => {
    console.log('DELETE_TASK action being handled!');
    return { ...state };
  }),
  on(TasksActions.completeTask, (state, { task }) => {
    console.log('COMPLETE_TASK action being handled!');

    const id = task.id;
    const data = state.data.map(t => {
      if (t.id === id) {
        return { ...task, done: true } as TaskModel;
      }

      return t;
    });

    return {
      ...state,
      data
    };
  })
);

// Must wrap the constant in a function as AOT compiler does not currently
// support function expressions
export function tasksReducer(state: TasksState | undefined, action: Action) {
  return reducer(state, action);
}
