import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PageComponent } from './page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PageComponent
  ]
})
export class PageModule { }
