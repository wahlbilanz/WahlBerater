import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateDetailPageComponent } from './pages/candidate-detail-page/candidate-detail-page.component';
import { PartyDetailPageComponent } from './pages/party-detail-page/party-detail-page.component';
import { PartyListPageComponent } from './pages/party-list-page/party-list-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: PartyListPageComponent },
  { path: ':party_id', component: PartyDetailPageComponent },
  { path: ':party_id/:candidate_id', component: CandidateDetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartyRoutingModule {}
