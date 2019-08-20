import { Action, createReducer, on } from '@ngrx/store';

import { TasksState, initialTasksState } from './tasks.state';
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
  on(TasksActions.getTasksSuccess, (state, props) => {
    console.log('GET_TASKS_SUCCESS action being handled!');
    const data = [...props.tasks];
    return {
      ...state,
      data,
      loading: false,
      loaded: true
    };
  }),
  on(TasksActions.getTasksError, (state, props) => {
    console.log('GET_TASKS_ERROR action being handled!');
    const error = props.error;
    return {
      ...state,
      loading: false,
      loaded: false,
      error
    };
  }),
  on(TasksActions.getTask, state => {
    console.log('GET_TASK action being handled!');
    return {
      ...state,
      loading: true,
      loaded: false
    };
  }),
  on(TasksActions.getTaskSuccess, (state, props) => {
    console.log('GET_TASK action being handled!');

    const selectedTask = { ...props.task };
    return {
      ...state,
      loading: false,
      loaded: true,
      selectedTask
    };
  }),
  on(TasksActions.getTaskError, (state, props) => {
    console.log('GET_TASK_ERROR action being handled!');
    const error = props.error;
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
  on(TasksActions.updateTask, state => {
    console.log('UPDATE_TASK action being handled!');
    return { ...state };
  }),

  on(TasksActions.updateTaskSuccess, (state, props) => {
    console.log('UPDATE_TASK_SUCCESS action being handled!');
    const data = [...state.data];
    const task = props.task;
    const index = data.findIndex(t => t.id === task.id);

    data[index] = { ...task };

    return {
      ...state,
      data
    };
  }),

  on(TasksActions.updateTaskError, (state, props) => {
    console.log('UPDATE_TASK_ERROR action being handled!');
    const error = props.error;
    return {
      ...state,
      error
    };
  }),

  on(TasksActions.deleteTask, state => {
    console.log('DELETE_TASK action being handled!');
    return { ...state };
  }),
  on(TasksActions.completeTask, (state, props) => {
    console.log('COMPLETE_TASK action being handled!');

    const id = props.task.id;
    const data = state.data.map(t => {
      if (t.id === id) {
        return { ...props.task, done: true };
      }

      return props.task;
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
