import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ApiService } from '../shared/api.service';
import { Page } from '../shared/models';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})

export class PageComponent implements OnInit {
  public page: Observable<Page>;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.page = this.api.getPage(data.id);
    });
  }
}
