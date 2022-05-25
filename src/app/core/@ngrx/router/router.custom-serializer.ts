import type { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import type { RouterStateSerializer } from '@ngrx/router-store';

import type { RouterStateUrl } from './router.state';

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route: ActivatedRouteSnapshot = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams }
    } = routerState;

    const { params, fragment, data } = route;

    // Only return an object including the URL, queryParams, params, fragment and data
    // instead of the entire snapshot
    return { url, queryParams, params, fragment, data };
  }
}
