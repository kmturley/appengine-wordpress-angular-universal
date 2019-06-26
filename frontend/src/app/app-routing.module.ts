import { NgModule, APP_INITIALIZER } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingService } from './app-routing.service';
import { AuthService } from './shared/auth.service';

const routes: Routes = [];

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
