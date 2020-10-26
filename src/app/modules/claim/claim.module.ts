import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimRoutingModule } from './claim-routing.module';
import { ClaimListPageComponent } from './pages/claim-list-page/claim-list-page.component';
import { ClaimProvPageComponent } from './pages/claim-prov-page/claim-prov-page.component';


@NgModule({
  declarations: [ClaimListPageComponent, ClaimProvPageComponent],
  imports: [
    CommonModule,
    ClaimRoutingModule
  ]
})
export class ClaimModule { }
