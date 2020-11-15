import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CandidateRoutingModule } from './candidate-routing.module';
import { CandidateListPageComponent } from './pages/candidate-list-page/candidate-list-page.component';
import { CandidateProfilePageComponent } from './pages/candidate-profile-page/candidate-profile-page.component';
import { CandidateListCardComponent } from './pages/candidate-list-card/candidate-list-card.component';


@NgModule({
  declarations: [CandidateListPageComponent, CandidateProfilePageComponent, CandidateListCardComponent],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    NzIconModule,
    NzGridModule,
    NzCardModule,
    NzDescriptionsModule,
    NzDividerModule,
    NzCollapseModule,
    NgApexchartsModule,
  ]
})
export class CandidateModule { }
