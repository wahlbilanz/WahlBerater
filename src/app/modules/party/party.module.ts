import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { PartyCardComponent } from './components/party-card/party-card.component';
import { CandidateDetailPageComponent } from './pages/candidate-detail-page/candidate-detail-page.component';
import { PartyDetailPageComponent } from './pages/party-detail-page/party-detail-page.component';
import { PartyListPageComponent } from './pages/party-list-page/party-list-page.component';
import { PartyRoutingModule } from './party-routing.module';
import { SocialLinksComponent } from './components/social-links/social-links.component';

@NgModule({
  declarations: [PartyListPageComponent, PartyDetailPageComponent, CandidateDetailPageComponent, PartyCardComponent, SocialLinksComponent],
  imports: [CommonModule, PartyRoutingModule, NzIconModule, NzToolTipModule],
})
export class PartyModule {}
