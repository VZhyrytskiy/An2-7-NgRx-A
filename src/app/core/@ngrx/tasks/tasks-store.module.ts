import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { tasksReducer } from './tasks.reducer';
import { tasksFeatureKey } from '../app.state';
import { TasksEffects } from './tasks.effects';

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      StoreModule.forFeature(tasksFeatureKey, tasksReducer),
      EffectsModule.forFeature([TasksEffects])
  ]
})
export class TasksStoreModule {}
