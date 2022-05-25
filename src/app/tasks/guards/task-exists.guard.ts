import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import type { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { type Observable, map, switchMap, take, tap } from 'rxjs';

import { selectTasksData } from './../../core/@ngrx';
import { checkStore } from './check-store.function';
import { type TaskModel } from '../models/task.model';
import * as RouterActions from './../../core/@ngrx/router/router.actions';

@Injectable({
  providedIn: 'root'
})
export class TaskExistsGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return checkStore(this.store).pipe(
      switchMap(() => {
        const id = +route.paramMap.get('taskID')!;
        return this.hasTask(id);
      })
    );
  }

  private hasTask(id: number): Observable<boolean> {
    return this.store.select(selectTasksData).pipe(

      // check if task with id exists
      map((tasks: readonly TaskModel[]) => !!tasks.find(task => task.id === id)),

      // make a side effect
      tap(result => {
        if (!result) {
          this.store.dispatch(RouterActions.go({ path: ['/home'] }));
        }
      }),

      // automatically unsubscribe
      take(1)
    );
  }
}
