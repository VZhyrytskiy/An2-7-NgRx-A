import { createFeatureSelector } from '@ngrx/store';
import { type RouterReducerState, getSelectors } from '@ngrx/router-store';

import type { RouterStateUrl } from './router.state';

const routerFeatureKey = 'router';
export const selectRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>(routerFeatureKey);

export const {
  selectQueryParams,  // select the current route query params
  selectRouteParams,  // select the current route params
  selectRouteData,    // select the current route data
  selectUrl           // select the current url
} = getSelectors(selectRouterState);
