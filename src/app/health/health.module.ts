import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthRoutingModule } from './health-routing.module';
import { SharedModule } from '../auth/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HealthRoutingModule,
    SharedModule
  ]
})
export class HealthModule { }
