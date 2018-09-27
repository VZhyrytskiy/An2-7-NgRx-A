import { TasksActionTypes, TasksActions } from './tasks.actions';
import { taskAdapter, TasksState, initialTasksState } from './tasks.state';

import { TaskModel } from './../../../tasks/models/task.model';

export function tasksReducer(
  state = initialTasksState,
  action: TasksActions
): TasksState {
  console.log(`Reducer: Action came in! ${action.type}`);

  switch (action.type) {
    case TasksActionTypes.GET_TASKS: {
      return {
        ...state,
        loading: true
      };
    }

    case TasksActionTypes.GET_TASKS_SUCCESS: {
      const tasks = [...(<Array<TaskModel>>action.payload)];

      return taskAdapter.addAll(tasks, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case TasksActionTypes.GET_TASKS_ERROR: {
      const error = action.payload;
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    }

    case TasksActionTypes.CREATE_TASK_SUCCESS: {
      const task = { ...(<TaskModel>action.payload) };

      return taskAdapter.addOne(task, state);
    }

    case TasksActionTypes.UPDATE_TASK_SUCCESS: {
      const task = { ...(<TaskModel>action.payload) };

      return taskAdapter.updateOne(
        {
          id: task.id,
          changes: task
        },
        state
      );
    }

    case TasksActionTypes.DELETE_TASK_SUCCESS: {
      const task = { ...(<TaskModel>action.payload) };

      return taskAdapter.removeOne(task.id, state);
    }

    case TasksActionTypes.CREATE_TASK_ERROR:
    case TasksActionTypes.UPDATE_TASK_ERROR:
    case TasksActionTypes.DELETE_TASK_ERROR: {
      const error = action.payload;
      return {
        ...state,
        error
      };
    }

    default: {
      return state;
    }
  }
}
