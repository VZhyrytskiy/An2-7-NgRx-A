import { Injectable } from '@angular/core';

// @Ngrx
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as UsersActions from './users.actions';
import * as RouterActions from './../router/router.actions';

// Rxjs
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, concatMap, pluck } from 'rxjs/operators';

import { UserObservableService } from './../../../users/services';
import { UserModel } from '../../../users/models/user.model';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private userObservableService: UserObservableService
  ) {
    console.log('[USERS EFFECTS]');
  }

  @Effect()
  getUsers$: Observable<Action> = this.actions$.pipe(
    ofType<UsersActions.GetUsers>(UsersActions.UsersActionTypes.GET_USERS),
    switchMap(action =>
      this.userObservableService.getUsers().pipe(
        map(users => new UsersActions.GetUsersSuccess(users)),
        catchError(err => of(new UsersActions.GetUsersError(err)))
      )
    )
  );

  @Effect()
  getUser$: Observable<Action> = this.actions$.pipe(
    ofType<UsersActions.GetUser>(UsersActions.UsersActionTypes.GET_USER),
    pluck('payload'),
    switchMap((payload: number) =>
      this.userObservableService.getUser(payload).pipe(
        map(user => new UsersActions.GetUserSuccess(user)),
        catchError(err => of(new UsersActions.GetUserError(err)))
      )
    )
  );

  @Effect()
  updateUser$: Observable<Action> = this.actions$.pipe(
    ofType<UsersActions.UpdateUser>(UsersActions.UsersActionTypes.UPDATE_USER),
    pluck('payload'),
    concatMap((payload: UserModel) =>
      this.userObservableService.updateUser(payload).pipe(
        map(user => new UsersActions.UpdateUserSuccess(user)),
        catchError(err => of(new UsersActions.UpdateUserError(err)))
      )
    )
  );

  @Effect()
  createUser$: Observable<Action> = this.actions$.pipe(
    ofType<UsersActions.CreateUser>(UsersActions.UsersActionTypes.CREATE_USER),
    pluck('payload'),
    concatMap((payload: UserModel) =>
      this.userObservableService.createUser(payload).pipe(
        map(user => new UsersActions.CreateUserSuccess(user)),
        catchError(err => of(new UsersActions.CreateUserError(err)))
      )
    )
  );

  @Effect()
  deleteUser$: Observable<Action> = this.actions$.pipe(
    ofType<UsersActions.DeleteUser>(UsersActions.UsersActionTypes.DELETE_USER),
    pluck('payload'),
    concatMap((payload: UserModel) =>
      this.userObservableService.deleteUser(payload).pipe(
        // Note: json-server doesn't return deleted user
        // so we use payload
        map(() => new UsersActions.DeleteUserSuccess(payload)),
        catchError(err => of(new UsersActions.DeleteUserError(err)))
      )
    )
  );

  @Effect()
  createUpdateUserSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<UsersActions.CreateUser | UsersActions.UpdateUser>(
      UsersActions.UsersActionTypes.CREATE_USER_SUCCESS,
      UsersActions.UsersActionTypes.UPDATE_USER_SUCCESS
    ),
    pluck('payload'),
    map((user: UserModel) => {
      // in this case we always pass created and edited user
      const path = ['/users', { editedUserID: user.id }];
      return new RouterActions.Go({ path });
    })
  );
}
