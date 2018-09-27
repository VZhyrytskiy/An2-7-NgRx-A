import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

import { TaskModel } from './../../../tasks/models/task.model';

export interface TasksState extends EntityState<TaskModel> {
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export const taskAdapter: EntityAdapter<TaskModel> = createEntityAdapter<
  TaskModel
>();

export const initialTasksState: TasksState = taskAdapter.getInitialState({
  loading: false,
  loaded: false,
  error: null
});
