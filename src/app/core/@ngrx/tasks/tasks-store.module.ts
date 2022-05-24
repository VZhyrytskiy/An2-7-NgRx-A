import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { tasksReducer } from './tasks.reducer';
import { tasksFeatureKey } from '../app.state';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature(tasksFeatureKey, tasksReducer)]
})
export class TasksStoreModule {}
