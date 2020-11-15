import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizCardComponent } from './quiz-card/quiz-card.component';
import { QuizComponent } from './quiz/quiz.component';
import { AuswertungComponent } from './auswertung/auswertung.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzListModule } from 'ng-zorro-antd/list';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AuswertungBarchartComponent } from './auswertung-barchart/auswertung-barchart.component';

@NgModule({
  declarations: [QuizCardComponent, QuizComponent, AuswertungComponent, AuswertungBarchartComponent],
  imports: [
    CommonModule,
    QuizRoutingModule,
    NzIconModule,
    NzCollapseModule,
    NzListModule,
    NgApexchartsModule
  ]
})
export class QuizModule { }
