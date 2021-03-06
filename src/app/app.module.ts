import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app/components/app-header/app-header.component';
import { AppNavComponent } from './app/components/app-nav/app-nav.component';
import { Store } from './store';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HealthModule
  ],
  providers: [
    Store
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
