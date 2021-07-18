import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecisionToWordPipe, CandidateDecisionToWordPipe, PartyDecisionToWordPipe } from './decision-mapping.pipe';
import { MarkdownPipe } from './markdown.pipe';
import { PictureUrlPipe } from './picture-url.pipe';
import { PersonalDataOfPipe } from './personal-data.pipe';

@NgModule({
  declarations: [
    DecisionToWordPipe,
    CandidateDecisionToWordPipe,
    PartyDecisionToWordPipe,
    MarkdownPipe,
    PictureUrlPipe,
    PersonalDataOfPipe,
  ],
  imports: [CommonModule],
  exports: [DecisionToWordPipe, CandidateDecisionToWordPipe, PartyDecisionToWordPipe, MarkdownPipe, PictureUrlPipe, PersonalDataOfPipe],
})
export class PipesModule {}
