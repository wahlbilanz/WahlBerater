import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { HelpersModule } from '../helpers/helpers.module';
import { PipesModule } from '../pipes/pipes.module';
import { CandidateCardComponent } from './components/candidate-card/candidate-card.component';
import { PartyCardComponent } from './components/party-card/party-card.component';
import { SocialLinksComponent } from './components/social-links/social-links.component';
import { CandidateDetailPageComponent } from './pages/candidate-detail-page/candidate-detail-page.component';
import { PartyDetailPageComponent } from './pages/party-detail-page/party-detail-page.component';
import { PartyListPageComponent } from './pages/party-list-page/party-list-page.component';
import { PartyRoutingModule } from './party-routing.module';

@NgModule({
  declarations: [
    PartyListPageComponent,
    PartyDetailPageComponent,
    CandidateDetailPageComponent,
    PartyCardComponent,
    SocialLinksComponent,
    CandidateCardComponent,
  ],
  imports: [
    CommonModule,
    PartyRoutingModule,
    HelpersModule,
    NzIconModule,
    NzToolTipModule,
    PipesModule,
    NzBreadCrumbModule,
    NzCollapseModule,
  ],
})
export class PartyModule {}
