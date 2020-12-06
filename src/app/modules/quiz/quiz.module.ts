import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizCardComponent } from './quiz-card/quiz-card.component';
import { QuizComponent } from './quiz/quiz.component';
import { AuswertungComponent } from './auswertung/auswertung.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AuswertungBarchartComponent } from './auswertung-barchart/auswertung-barchart.component';
import { AuswertungBarchartTableComponent } from './auswertung-barchart-table/auswertung-barchart-table.component';
// import {DecisionToWord, CandidateDecisionToWord} from '../../definitions/functions/decision-mapping.function';
import { PipesModule } from '../pipes/pipes.module';
import { AuswertungHeatmapComponent } from './auswertung-heatmap/auswertung-heatmap.component';
import { AuswertungHeatmapVotesComponent } from './auswertung-heatmap-votes/auswertung-heatmap-votes.component';

@NgModule({
  declarations: [
    QuizCardComponent,
    QuizComponent,
    AuswertungComponent,
    AuswertungBarchartComponent,
    AuswertungBarchartTableComponent,
    AuswertungBarchartTableComponent,
    AuswertungHeatmapComponent,
    AuswertungHeatmapVotesComponent,
  ],
  imports: [CommonModule, QuizRoutingModule, NzIconModule, NzCollapseModule, NzListModule, NgApexchartsModule, PipesModule, NzTabsModule],
})
export class QuizModule {}
