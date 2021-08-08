import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { PipesModule } from '../pipes/pipes.module';
import { ClaimRoutingModule } from './claim-routing.module';
import { ClaimListPageComponent } from './pages/claim-list-page/claim-list-page.component';
import { ClaimProvPageComponent } from './pages/claim-prov-page/claim-prov-page.component';
import { ClaimCandidateVizComponent } from './pages/claim-candidate-viz/claim-candidate-viz.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { HelpersModule } from '../helpers/helpers.module';
import { ClaimPartyButtonsComponent } from './pages/claim-party-buttons/claim-party-buttons.component';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ClaimLinksComponent } from './components/claim-links/claim-links.component';

@NgModule({
  declarations: [
    ClaimListPageComponent,
    ClaimProvPageComponent,
    ClaimCandidateVizComponent,
    ClaimPartyButtonsComponent,
    ClaimLinksComponent,
  ],
  imports: [
    CommonModule,
    ClaimRoutingModule,
    NzListModule,
    NzIconModule,
    PipesModule,
    NzBreadCrumbModule,
    NzGridModule,
    NzCardModule,
    NzDescriptionsModule,
    NzDividerModule,
    NzCollapseModule,
    NzBadgeModule,
    HelpersModule,
    NzTagModule,
  ],
  exports: [ClaimCandidateVizComponent, ClaimPartyButtonsComponent, ClaimLinksComponent],
})
export class ClaimModule {}
