import type { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import type { RouterState } from './router.state';

export const routerReducers: ActionReducerMap<RouterState> = {
  router: routerReducer
};
