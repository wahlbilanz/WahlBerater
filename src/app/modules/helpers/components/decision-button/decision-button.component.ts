import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DecisionTemplatesComponent } from '../../decision-templates/decision-templates.component';
import { Vote } from '../../../../definitions/models/votes.mode';
import { select, Store } from '@ngrx/store';
import * as AppSelectors from '../../../../+state/app.selectors';
import { AppPartialState } from '../../../../+state/app.reducer';
import { AGREEMENT } from '../../../../definitions/enums/agreement.enum';

@Component({
  selector: 'app-decision-button',
  templateUrl: './decision-button.component.html',
  styleUrls: ['./decision-button.component.scss'],
})
export class DecisionButtonComponent implements OnInit {
  // @ViewChild('decisionTemplates', { static: true }) decisionTemplates: DecisionTemplatesComponent;

  @Input() link: string;
  @Input() label: string;
  // @Input() ownDecision = false;
  @Input() vote: number | Vote;
  @Input() agreement: AGREEMENT;

  /*@Input('vote')
  set voteInput(value: number | Vote) {
    if (value == null) {
      this.vote = null;
    } else if (typeof value === 'number') {
      this.vote = value >= -2 && value <= 2 ? value : null;
    } else {
      this.vote = value.fav ? value.decision * 2 : value.decision;
    }
    this.chooseIcon();
  }*/

  /*@Input('icon')
  set setIcon(value: number | Vote) {
    if (typeof value === 'number') {
      this.decision = value;
      switch (value) {
        case -2:
          this.icon = this.decisionTemplates.noTempleate;
          break;
        case -1:
          this.icon = this.decisionTemplates.noDisagreeTempleate;
          break;
        case 1:
          this.icon = this.decisionTemplates.yesDisagreeTempleate;
          break;
        case 2:
          this.icon = this.decisionTemplates.yesTempleate;
          break;
        default:
          this.icon = this.decisionTemplates.skipTempleate;
      }
    } else {
      let v = value.decision;
      if (value.fav) {
        v = v * 2;
      }
      this.decision = v;

      switch (value.decision) {
        case -1:
          this.icon = value.fav ? this.decisionTemplates.noAgreeAndFavTempleate : this.decisionTemplates.noTempleate;
          break;
        case 1:
          this.icon = value.fav ? this.decisionTemplates.yesyesTempleate : this.decisionTemplates.yesTempleate;
          break;
        default:
          this.icon = this.decisionTemplates.skipTempleate;
      }
    }
  }*/
  /*public icon: TemplateRef<any>;
  public decision: number;*/

  constructor() {}

  ngOnInit(): void {}
}
