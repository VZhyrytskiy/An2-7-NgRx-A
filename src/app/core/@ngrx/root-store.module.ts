import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// @Ngrx
import { StoreModule } from '@ngrx/store';
import { TasksStoreModule } from './tasks/tasks-store.module';
import { metaReducers } from './meta-reducers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers,
        // All checks will automatically be disabled in production builds
        runtimeChecks: {
          strictStateImmutability: true,      // default value is true
          strictActionImmutability: true,     // default value is true
          strictStateSerializability: true,   // default value is false
          strictActionSerializability: false,  // default value is false
          strictActionWithinNgZone: true,      // default value is false
          strictActionTypeUniqueness: true    // default value is false
        }
      }
    ),
    TasksStoreModule
  ]
})
export class RootStoreModule {}
