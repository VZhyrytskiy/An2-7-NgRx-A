import { Component, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { type Observable } from 'rxjs';

import { type TaskModel } from './../../models/task.model';
import { selectTasksData, selectTasksError } from './../../../core/@ngrx';
import * as TasksActions from './../../../core/@ngrx/tasks/tasks.actions';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks$!: Observable<ReadonlyArray<TaskModel>>;
  tasksError$!: Observable<Error | string | null>;

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    console.log('We have a store! ', this.store);
    this.tasks$ = this.store.select(selectTasksData);
    this.tasksError$ = this.store.select(selectTasksError);

    this.store.dispatch(TasksActions.getTasks());
  }

  onCreateTask() {
    const link = ['/add'];
    this.router.navigate(link);
  }

  onCompleteTask(task: TaskModel): void {
    const taskToComplete: TaskModel = { ...task, done: true };
    this.store.dispatch(TasksActions.completeTask({ task: taskToComplete }));
  }

  onEditTask(task: TaskModel): void {
    const link = ['/edit', task.id];
    this.router.navigate(link);
  }

  onDeleteTask(task: TaskModel): void {
    this.store.dispatch(TasksActions.deleteTask({ task }));
  }
}
