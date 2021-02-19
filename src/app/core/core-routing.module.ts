import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: WelcomePageComponent },
  { path: 'docs', loadChildren: () => import('../modules/documentation/documentation.module').then((m) => m.DocumentationModule) },
  { path: 'quiz', loadChildren: () => import('../modules/quiz/quiz.module').then((m) => m.QuizModule) },
  { path: 'claim', loadChildren: () => import('../modules/claim/claim.module').then((m) => m.ClaimModule) },
  { path: 'parties', loadChildren: () => import('../modules/party/party.module').then((m) => m.PartyModule) },
  // { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
