import { Injectable } from '@angular/core';
import { Router, type Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { type Observable, of, EMPTY, catchError, take, switchMap, delay, finalize, tap } from 'rxjs';

import { selectSelectedUserByUrl } from './../../core/@ngrx';
import { SpinnerService } from './../../widgets';
import { type UserModel } from './../models/user.model';
import * as UsersActions from './../../core/@ngrx/users/users.actions';

@Injectable({
  providedIn: 'any'
})
export class UserResolveGuard implements Resolve<UserModel> {
  constructor(
    private store: Store,
    private router: Router,
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
          this.router.navigate(['/users']);
          return EMPTY;
        }
      }),
      take(1),
      catchError(() => {
        this.router.navigate(['/users']);
        // catchError MUST return observable
        return EMPTY;
      }),
      finalize(() => this.spinner.hide())
    );
  }
}
