import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlTree } from '@angular/router';
import { Location } from '@angular/common';

// rxjs
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

// @Ngrx
import { Store } from '@ngrx/store';
import { AppState, selectUsersOriginalUser } from './../../../core/@ngrx';
import * as UsersActions from './../../../core/@ngrx/users/users.actions';

import { DialogService, CanComponentDeactivate } from './../../../core';
import { UserModel } from './../../models/user.model';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, CanComponentDeactivate {
  user!: UserModel;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private dialogService: DialogService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // data is an observable object
    // which contains custom and resolve data
    this.route.data.pipe(map(data => data.user)).subscribe((user: UserModel) => {
      this.user = { ...user };
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
    this.location.back();
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
