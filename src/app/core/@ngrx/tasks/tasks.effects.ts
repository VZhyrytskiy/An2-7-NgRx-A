import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';



@Injectable()
export class TasksEffects {



  constructor(private actions$: Actions) {
    console.log('[TASKS EFFECTS]');
  }

}
