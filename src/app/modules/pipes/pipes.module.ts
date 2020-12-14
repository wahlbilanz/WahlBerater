import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecisionToWordPipe, CandidateDecisionToWordPipe } from './decision-mapping.pipe';
import { MarkdownPipe } from './markdown.pipe';
import { PersonalDataPipe } from './personal-data.pipe';

@NgModule({
  declarations: [DecisionToWordPipe, CandidateDecisionToWordPipe, MarkdownPipe, PersonalDataPipe],
  imports: [CommonModule],
  exports: [DecisionToWordPipe, CandidateDecisionToWordPipe, MarkdownPipe, PersonalDataPipe],
})
export class PipesModule {}
