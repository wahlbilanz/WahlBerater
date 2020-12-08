import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartyRoutingModule } from './party-routing.module';
import { PartyListPageComponent } from './pages/party-list-page/party-list-page.component';
import { PartyDetailPageComponent } from './pages/party-detail-page/party-detail-page.component';
import { CandidateDetailPageComponent } from './pages/candidate-detail-page/candidate-detail-page.component';


@NgModule({
  declarations: [PartyListPageComponent, PartyDetailPageComponent, CandidateDetailPageComponent],
  imports: [
    CommonModule,
    PartyRoutingModule
  ]
})
export class PartyModule { }
