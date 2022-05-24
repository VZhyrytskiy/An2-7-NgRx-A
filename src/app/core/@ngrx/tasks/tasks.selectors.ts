import { createFeatureSelector } from '@ngrx/store';

import { tasksFeatureKey } from '../app.state';
import { type TasksState } from './tasks.state';

export const selectTasksState = createFeatureSelector<TasksState>(tasksFeatureKey);
