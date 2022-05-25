import { Component, type OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { type Observable } from 'rxjs';

import { type TaskModel } from './../../models/task.model';
import { selectTasksData, selectTasksError } from './../../../core/@ngrx';
import * as TasksActions from './../../../core/@ngrx/tasks/tasks.actions';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks$!: Observable<ReadonlyArray<TaskModel>>;
  tasksError$!: Observable<Error | string | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    console.log('We have a store! ', this.store);
    this.tasks$ = this.store.select(selectTasksData);
    this.tasksError$ = this.store.select(selectTasksError);

    this.store.dispatch(TasksActions.getTasks());
  }

  onCreateTask(): void {
    this.store.dispatch(
      RouterActions.go({
        path: ['/add']
      })
    );
  }

  onCompleteTask(task: TaskModel): void {
    const taskToComplete: TaskModel = { ...task, done: true };
    this.store.dispatch(TasksActions.completeTask({ task: taskToComplete }));
  }

  onEditTask(task: TaskModel): void {
    const link = ['/edit', task.id];
    this.store.dispatch(
      RouterActions.go({
        path: link
      })
    );
  }

  onDeleteTask(task: TaskModel): void {
    this.store.dispatch(TasksActions.deleteTask({ task }));
  }
}
