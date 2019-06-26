import { NgModule, APP_INITIALIZER } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingService } from './app-routing.service';
import { AuthService } from './shared/auth.service';

const routes: Routes = [
  {
    path: 'modules/category',
    pathMatch: 'full',
    loadChildren: './category/category.module#CategoryModule'
  },
  {
    path: 'modules/page',
    pathMatch: 'full',
    loadChildren: './page/page.module#PageModule'
  },
  {
    path: 'modules/post',
    pathMatch: 'full',
    loadChildren: './post/post.module#PostModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: AppRoutingService.appRoutingInit,
      deps: [AppRoutingService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthService,
      multi: true
    },
    AppRoutingService
  ]
})
export class AppRoutingModule { }
