import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// @NgRx
import { Store } from '@ngrx/store';
import * as UsersActions from './../../../core/@ngrx/users/users.actions';
import {
  AppState,
  selectUsers,
  selectUsersError,
  selectEditedUser
} from './../../../core/@ngrx';

// rxjs
import { Observable, Subscription } from 'rxjs';

import { UserModel } from './../../models/user.model';
import { AutoUnsubscribe } from './../../../core/decorators';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
@AutoUnsubscribe('subscription')
export class UserListComponent implements OnInit {
  users$!: Observable<Array<UserModel>>;
  usersError$!: Observable<Error | string | null>;

  private subscription!: Subscription;
  private editedUser!: UserModel | null;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.users$ = this.store.select(selectUsers);
    this.usersError$ = this.store.select(selectUsersError);
    this.store.dispatch(UsersActions.getUsers());

    // listen editedUserID from UserFormComponent
    this.subscription = this.store.select(selectEditedUser).subscribe({
      next: (user: UserModel | null) => {
        this.editedUser = { ...user } as UserModel;
        console.log(
          `Last time you edited user ${JSON.stringify(this.editedUser)}`
        );
      },
      error: (err: any) => console.log(err)
    });
  }

  onEditUser(user: UserModel): void {
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

  onDeleteUser(user: UserModel): void {
    this.store.dispatch(UsersActions.deleteUser({ user }));
  }

  trackByFn(index: number, user: UserModel): number | null {
    return user.id;
  }
}
