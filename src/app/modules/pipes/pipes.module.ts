import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecisionToWordPipe, CandidateDecisionToWordPipe } from './decision-mapping.pipe';
import { MarkdownPipe } from './markdown.pipe';
import { PictureUrlPipe } from './picture-url.pipe';

@NgModule({
  declarations: [DecisionToWordPipe, CandidateDecisionToWordPipe, MarkdownPipe, PictureUrlPipe],
  imports: [CommonModule],
  exports: [DecisionToWordPipe, CandidateDecisionToWordPipe, MarkdownPipe, PictureUrlPipe],
})
export class PipesModule {}
