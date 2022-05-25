import { Component, type OnInit, ViewChild  } from '@angular/core';
import { EntityCollectionService, EntityServices } from '@ngrx/data';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { type UrlTree } from '@angular/router';
import { type Observable, type Subscription } from 'rxjs';

import { AutoUnsubscribe, DialogService, type CanComponentDeactivate } from './../../../core';
import { type UserModel } from './../../models/user.model';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';
import { selectSelectedUserByUrl } from 'src/app/core/@ngrx/data/entity-store.module';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
@AutoUnsubscribe()
export class UserFormComponent implements OnInit, CanComponentDeactivate {
  user!: UserModel;

  @ViewChild('form', { static: false })
  userForm!: NgForm;

  private sub!: Subscription;
  private userService!: EntityCollectionService<UserModel>;
  private isSubmitClick = false;

  constructor(
    private dialogService: DialogService,
    private store: Store,
    entitytServices: EntityServices
  ) {
    // get service for the entity User
    this.userService = entitytServices.getEntityCollectionService('User');
  }

  ngOnInit(): void {
    this.sub = this.store.select(selectSelectedUserByUrl)
      .subscribe((user: UserModel) => {
        this.user = { ...user }
      });
  }

  onSaveUser(): void {
    const user = { ...this.user };
    this.isSubmitClick = true;

    if (user.id) {
      this.userService.update(user);
    } else {
      this.userService.add(user);
    }

    this.onGoBack();
  }

  onGoBack(): void {
    this.store.dispatch(RouterActions.back());
  }

  canDeactivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.isSubmitClick) {
      return true;
    }

    if (this.userForm.pristine) {
      return true;
    }

    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }
}
