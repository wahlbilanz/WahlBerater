import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThesisListPageComponent } from './pages/thesis-list-page/thesis-list-page.component';
import { ThesisProvPageComponent } from './pages/thesis-prov-page/thesis-prov-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ThesisListPageComponent },
  { path: ':thesis_id', component: ThesisProvPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThesisRoutingModule {}
