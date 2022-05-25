import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityDataModule, DefaultDataServiceConfig, type EntityMetadataMap } from '@ngrx/data';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectRouterState } from '../router/router.selectors';
import { UserModel } from 'src/app/users/models/user.model';

// укaзазать конфиг
const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'http://localhost:3000/'
};

// указать правила для множественного числа
// правило нестандартное, для json-server
const pluralNames = {
  User: 'User'
};

// добавить одну коллекцию User
export const entityMetadata: EntityMetadataMap = {
  User: {}
};

// кастомный фиче селектор
export const selectEntityCacheState = createFeatureSelector('entityCache');

// кастомный селектор
export const selectUsersEntitites = createSelector(
  selectEntityCacheState,
  (entityState: any) => {
    return entityState.User.entities;
  }
);

// кастомный селектор
export const selectEditedUser = createSelector(
  selectUsersEntitites,
  selectRouterState,
  (users, router): UserModel | null => {
    const userID = router.state.params['editedUserID'];
    if (userID && users) {
      return users[userID];
    } else {
      return null;
    }
  }
);

// кастомный селектор
export const selectSelectedUserByUrl = createSelector(
  selectUsersEntitites,
  selectRouterState,
  (users, router): UserModel => {
    const userID = router.state.params['userID'];
    if (userID && users) {
      return users[userID];
    } else {
      return new UserModel(null, '', '');
    }
  }
);

@NgModule({
  imports: [
    CommonModule,
    EntityDataModule.forRoot({ entityMetadata, pluralNames })
  ],
  providers: [
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }
  ]
})
export class EntityStoreModule {}
