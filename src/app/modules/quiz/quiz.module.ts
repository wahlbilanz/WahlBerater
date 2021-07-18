import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { AccessibleAuswertungsChartComponent } from './accessible-auswertungs-chart/accessible-auswertungs-chart.component';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [
    QuizCardComponent,
    QuizComponent,
    AuswertungComponent,
    AuswertungBarchartTableComponent,
    AuswertungBarchartTableComponent,
    AuswertungHeatmapComponent,
    AuswertungHeatmapVotesComponent,
    AuswertungCategoryPanelComponent,
    AccessibleQuizComponent,
    AccessibleAuswertungsChartComponent,
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    NzIconModule,
    NzCollapseModule,
    NzListModule,
    PipesModule,
    NzTabsModule,
    NzToolTipModule,
    NzBadgeModule,
    HelpersModule,
    NzSwitchModule,
    FormsModule,
    NzButtonModule,
    ClaimModule,
    NzGridModule,
  ],
})
export class QuizModule {}
