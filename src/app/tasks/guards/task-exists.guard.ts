import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

// ngrx
import { Store, select } from '@ngrx/store';
import { AppState, getTasksData } from './../../core/+store';
import * as RouterActions from './../../core/+store/router/router.actions';

// rxjs
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { TasksServicesModule } from '../tasks-services.module';
import { checkStore } from './check-store.function';
@Injectable({
  providedIn: TasksServicesModule
})
export class TaskExistGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return checkStore(this.store).pipe(
      switchMap(() => {
        const id = +route.paramMap.get('taskID');
        return this.hasTask(id);
      })
    );
  }

  private hasTask(id: number): Observable<boolean> {
    return this.store.pipe(
      select(getTasksData),

      // check if task with id exists
      map(tasks => !!tasks.find(task => task.id === id)),

      // make a side effect
      tap(result => {
        if (!result) {
          this.store.dispatch(new RouterActions.Go({ path: ['/home'] }));
        }
      }),

      // automatically unsubscribe
      take(1)
    );
  }
}
