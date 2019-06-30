import { Action, createReducer, on } from '@ngrx/store';

import { TasksState, initialTasksState } from './tasks.state';
import * as TasksActions from './tasks.actions';
import { TaskModel } from 'src/app/tasks/models/task.model';

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
  on(TasksActions.getTaskSuccess, (state, task) => {
    console.log('GET_TASK action being handled!');
    // remove property type
    const { type: deleted, ...selectedTask } = { ...task };
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
  on(TasksActions.deleteTask, state => {
    console.log('DELETE_TASK action being handled!');
    return { ...state };
  }),
  on(TasksActions.doneTask, (state, task) => {
    console.log('DONE_TASK action being handled!');

    const id = task.id;
    const data = state.data.map(t => {
      if (t.id === id) {
        return { ...task, done: true };
      }

      return task;
    });

    return {
      ...state,
      data
    };
  })
);

export function tasksReducer(state: TasksState | undefined, action: Action) {
  return reducer(state, action);
}
