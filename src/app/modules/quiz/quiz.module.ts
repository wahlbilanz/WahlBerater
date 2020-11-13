import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizCardComponent } from './quiz-card/quiz-card.component';
import { QuizComponent } from './quiz/quiz.component';


@NgModule({
  declarations: [QuizCardComponent, QuizComponent],
  imports: [
    CommonModule,
    QuizRoutingModule,
    NzIconModule
  ]
})
export class QuizModule { }
