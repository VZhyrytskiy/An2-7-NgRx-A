import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { AppState, getTasksLoaded } from './../../core/+store';
import * as TasksActions from './../../core/+store/tasks/tasks.actions';

import { Observable, of } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import { TasksServicesModule } from '../tasks-services.module';

@Injectable({
  providedIn: TasksServicesModule
})
export class TasksStatePreloadingGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}

  canActivate() {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private checkStore(): Observable<boolean> {
    return this.store.pipe(
      select(getTasksLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new TasksActions.GetTasks());
        }
      }),
      take(1)
    );
  }
}
