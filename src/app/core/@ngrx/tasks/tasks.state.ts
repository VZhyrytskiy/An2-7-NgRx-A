import { TaskModel } from './../../../tasks/models/task.model';
export interface TasksState {
  data: ReadonlyArray<TaskModel>;
  selectedTask: Readonly<TaskModel> | null;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string | null;
}

export const initialTasksState: TasksState = {
  data: [],
  selectedTask: null,
  loading: false,
  loaded: false,
  error: null
};
