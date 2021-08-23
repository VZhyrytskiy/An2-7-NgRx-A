import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// @Ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TasksStoreModule } from './tasks/tasks-store.module';
import { metaReducers } from './meta-reducers';
import { environment } from './../../../environments/environment';

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
    EffectsModule.forRoot([]),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    TasksStoreModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ]
})
export class RootStoreModule {}
