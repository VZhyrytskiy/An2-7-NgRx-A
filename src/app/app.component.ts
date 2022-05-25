import { Component, type OnInit, type OnDestroy } from '@angular/core';
import { type ActivatedRoute, type RouterOutlet, type Event, type Data, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { type Subscription, filter, map, switchMap, merge, tap } from 'rxjs';

import { MessagesService, CustomPreloadingStrategyService } from './core';
import { SpinnerService } from './widgets';
import { selectQueryParams, selectRouteParams, selectRouteData, selectUrl } from './core/@ngrx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private sub: { [key: string]: Subscription } = {};

  constructor(
    public messagesService: MessagesService,
    private titleService: Title,
    private router: Router,
    public spinnerService: SpinnerService,
    private preloadingStrategy: CustomPreloadingStrategyService,
    private store: Store,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    // console.log(
    //   `Preloading Modules: `,
    //   this.preloadingStrategy.preloadedModules
    // );
    // this.setPageTitles();

    // Router Selectors Demo
    // const url$ = this.store.select(selectUrl);
    // const queryParams$ = this.store.select(selectQueryParams);
    // const routeParams$ = this.store.select(selectRouteParams);
    // const routeData$ = this.store.select(selectRouteData);
    // const source$ = merge(url$, queryParams$, routeParams$, routeData$);
    // source$.pipe(tap(val => console.log(val))).subscribe();
    this.setMessageServiceOnRefresh();
  }

  ngOnDestroy(): void {
    this.sub['navigationStart'].unsubscribe();
    // this.sub.['navigationEnd'].unsubscribe();
  }

  onDisplayMessages(): void {
    this.router.navigate([{ outlets: { messages: ['messages'] } }]);
    this.messagesService.isDisplayed = true;
  }

  /**
   * @param $event - component instance
   */
  onActivate($event: any, routerOutlet: RouterOutlet): void {
    console.log('Activated Component', $event, routerOutlet);
    // another way to set titles
    this.titleService.setTitle(routerOutlet.activatedRouteData['title']);
    this.metaService.addTags(routerOutlet.activatedRouteData['meta']);
  }

  onDeactivate($event: any, routerOutlet: RouterOutlet): void {
    console.log('Deactivated Component', $event, routerOutlet);

    this.router.routerState
  }

  private setPageTitles(): void {
    this.sub['navigationEnd'] = this.router.events
      .pipe(
        // NavigationStart, NavigationEnd, NavigationCancel,
        // NavigationError, RoutesRecognized, ...
        filter(event => event instanceof NavigationEnd),

        // access to router state, we swap what we’re observing
        // better alternative to accessing the routerState.root directly,
        // is to inject the ActivatedRoute
        // .map(() => this.activatedRoute)
        map(() => this.router.routerState.root),

        // we’ll create a while loop to traverse over the state tree
        // to find the last activated route,
        // and then return it to the stream
        // Doing this allows us to essentially dive into the children
        // property of the routes config
        // to fetch the corresponding page title(s)
        map((route: ActivatedRoute) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route: ActivatedRoute) => route.outlet === 'primary'),
        switchMap((route: ActivatedRoute) => route.data)
      )
      .subscribe((data: Data) => this.titleService.setTitle(data['title']));
  }

  private setMessageServiceOnRefresh(): void {
    this.sub['navigationStart'] = this.router.events
      .pipe(filter((event: Event) => event instanceof NavigationStart))
      .subscribe((event: Event) => {
        this.messagesService.isDisplayed = (event as NavigationStart).url.includes('messages:');
      });

  }
}
