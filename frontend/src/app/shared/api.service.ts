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
    return this.get(url, id, (): Observable<any> => {
      return this.http.get<Category>(url).pipe(
        map(data => this.set(id, new Category().deserialize(data))),
        catchError(() => throwError('Category not found'))
      );
    });
  }

  getCategories(url: string, id: string): Observable<Category[]> {
    return this.get(url, id, (): Observable<any> => {
      return this.http.get<Category[]>(url).pipe(
        map(items => this.set(id, items.map(item => new Category().deserialize(item))))
      );
    });
  }

  getPage(url: string, id: string): Observable<Page> {
    return this.get(url, id, (): Observable<any> => {
      return this.http.get<Page>(url).pipe(
        map(data => this.set(id, new Page().deserialize(data))),
        catchError(() => throwError('Page not found'))
      );
    });
  }

  getPages(url: string, id: string): Observable<Page[]> {
    return this.get(url, id, (): Observable<any> => {
      return this.http.get<Page[]>(url).pipe(
        map(items => this.set(id, items.map(item => new Page().deserialize(item))))
      );
    });
  }

  get(url: string, id: string, http: () => Observable<any>): Observable<any> {
    const key = makeStateKey(id);
    if (this.data[id] && isPlatformBrowser(this.platformId)) {
      console.log('api.get.data', url, id);
      return of(this.data[id]);
    } else if (this.transferState.hasKey(key)) {
      console.log('api.get.transferState', url, id);
      return of(this.transferState.get(key, null));
    } else {
      if (environment.production && isPlatformBrowser(this.platformId)) {
        url = `./json/${id}.json`;
      }
      console.log('api.get.http', url, id);
      return http();
    }
  }

  set(id: string, data: any) {
    console.log('api.set', id, data);
    const key = makeStateKey(id);
    this.data[id] = data;
    this.transferState.set(key, data);
    return data;
  }
}
