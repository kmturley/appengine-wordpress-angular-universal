import { Injectable } from '@angular/core';
import { ApiService } from './shared/api.service';
import { Routes } from '@angular/router';

import { environment } from '../environments/environment';
import { forkJoin } from 'rxjs';

@Injectable()
export class AppRoutingService {
  public routes: Routes = [];

  constructor(
    private api: ApiService
  ) { }

  static appRoutingInit(routeService: AppRoutingService) {
    return () => routeService.getRoutes().toPromise();
  }

  getRoutes() {
    const observe = forkJoin([
      this.api.getCategories(),
      this.api.getPages(),
      this.api.getPosts(),
    ]);
    observe.subscribe(values => {
      values.forEach((value) => {
        this.addRoutes(value);
      });
      return this.routes;
    });
    return observe;
  }

  addRoutes(items) {
    items.forEach(route => {
      let path = route.link.slice(environment.url.length + 1, -1);
      const type = route.type ? route.type : route.taxonomy;
      if (path.startsWith('./')) {
        path = path.slice(2);
      }
      if (path === 'home') {
        path = '';
      }
      this.routes.push({
          pathMatch: 'full',
          path: path,
          loadChildren: './' + type + '/' + type + '.module#' + type.charAt(0).toUpperCase() + type.slice(1) + 'Module',
          data: {
            id: route.id,
            title: route.title ? route.title.rendered : route.name,
            type: type
          }
      });
    });
  }
}
