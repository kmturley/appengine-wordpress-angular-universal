import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { map, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { Category, Page } from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  data = {};

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private http: HttpClient,
    private transferState: TransferState,
  ) { }

  getCategory(url: string, id: string): Observable<Category> {
    return this.http.get<Category>(url).pipe(
      map(data => new Category().deserialize(data)),
      catchError(() => throwError('Category not found'))
    );
  }

  getCategories(url: string, id: string): Observable<Category[]> {
    return this.http.get<Category[]>(url).pipe(
      map(items => items.map(item => new Category().deserialize(item)))
    );
  }

  getPage(url: string, id: string): Observable<Page> {
    return this.http.get<Page>(url).pipe(
      map(data => new Page().deserialize(data)),
      catchError(() => throwError('Page not found'))
    );
  }

  getPages(url: string, id: string): Observable<Page[]> {
    return this.http.get<Page[]>(url).pipe(
      map(items => items.map(item => new Page().deserialize(item)))
    );
  }


  // get(url: string, id: string): Observable<any> {
  //   console.log('api.get', url, id);
  //   const key = makeStateKey(id);
  //   if (this.data[id] && isPlatformBrowser(this.platformId)) {
  //     console.log('api.get.data');
  //     return of(this.data[id]);
  //   } else if (this.transferState.hasKey(key)) {
  //     console.log('api.get.transferState');
  //     const item = this.transferState.get(key, null);
  //     return of(item);
  //   } else {
  //     console.log('api.get.http');
  //     if (environment.production && isPlatformBrowser(this.platformId)) {
  //       url = `./json/${id}.json`;
  //     }
  //     return this.http.get(url).pipe(
  //       map(items => {
  //         this.data[id] = items;
  //         this.transferState.set(key, items);
  //         return items;
  //       })
  //     );
  //   }
  // }

  // post(url, data) {
  //   return this.http.post(url, data);
  // }
}
