import type { ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';

// console.log all actions and state
// export is needed for aot compilation
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    // console.log('state before: ', state);
    // console.log('action: ', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [debug]
  : [];
