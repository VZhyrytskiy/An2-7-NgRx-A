import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';

import { TasksStoreModule } from './tasks/tasks-store.module';
import { metaReducers } from './meta-reducers';
import { routerReducers, CustomSerializer } from './router';
import { environment } from './../../../environments/environment';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(routerReducers, {
      metaReducers,
      // All checks will automatically be disabled in production builds
      runtimeChecks: {
        strictStateImmutability: true,      // default value is true
        strictActionImmutability: true,     // default value is true
        // router state is not serializable
        // set false if you don't use CustomSerializer
        strictStateSerializability: true,   // default value is false
        // router action is not serializable
        // set false
        strictActionSerializability: false,  // default value is false
        strictActionWithinNgZone: true,      // default value is false
        strictActionTypeUniqueness: true    // default value is false
      }
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal
      // serializer: CustomSerializer // has a priority over routerState
    }),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    TasksStoreModule,
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 25,       // Retains last 25 states
      autoPause: true   // Pauses recording actions and state changes when the extension window is not open
    }) : []
  ]
})
export class RootStoreModule { }
