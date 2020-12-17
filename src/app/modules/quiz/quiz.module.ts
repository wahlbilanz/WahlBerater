import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizCardComponent } from './quiz-card/quiz-card.component';
import { QuizComponent } from './quiz/quiz.component';
import { AuswertungComponent } from './auswertung/auswertung.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AuswertungBarchartComponent } from './auswertung-barchart/auswertung-barchart.component';
import { AuswertungBarchartTableComponent } from './auswertung-barchart-table/auswertung-barchart-table.component';
import { PipesModule } from '../pipes/pipes.module';
import { AuswertungHeatmapComponent } from './auswertung-heatmap/auswertung-heatmap.component';
import { AuswertungHeatmapVotesComponent } from './auswertung-heatmap-votes/auswertung-heatmap-votes.component';
import { AuswertungCategoryPanelComponent } from './auswertung-category-panel/auswertung-category-panel.component';
import { CandidateModule } from '../candidate/candidate.module';
import { HelpersModule } from '../helpers/helpers.module';

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
    AuswertungCategoryPanelComponent,
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    NzIconModule,
    NzCollapseModule,
    NzListModule,
    NgApexchartsModule,
    PipesModule,
    NzTabsModule,
    NzToolTipModule,
    NzBadgeModule,
    CandidateModule,
    HelpersModule,
  ],
})
export class QuizModule {}
