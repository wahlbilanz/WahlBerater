import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClaimListPageComponent } from './pages/claim-list-page/claim-list-page.component';
import { ClaimProvPageComponent } from './pages/claim-prov-page/claim-prov-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ClaimListPageComponent },
  { path: ':claimId', component: ClaimProvPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaimRoutingModule {}
