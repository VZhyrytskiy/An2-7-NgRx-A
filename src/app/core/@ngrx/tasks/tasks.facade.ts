import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { type Observable } from 'rxjs';
import { type NavigationExtras } from '@angular/router';

import { selectTasksData, selectTasksError, selectSelectedTaskByUrl } from './tasks.selectors';
import { type TaskModel } from 'src/app/tasks/models/task.model';
import * as TasksActions from './../../../core/@ngrx/tasks/tasks.actions';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

@Injectable({
  providedIn: 'root'
})
export class TasksFacade {
  tasks$: Observable<ReadonlyArray<TaskModel>>;
  tasksError$: Observable<Error | string | null>;
  selectedTaskByUrl$: Observable<TaskModel>;

  constructor(private store: Store) {
    this.tasks$ = this.store.select(selectTasksData);
    this.tasksError$ = this.store.select(selectTasksError);
    this.selectedTaskByUrl$ = this.store.select(selectSelectedTaskByUrl);
  }

  createTask(props: { task: TaskModel }) {
    this.store.dispatch(TasksActions.createTask(props));
  }

  updateTask(props: { task: TaskModel }) {
    this.store.dispatch(TasksActions.updateTask(props));
  }

  deleteTask(props: { task: TaskModel }) {
    this.store.dispatch(TasksActions.deleteTask(props));
  }

  // TODO: should it be moved to RouterFacade?
  goTo(props: {
    path: any[];
    queryParams?: object;
    extras?: NavigationExtras;
  }) {
    this.store.dispatch(RouterActions.go(props));
  }
}
