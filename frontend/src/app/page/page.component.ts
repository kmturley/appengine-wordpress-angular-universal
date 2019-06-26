import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})

export class PageComponent implements OnInit, OnDestroy {
  public page: any;
  public subscription: Subscription;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subscription = this.api.getPage('/wp-json/bynd-middleware/v1/pages', 'pages').subscribe((pages) => {
      this.page = pages[this.route.routeConfig.path];
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
