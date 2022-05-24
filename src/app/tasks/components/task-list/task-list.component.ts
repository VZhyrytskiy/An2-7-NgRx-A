import { Component, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { type Observable } from 'rxjs';

import { type TaskModel } from './../../models/task.model';
import { type TasksState, type AppState, tasksFeatureKey} from './../../../core/@ngrx';
import * as TasksActions from './../../../core/@ngrx/tasks/tasks.actions';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasksState$!: Observable<TasksState>;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    console.log('We have a store! ', this.store);
    this.tasksState$ = this.store.select(tasksFeatureKey);

    this.store.dispatch(TasksActions.getTasks());
  }

  onCreateTask() {
    const link = ['/add'];
    this.router.navigate(link);
  }

  onCompleteTask(task: TaskModel): void {
    this.store.dispatch(TasksActions.completeTask({ task }));
  }

  onEditTask(task: TaskModel): void {
    const link = ['/edit', task.id];
    this.router.navigate(link);
  }

  onDeleteTask(task: TaskModel): void {
    this.store.dispatch(TasksActions.deleteTask({ task }));
  }
}
