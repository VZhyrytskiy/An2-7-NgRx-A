import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// @NgRx
import { Store } from '@ngrx/store';
import * as UsersActions from './../../../core/@ngrx/users/users.actions';
import {
  selectUsers,
  selectUsersError,
  selectEditedUser
} from './../../../core/@ngrx';

// rxjs
import { Observable, Subscription } from 'rxjs';

import { UserModel, User } from './../../models/user.model';
import { AutoUnsubscribe } from './../../../core/decorators';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
@AutoUnsubscribe('subscription')
export class UserListComponent implements OnInit {
  users$: Observable<Array<UserModel>>;
  usersError$: Observable<Error | string>;

  private subscription: Subscription;
  private editedUser: UserModel;

  constructor(private router: Router, private store: Store) {}

  ngOnInit() {
    this.users$ = this.store.select(selectUsers);
    this.usersError$ = this.store.select(selectUsersError);
    this.store.dispatch(UsersActions.getUsers());

    // listen editedUserID from UserFormComponent
    this.subscription = this.store.select(selectEditedUser).subscribe({
      next: (user: UserModel) => {
        this.editedUser = { ...user };
        console.log(
          `Last time you edited user ${JSON.stringify(this.editedUser)}`
        );
      },
      error: err => console.log(err)
    });
  }

  onEditUser(user: UserModel) {
    const link = ['/users/edit', user.id];
    this.router.navigate(link);
    // or
    // const link = ['edit', user.id];
    // this.router.navigate(link, {relativeTo: this.route});
  }

  isEdited(user: UserModel): boolean {
    if (this.editedUser) {
      return user.id === this.editedUser.id;
    }
    return false;
  }

  onDeleteUser(user: UserModel) {
    const userToDelete: User = { ...user };
    this.store.dispatch(UsersActions.deleteUser({ user: userToDelete }));
  }
}
