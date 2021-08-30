import { Store } from '@ngrx/store';
import { AppState, selectTasksLoaded } from './../../core/@ngrx';
import * as TasksActions from './../../core/@ngrx/tasks/tasks.actions';

import { Observable } from 'rxjs';
import { tap, filter, take } from 'rxjs/operators';

export function checkStore(store: Store<AppState>): Observable<boolean> {
  return store.select(selectTasksLoaded).pipe(
    // make a side effect
    tap((loaded: boolean) => {
      if (!loaded) {
        store.dispatch(TasksActions.getTasks());
      }
    }),

    // wait, while loaded = true
    filter((loaded: boolean) => loaded),

    // automatically unsubscribe
    take(1)
  );
}
