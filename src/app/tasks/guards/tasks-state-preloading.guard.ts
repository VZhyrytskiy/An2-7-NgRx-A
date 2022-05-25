import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { type CanActivate } from '@angular/router';
import { type Observable, of, catchError } from 'rxjs';

import { checkStore } from './check-store.function';

@Injectable({
  providedIn: 'root'
})
export class TasksStatePreloadingGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    return checkStore(this.store).pipe(
      catchError(() => of(false))
    );
  }
}
