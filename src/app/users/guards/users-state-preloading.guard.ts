import { Injectable } from '@angular/core';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { type CanActivate } from '@angular/router';
import { type Observable, of, catchError, take, tap } from 'rxjs';

import { UserModel } from '../models/user.model';
@Injectable({
  providedIn: 'any'
})
export class UsersStatePreloadingGuard implements CanActivate {
  private userService!: EntityCollectionService<UserModel>;

  constructor(entitytServices: EntityServices) {
    this.userService = entitytServices.getEntityCollectionService('User');
  }

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      catchError(() => of(false))
    );
  }

  private checkStore(): Observable<boolean> {
    return this.userService.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.userService.getAll();
        }
      }),
      take(1)
    );
  }
}
