import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuizCardComponent} from './quiz-card/quiz-card.component';
import {QuizComponent} from './quiz/quiz.component';
import {AuswertungComponent} from './auswertung/auswertung.component';

const routes: Routes = [
  { path: ':category/:claim', component: QuizComponent },
  { path: 'auswertung', component: AuswertungComponent },
  {path: '', pathMatch: 'full', redirectTo: '/quiz/howto/howto' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
