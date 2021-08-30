import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

// rxjs
import { EMPTY, Observable, of } from 'rxjs';
import { delay, catchError, finalize, tap, take, switchMap } from 'rxjs/operators';

// NgRx
import { Store } from '@ngrx/store';
import { AppState, selectSelectedUserByUrl } from './../../core/@ngrx';
import * as UsersActions from './../../core/@ngrx/users/users.actions';
import * as RouterActions from './../../core/@ngrx/router/router.actions';

import { UserModel } from './../models/user.model';
import { SpinnerService } from './../../widgets';

@Injectable({
  providedIn: 'any'
})
export class UserResolveGuard implements Resolve<UserModel> {
  constructor(
    private store: Store<AppState>,
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
