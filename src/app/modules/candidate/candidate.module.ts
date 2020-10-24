import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';
import { CandidateListPageComponent } from './pages/candidate-list-page/candidate-list-page.component';
import { CandidateProfilePageComponent } from './pages/candidate-profile-page/candidate-profile-page.component';


@NgModule({
  declarations: [CandidateListPageComponent, CandidateProfilePageComponent],
  imports: [
    CommonModule,
    CandidateRoutingModule
  ]
})
export class CandidateModule { }
