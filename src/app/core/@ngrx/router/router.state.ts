import type { Params, Data } from '@angular/router';
import type { RouterReducerState } from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
  fragment: string | null;
  data: Data;
}

export interface RouterState {
  router: RouterReducerState<RouterStateUrl>;
}
