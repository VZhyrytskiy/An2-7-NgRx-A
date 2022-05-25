import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UsersEffects } from './users.effects';
import { usersFeatureKey } from '../app.state';
import { usersReducer } from './users.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(usersFeatureKey, usersReducer),
    EffectsModule.forFeature([UsersEffects])
  ]
})
export class UsersStoreModule {}
