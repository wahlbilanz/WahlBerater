import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ClaimRoutingModule } from './claim-routing.module';
import { ClaimListPageComponent } from './pages/claim-list-page/claim-list-page.component';
import { ClaimProvPageComponent } from './pages/claim-prov-page/claim-prov-page.component';
import {CandidateModule} from '../candidate/candidate.module';

@NgModule({
  declarations: [ClaimListPageComponent, ClaimProvPageComponent],
  imports: [CommonModule, ClaimRoutingModule, NzListModule, CandidateModule, NzIconModule],
})
export class ClaimModule {}
