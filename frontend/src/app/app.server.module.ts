import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { ServerTransferStateJsonModule } from './shared/transfer_state_json';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ModuleMapLoaderModule,
    ServerModule,
    ServerTransferStateJsonModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
