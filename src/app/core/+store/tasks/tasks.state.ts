import { TaskModel } from './../../../tasks/models/task.model';

export interface TasksState {
  data: ReadonlyArray<TaskModel>;
}

export const initialTasksState: TasksState = {
    data: [
      new TaskModel(1, 'Estimate', 1, 8, 8, true),
      new TaskModel(2, 'Create', 2, 8, 4, false),
      new TaskModel(3, 'Deploy', 3, 8, 0, false)
    ]
};
