import { Action } from '@ngrx/store';

import { TaskModel } from './../../../tasks/models/task.model';

// [Tasks]- namespace
export enum TasksActionTypes {
  GET_TASKS = '[Tasks] GET_TASKS',
  GET_TASK = '[Tasks] GET_TASK',
  CREATE_TASK = '[Tasks] CREATE_TASK',
  UPDATE_TASK = '[Tasks] UPDATE_TASK',
  DELETE_TASK = '[Tasks] DELETE_TASK',
  DONE_TASK = '[Tasks] DONE_TASK'
}

export class GetTasks implements Action {
  readonly type = TasksActionTypes.GET_TASKS;
}

export class GetTask implements Action {
  readonly type = TasksActionTypes.GET_TASK;
  constructor(public payload: number) { }
}

export class CreateTask implements Action {
  readonly type = TasksActionTypes.CREATE_TASK;
  constructor(public payload: TaskModel) { }
}

export class UpdateTask implements Action {
  readonly type = TasksActionTypes.UPDATE_TASK;
  constructor(public payload: TaskModel) { }
}

export class DeleteTask implements Action {
  readonly type = TasksActionTypes.DELETE_TASK;
  constructor(public payload: TaskModel) { }
}

export class DoneTask implements Action {
  readonly type = TasksActionTypes.DONE_TASK;
  constructor(public payload: TaskModel) { }
}

export type TasksActions
  = GetTasks
  | GetTask
  | CreateTask
  | UpdateTask
  | DeleteTask
  | DoneTask;
