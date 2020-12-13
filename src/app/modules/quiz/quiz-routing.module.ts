import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizCardComponent } from './quiz-card/quiz-card.component';
import { QuizComponent } from './quiz/quiz.component';
import { AuswertungComponent } from './auswertung/auswertung.component';

const routes: Routes = [
  { path: 'auswertung', component: AuswertungComponent },
  { path: ':claim', component: QuizComponent },
  { path: '', pathMatch: 'full', redirectTo: '/quiz/howto' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizRoutingModule {}
