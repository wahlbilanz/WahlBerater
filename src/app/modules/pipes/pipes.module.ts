import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DecisionToWordPipe, CandidateDecisionToWordPipe} from './decision-mapping.pipe';
import { MarkdownPipe } from './markdown.pipe';


@NgModule({
  declarations: [DecisionToWordPipe, CandidateDecisionToWordPipe, MarkdownPipe],
  imports: [
    CommonModule
  ],
  exports:      [ DecisionToWordPipe, CandidateDecisionToWordPipe, MarkdownPipe ],
})
export class PipesModule { }
