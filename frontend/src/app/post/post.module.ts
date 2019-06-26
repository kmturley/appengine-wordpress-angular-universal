import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PostComponent } from './post.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PostComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PostComponent
  ]
})
export class PostModule { }
