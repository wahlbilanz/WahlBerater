import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateListPageComponent } from './pages/candidate-list-page/candidate-list-page.component';
import { CandidateProfilePageComponent } from './pages/candidate-profile-page/candidate-profile-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CandidateListPageComponent },
  { path: ':candidate_id', component: CandidateProfilePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateRoutingModule {}
