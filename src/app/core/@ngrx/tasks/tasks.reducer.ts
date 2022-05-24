import { createReducer, on, type Action } from '@ngrx/store';

import { initialTasksState } from './tasks.state';
import * as TasksActions from './tasks.actions';

export const tasksReducer = createReducer(
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
