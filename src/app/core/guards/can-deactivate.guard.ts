import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { CanComponentDeactivate } from './../interfaces/can-component-deactivate.interface';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate) {
    console.log('CanDeactivate Guard is called');
    return component.canDeactivate();
  }
}
