import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecisionTemplatesComponent } from './decision-templates/decision-templates.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';



@NgModule({
  declarations: [DecisionTemplatesComponent],
  exports: [
    DecisionTemplatesComponent
  ],
  imports: [
    CommonModule,
    NzBadgeModule,
    NzIconModule
  ]
})
export class HelpersModule { }
