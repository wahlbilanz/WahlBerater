import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { VoteContext } from '../../../../definitions/enums/vote-context.enum';
import { Vote } from '../../../../definitions/models/votes.mode';
import { select, Store } from '@ngrx/store';
import * as AppSelectors from '../../../../+state/app.selectors';
import { AppPartialState } from '../../../../+state/app.reducer';
import { AGREEMENT } from '../../../../definitions/enums/agreement.enum';
import { PartyDecisionThreshold } from '../../../../+state/app.models';

const NO_CONTEXT_TITLES = {
  '-4': 'Starke Ablehnung',
  '-3': 'Ablehnung (gegen deine Position)',
  '-2': 'Ablehnung, wichtig!',
  '-1': 'Ablehnung',
  0: 'Enthaltung',
  1: 'Zustimmung',
  2: 'Zustimmung, wichtig!',
  3: 'Zustimmung (gegen deine Position)',
  4: 'Starke Zustimmung',
  null: 'Unbekannte Haltung',
};

const USER_CONTEXT_TITLES = {
  '-2': 'Du hast dieser These widersprochen. Dir war dies wichtig.',
  '-1': 'Du hast dieser These widersprochen.',
  0: 'Du hast dich zu dieser These enthalten.',
  1: 'Du hast dieser These zugestimmt',
  2: 'Du hast dieser These zugestimmt. Dir war dies wichtig.',
  null: 'Du hast zu dieser These noch keine Haltung geäußert.',
};

const CANDIDATE_CONTEXT_TITLES = {
  '-2': 'Starke Ablehnung',
  '-1': 'Ablehnung',
  0: 'Enthaltung',
  1: 'Zustimmung',
  2: 'Starke Zustimmung',
  null: 'Unbekannte Haltung',
};

@Component({
  selector: 'app-decision-icon',
  templateUrl: './decision-icon.component.html',
  styleUrls: ['./decision-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DecisionIconComponent {
  @Input('vote')
  set voteInput(value: number | Vote) {
    if (value === null || value === undefined) {
      this.vote = null;
    } else if (typeof value === 'number') {
      this.vote = value >= -2 && value <= 2 ? value : null;
    } else {
      this.vote = value.fav ? value.decision * 2 : value.decision;
    }
    this.chooseIcon();
  }

  /*@Input('voteContext')
  set voteContextInput(value: VoteContext | null) {
    this.voteContext = VoteContext.NO_CONTEXT;
    this.titles = NO_CONTEXT_TITLES;
  }*/

  @Input('agreement')
  set setAgreement(value: AGREEMENT) {
    this.theme = value === AGREEMENT.NONE ? 'outline' : 'twotone';
    this.agreementValue = value;
    this.chooseIcon();
  }

  public accessibilityModes = this.store.pipe(select(AppSelectors.getAllAccessibilityModes));

  public vote: number = null;
  public voteContext: VoteContext = VoteContext.NO_CONTEXT;
  public titles = NO_CONTEXT_TITLES;
  public theme = 'twotone';
  public agreementValue: AGREEMENT = AGREEMENT.NONE;

  public icon = 0;

  constructor(private store: Store<AppPartialState>) {}

  chooseIcon() {
    if (this.vote === null) {
      this.icon = null;
      return;
    }

    this.icon = 0;

    if (this.vote > PartyDecisionThreshold) {
      this.icon = 1;
    } else if (this.vote < -PartyDecisionThreshold) {
      this.icon = -1;
    }
    switch (this.agreementValue) {
      case AGREEMENT.AGREE:
      case AGREEMENT.USER:
        if (this.vote > PartyDecisionThreshold) {
          this.icon = 1;
        } else if (this.vote < -PartyDecisionThreshold) {
          this.icon = -1;
        }
        break;
      case AGREEMENT.USER_FAV:
        if (this.vote > PartyDecisionThreshold) {
          this.icon = 4;
        } else if (this.vote < -PartyDecisionThreshold) {
          this.icon = -4;
        }
        break;
      case AGREEMENT.AGREE_AND_FAV:
        if (this.vote > PartyDecisionThreshold) {
          this.icon = 2;
        } else if (this.vote < -PartyDecisionThreshold) {
          this.icon = -2;
        }
        break;
      case AGREEMENT.DISAGREE:
        if (this.vote > PartyDecisionThreshold) {
          this.icon = 3;
        } else if (this.vote < -PartyDecisionThreshold) {
          this.icon = -3;
        }
        break;
    }
  }
}
