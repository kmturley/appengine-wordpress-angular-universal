import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

import { ApiService } from '../shared/api.service';
import { environment } from '../../environments/environment';
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
      this.page = this.api.getPage(`${environment.url}/wp-json/wp/v2/pages/${data.id}`, `page_${data.id}`);
    });
  }
}
