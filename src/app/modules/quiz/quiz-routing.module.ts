import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizCardComponent } from './quiz-card/quiz-card.component';
import { QuizComponent } from './quiz/quiz.component';
import { AuswertungComponent } from './auswertung/auswertung.component';
import { ResultUrl, QuizFirstPage, AccessibleUrl } from '../../+state/app.models';
import { AccessibleQuizComponent } from './accessible-quiz/accessible-quiz.component';

const routes: Routes = [
  { path: ResultUrl, component: AuswertungComponent },
  { path: AccessibleUrl, component: AccessibleQuizComponent },
  { path: ':claim', component: QuizComponent },
  { path: '', pathMatch: 'full', redirectTo: '/quiz/' + QuizFirstPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizRoutingModule {}
