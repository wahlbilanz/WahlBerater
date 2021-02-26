import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { HelpersModule } from '../helpers/helpers.module';
import { PipesModule } from '../pipes/pipes.module';
import { AuswertungBarchartTableComponent } from './auswertung-barchart-table/auswertung-barchart-table.component';
import { AuswertungBarchartComponent } from './auswertung-barchart/auswertung-barchart.component';
import { AuswertungCategoryPanelComponent } from './auswertung-category-panel/auswertung-category-panel.component';
import { AuswertungHeatmapVotesComponent } from './auswertung-heatmap-votes/auswertung-heatmap-votes.component';
import { AuswertungHeatmapComponent } from './auswertung-heatmap/auswertung-heatmap.component';
import { AuswertungComponent } from './auswertung/auswertung.component';
import { QuizCardComponent } from './quiz-card/quiz-card.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz/quiz.component';
import { AccessibleQuizComponent } from './accessible-quiz/accessible-quiz.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ClaimModule } from '../claim/claim.module';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    AccessibleQuizComponent,
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
    HelpersModule,
    NzSwitchModule,
    FormsModule,
    NzButtonModule,
    ClaimModule,
  ],
})
export class QuizModule {}
