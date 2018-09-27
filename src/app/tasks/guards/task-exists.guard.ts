import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { AppState, getTasksLoaded, getTasksData } from './../../core/+store';
import * as TasksActions from './../../core/+store/tasks/tasks.actions';
import * as RouterActions from './../../core/+store/router/router.actions';

import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { TasksServicesModule } from '../tasks-services.module';

@Injectable({
  providedIn: TasksServicesModule
})
export class TaskExistGuard implements CanActivate {

    constructor(
        private store: Store<AppState>
    ) {}

    canActivate(route: ActivatedRouteSnapshot) {
        return this.checkStore().pipe(
            switchMap(() => {
                const id = +route.paramMap.get('taskID');
                return this.hasTask(id);
            })
        );
    }

private hasTask(id: number): Observable<boolean> {
    return this.store.pipe(
      select(getTasksData),
      map(tasks => !!tasks.find(task => task.id === id)),
      tap(result => {
        if (!result) {
          this.store.dispatch(new RouterActions.Go({ path: ['/home'] }));
        }
      }),
      take(1)
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
  }}
