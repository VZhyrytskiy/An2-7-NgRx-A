import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { type Resolve } from '@angular/router';
import { type Observable, of, EMPTY, catchError, take, switchMap, delay, finalize, tap } from 'rxjs';

import { selectSelectedUserByUrl } from './../../core/@ngrx';
import { SpinnerService } from './../../widgets';
import { type UserModel } from './../models/user.model';
import * as UsersActions from './../../core/@ngrx/users/users.actions';
import * as RouterActions from './../../core/@ngrx/router/router.actions';

@Injectable({
  providedIn: 'any'
})
export class UserResolveGuard implements Resolve<UserModel> {
  constructor(
    private store: Store,
    private spinner: SpinnerService
  ) {}

  resolve(): Observable<UserModel> {
    console.log('UserResolve Guard is called');
    this.spinner.show();

    return this.store.select(selectSelectedUserByUrl).pipe(
      tap(user => this.store.dispatch(UsersActions.setOriginalUser({ user }))),
      delay(2000),
      switchMap((user: UserModel) => {
        if (user) {
          return of(user);
        } else {
          this.store.dispatch(
            RouterActions.go({
              path: ['/users']
            })
          );

          return EMPTY;
        }
      }),
      take(1),
      catchError(() => {
        this.store.dispatch(
          RouterActions.go({
            path: ['/users']
          })
        );

        // catchError MUST return observable
        return EMPTY;
      }),
      finalize(() => this.spinner.hide())
    );
  }
}
