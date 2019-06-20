import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { ServerTransferStateJsonModule } from './shared/transfer_state_json';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateJsonModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
