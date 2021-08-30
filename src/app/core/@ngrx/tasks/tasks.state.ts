import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';
import { TaskModel } from './../../../tasks/models/task.model';

export interface TasksState extends EntityState<TaskModel> {
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string | null;
}

function selectTaskId(task: TaskModel): number {
  // In this case this would be optional since primary key is id
  return task.id!;
}

function sortTasksByAction(task1: TaskModel, task2: TaskModel): number {
  return task1.action.localeCompare(task2.action);
}

export const adapter: EntityAdapter<TaskModel> = createEntityAdapter<TaskModel>({
  selectId: selectTaskId,
  sortComparer: sortTasksByAction
});

export const initialTasksState: TasksState = adapter.getInitialState({
  loading: false,
  loaded: false,
  error: null
});
