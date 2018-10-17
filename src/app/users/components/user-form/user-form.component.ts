import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// @Ngrx
import { Store, select } from '@ngrx/store';
import { AppState, getUsersOriginalUser } from './../../../core/+store';
import * as UsersActions from './../../../core/+store/users/users.actions';

// rxjs
import { Observable, of } from 'rxjs';
import { switchMap, pluck } from 'rxjs/operators';

import { DialogService, CanComponentDeactivate } from './../../../core';
import { UserModel } from './../../models/user.model';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, CanComponentDeactivate {
  user: UserModel;

  constructor(
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private store: Store<AppState>,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(pluck('user')).subscribe((user: UserModel) => {
      this.user = { ...user };
    });
  }

  onSaveUser() {
    const user = { ...this.user };

    if (user.id) {
      this.store.dispatch(new UsersActions.UpdateUser(user));
    } else {
      this.store.dispatch(new UsersActions.CreateUser(user));
    }
  }

  onGoBack() {
    this.location.back();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const flags = [];

    return this.store.pipe(
      select(getUsersOriginalUser),
      switchMap(originalUser => {
        for (const key in originalUser) {
          if (originalUser[key] === this.user[key]) {
            flags.push(true);
          } else {
            flags.push(false);
          }
        }

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
