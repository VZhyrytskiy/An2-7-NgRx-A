import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { type CanActivate } from '@angular/router';
import { type Observable, of, catchError, take, tap } from 'rxjs';

import { selectUsersLoaded } from './../../core/@ngrx';
import * as UsersActions from './../../core/@ngrx/users/users.actions';

@Injectable({
  providedIn: 'any'
})
export class UsersStatePreloadingGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      catchError(() => of(false))
    );
  }

  private checkStore(): Observable<boolean> {
    return this.store.select(selectUsersLoaded).pipe(
      tap((loaded: boolean) => {
        if (!loaded) {
          this.store.dispatch(UsersActions.getUsers());
        }
      }),
      take(1)
    );
  }
}
