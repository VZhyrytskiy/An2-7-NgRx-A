import { Store } from '@ngrx/store';
import { type Observable, tap, filter, take } from 'rxjs';

import { selectTasksLoaded } from './../../core/@ngrx';
import * as TasksActions from './../../core/@ngrx/tasks/tasks.actions';


export function checkStore(store: Store): Observable<boolean> {
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
