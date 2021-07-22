import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecisionTemplatesComponent } from './decision-templates/decision-templates.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DecisionIconComponent } from './components/decision-icon/decision-icon.component';
import { DecisionButtonComponent } from './components/decision-button/decision-button.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DecisionTemplatesComponent, DecisionIconComponent, DecisionButtonComponent],
  exports: [DecisionTemplatesComponent, DecisionIconComponent, DecisionButtonComponent],
  imports: [CommonModule, NzBadgeModule, NzIconModule, RouterModule],
})
export class HelpersModule {}
