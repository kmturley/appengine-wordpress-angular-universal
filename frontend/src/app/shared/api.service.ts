import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { map, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { Category, Page, Post } from '../shared/models';

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

  createKey(type: string, id?: number) {
    if (id) {
      return `${type}_${id}`;
    } else {
      return type;
    }
  }

  createUrl(path: string) {
    return `${environment.url}/wp-json/wp/v2/${path}`;
  }

  getCategory(id: number): Observable<Category> {
    const key = this.createKey(`categories`, id);
    const url = this.createUrl(`categories/${id}`);
    return this.get(url, key, (updatedUrl: string): Observable<any> => {
      return this.http.get<Category>(updatedUrl).pipe(
        map(data => this.set(key, new Category().deserialize(data))),
        catchError(() => throwError('Category not found'))
      );
    });
  }

  getCategories(): Observable<Category[]> {
    const key = this.createKey(`categories`);
    const url = this.createUrl(`categories`);
    return this.get(url, key, (updatedUrl: string): Observable<any> => {
      return this.http.get<Category[]>(updatedUrl).pipe(
        map(items => this.set(key, items.map(item => new Category().deserialize(item))))
      );
    });
  }

  getPage(id: number): Observable<Page> {
    const key = this.createKey(`pages`, id);
    const url = this.createUrl(`pages/${id}`);
    return this.get(url, key, (updatedUrl: string): Observable<any> => {
      return this.http.get<Page>(updatedUrl).pipe(
        map(data => this.set(key, new Page().deserialize(data))),
        catchError(() => throwError('Page not found'))
      );
    });
  }

  getPages(): Observable<Page[]> {
    const key = this.createKey(`pages`);
    const url = this.createUrl(`pages`);
    return this.get(url, key, (updatedUrl: string): Observable<any> => {
      return this.http.get<Page[]>(updatedUrl).pipe(
        map(items => this.set(key, items.map(item => new Page().deserialize(item))))
      );
    });
  }

  getPost(id: number): Observable<Post> {
    const key = this.createKey(`posts`, id);
    const url = this.createUrl(`posts/${id}`);
    return this.get(url, key, (updatedUrl: string): Observable<any> => {
      return this.http.get<Post>(updatedUrl).pipe(
        map(data => this.set(key, new Post().deserialize(data))),
        catchError(() => throwError('Post not found'))
      );
    });
  }

  getPosts(): Observable<Post[]> {
    const key = this.createKey(`posts`);
    const url = this.createUrl(`posts`);
    return this.get(url, key, (updatedUrl: string): Observable<any> => {
      return this.http.get<Post[]>(updatedUrl).pipe(
        map(items => this.set(key, items.map(item => new Post().deserialize(item))))
      );
    });
  }

  get(url: string, id: string, http: (updatedUrl: string) => Observable<any>): Observable<any> {
    const key = makeStateKey(id);
    if (this.data[id] && isPlatformBrowser(this.platformId)) {
      console.log('api.get.data', id);
      return of(this.data[id]);
    } else if (this.transferState.hasKey(key)) {
      console.log('api.get.transferState', id);
      return of(this.transferState.get(key, null));
    } else {
      if (environment.production && isPlatformBrowser(this.platformId)) {
        url = `./json/${id}.json`;
      }
      console.log('api.get.http', id);
      return http(url);
    }
  }

  set(id: string, data: any) {
    console.log('api.set', id);
    const key = makeStateKey(id);
    this.data[id] = data;
    this.transferState.set(key, data);
    return data;
  }
}
