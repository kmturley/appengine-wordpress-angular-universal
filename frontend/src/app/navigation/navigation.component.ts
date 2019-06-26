import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutingService } from '../app-routing.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public items: Array<any>;

  constructor(
    private router: Router,
    private routeService: AppRoutingService,
  ) { }

  ngOnInit() {
    this.items = this.routeService.routes;
    console.log(this.items);
    const routerConfig = this.router.config;
    this.items.forEach(route => { routerConfig.push(route); });
    this.router.resetConfig(routerConfig);
  }

}
