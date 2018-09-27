import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// @Ngrx
import { Store, select } from '@ngrx/store';
import * as TasksActions from './../../../core/+store/tasks/tasks.actions';
import { AppState, getTasksData, getTasksError } from './../../../core/+store';

// Rxjs
import { Observable } from 'rxjs';

import { TaskModel } from './../../models/task.model';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<ReadonlyArray<TaskModel>>;
  tasksError$: Observable<Error | string>;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    console.log('We have a store! ', this.store);
    this.tasks$ = this.store.pipe(select(getTasksData));
    this.tasksError$ = this.store.pipe(select(getTasksError));

    this.store.dispatch(new TasksActions.GetTasks());
  }

  onCreateTask() {
    const link = ['/add'];
    this.router.navigate(link);
  }

  onCompleteTask(task: TaskModel): void {
    const doneTask = { ...task, done: true };
    this.store.dispatch(new TasksActions.UpdateTask(doneTask));
  }

  onEditTask(task: TaskModel): void {
    const link = ['/edit', task.id];
    this.router.navigate(link);
  }

  onDeleteTask(task: TaskModel) {
    this.store.dispatch(new TasksActions.DeleteTask(task));
  }
}
