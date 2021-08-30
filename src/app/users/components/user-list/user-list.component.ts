import { Component, OnInit } from '@angular/core';

// @NgRx
import { Store } from '@ngrx/store';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';
import { selectEditedUser } from './../../../core/@ngrx/data/entity-store.module';
import { AppState } from './../../../core/@ngrx';

// rxjs
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

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
  private userService!: EntityCollectionService<UserModel>;

  constructor(private store: Store<AppState>, entitytServices: EntityServices) {
    // получить сервис для entity User
    this.userService = entitytServices.getEntityCollectionService('User');
  }

  ngOnInit(): void {
    // использовать стандартный селектор
    this.users$ = this.userService.entities$;

    // использовать стандартный селектор с преобразованием
    // ошибка храниться в EntityAction
    this.usersError$ = this.userService.errors$.pipe(
      map(action => action.payload.data.error.error.message)
    );

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
    this.store.dispatch(
      RouterActions.go({
        path: link
      })
    );
  }

  isEdited(user: UserModel): boolean {
    if (this.editedUser) {
      return user.id === this.editedUser.id;
    }
    return false;
  }

  onDeleteUser(user: UserModel) {
    // использовать сервис для генерации EntitytAction
    this.userService.delete(user.id!);
  }
}
