import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

// @NgRx
import { Store } from '@ngrx/store';
import { AppState, selectSelectedTask } from './../../../core/@ngrx';
import * as TasksActions from './../../../core/@ngrx/tasks/tasks.actions';

// rxjs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TaskModel } from './../../models/task.model';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit, OnDestroy {
  task!: TaskModel;

  private componentDestroyed$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    let observer: any = {
      next: (task: TaskModel) => {
        if (task) {
          this.task = {...task};
        } else {
          this.task = new TaskModel();
        }
      },
      error(err: any) {
        console.log(err);
      },
      complete() {
        console.log('Stream is completed');
      }
    };

    this.store.select(selectSelectedTask)
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(observer);

    observer = {
      next: (params: ParamMap) => {
        const id = params.get('taskID');
        if (id) {
          this.store.dispatch(TasksActions.getTask({ taskID: +id }));
        }
      }
    };

    this.route.paramMap.subscribe(observer);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  onSaveTask(): void {
    const task = { ...this.task } as TaskModel;

    if (task.id) {
      this.store.dispatch(TasksActions.updateTask({ task }));
    } else {
      this.store.dispatch(TasksActions.createTask({ task }));
    }
  }

  onGoBack(): void {
    this.router.navigate(['/home']);
  }
}
