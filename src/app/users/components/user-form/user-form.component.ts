import { Component, type OnInit  } from '@angular/core';
import { type Data, type UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { type Observable, type Subscription, map, of, switchMap } from 'rxjs';

import { selectUsersOriginalUser, selectSelectedUserByUrl } from './../../../core/@ngrx';
import { AutoUnsubscribe, DialogService, type CanComponentDeactivate } from './../../../core';
import { type UserModel } from './../../models/user.model';
import * as UsersActions from './../../../core/@ngrx/users/users.actions';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
@AutoUnsubscribe()
export class UserFormComponent implements OnInit, CanComponentDeactivate {
  user!: UserModel;

  private sub!: Subscription;

  constructor(
    private dialogService: DialogService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.sub = this.store.select(selectSelectedUserByUrl)
      .subscribe((user: UserModel) => {
        this.user = { ...user }
        this.store.dispatch(UsersActions.setOriginalUser({ user }));
      });
  }

  onSaveUser(): void {
    const user = { ...this.user };

    if (user.id) {
      this.store.dispatch(UsersActions.updateUser({ user }));
    } else {
      this.store.dispatch(UsersActions.createUser({ user }));
    }
  }

  onGoBack(): void {
    this.store.dispatch(RouterActions.back());
  }

  canDeactivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const flags: boolean[] = [];

    return this.store.select(selectUsersOriginalUser).pipe(
      switchMap((originalUser: UserModel | null) => {
        (Object.keys(originalUser!) as (keyof UserModel)[]).map(key => {
          if (originalUser![key] === this.user[key]) {
            flags.push(true);
          } else {
            flags.push(false);
          }
        });

        if (flags.every(el => el)) {
          return of(true);
        }

        // Otherwise ask the user with the dialog service and return its
        // promise which resolves to true or false when the user decides
        return this.dialogService.confirm('Discard changes?');
      })
    );
  }
}
