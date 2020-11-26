import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DecisionToWord, CandidateDecisionToWord} from './decision-mapping';


@NgModule({
  declarations: [DecisionToWord, CandidateDecisionToWord],
  imports: [
    CommonModule
  ],
  exports:      [ DecisionToWord, CandidateDecisionToWord ],
})
export class PipesModule { }
