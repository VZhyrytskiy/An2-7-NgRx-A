import { Component, OnInit, OnDestroy } from '@angular/core';

// @NgRx
import { TasksFacade } from 'src/app/core/@ngrx/tasks/tasks.facade';

// rxjs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TaskModel, Task } from './../../models/task.model';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit, OnDestroy {
  task: TaskModel;

  private componentDestroyed$: Subject<void> = new Subject<void>();

  constructor(private tasksFacade: TasksFacade) {}

  ngOnInit(): void {
    const observer = {
      next: task => {
        if (task) {
          this.task = { ...task } as TaskModel;
        } else {
          this.task = new TaskModel();
        }
      },
      error(err) {
        console.log(err);
      },
      complete() {
        console.log('Stream is completed');
      }
    };

    this.tasksFacade.selectedTaskByUrl$
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(observer);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  onSaveTask() {
    const task = { ...this.task } as Task;

    const method = task.id ? 'updateTask' : 'createTask';
    this.tasksFacade[method]({ task });
  }

  onGoBack(): void {
    this.tasksFacade.goTo({ path: ['/home'] });
  }
}
