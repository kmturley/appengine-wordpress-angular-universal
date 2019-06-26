import { Injectable, NgModule } from '@angular/core';
import { ApiService } from './shared/api.service';
import { Routes } from '@angular/router';

import { environment } from '../environments/environment';

/*
 * Wordpress API
 * Need to find a better way of getting all pages, categories and posts
 * Maybe use the sitemap functionality which should list all pages in the site
 */

@Injectable()
export class AppRoutingService {
  public routes: Routes = [];

  constructor(
    private api: ApiService
  ) { }

  static appRoutingInit(routeService: AppRoutingService) {
    return () => routeService.getRoutes();
  }

  getRoutes() {
    return Promise.all([
      this.api.getPages(environment.url + '/wp-json/wp/v2/pages', 'pages').toPromise(),
      this.api.getPages(environment.url + '/wp-json/wp/v2/categories', 'categories').toPromise()
    ]).then((values) => {
      console.log('values', values);
      values.forEach((value) => {
        this.addRoutes(value);
      });
      return this.routes;
    });
  }

  addRoutes(items) {
    items.forEach(route => {
      let path = route.link.slice(environment.url.length + 1, -1);
      let type = route.type ? route.type : route.taxonomy;
      if (path.startsWith('./')) {
        path = path.slice(2);
      }
      this.routes.push({
          pathMatch: 'full',
          path: path,
          loadChildren: './' + type + '/' + type + '.module#' + type.charAt(0).toUpperCase() + type.slice(1) + 'Module',
          data: {
            title: route.title ? route.title.rendered : route.name,
            type: type
          }
      });
      // add child route
      if (route.taxonomy === 'category') {
        type = 'post';
        this.routes.push({
          pathMatch: 'full',
          path: path + '/:id',
          loadChildren: './' + type + '/' + type + '.module#' + type.charAt(0).toUpperCase() + type.slice(1) + 'Module',
          data: {
            title: route.title ? route.title.rendered : route.name,
            type: type
          }
        });
      }
    });
  }
}
