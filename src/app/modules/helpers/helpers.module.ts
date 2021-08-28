import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecisionTemplatesComponent } from './decision-templates/decision-templates.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DecisionIconComponent } from './components/decision-icon/decision-icon.component';
import { DecisionButtonComponent } from './components/decision-button/decision-button.component';
import { RouterModule } from '@angular/router';
import { PartyCandidatesDecisionTableComponent } from './components/party-candidates-decision-table/party-candidates-decision-table.component';
import { PipesModule } from '../pipes/pipes.module';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    DecisionTemplatesComponent,
    DecisionIconComponent,
    DecisionButtonComponent,
    PartyCandidatesDecisionTableComponent,
    FooterComponent,
  ],
  exports: [
    DecisionTemplatesComponent,
    DecisionIconComponent,
    DecisionButtonComponent,
    PartyCandidatesDecisionTableComponent,
    FooterComponent,
  ],
  imports: [CommonModule, NzBadgeModule, NzIconModule, RouterModule, PipesModule],
})
export class HelpersModule {}
