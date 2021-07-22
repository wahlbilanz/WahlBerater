import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { VoteContext } from '../../../../definitions/enums/vote-context.enum';
import { Vote } from '../../../../definitions/models/votes.mode';
import { select, Store } from '@ngrx/store';
import * as AppSelectors from '../../../../+state/app.selectors';
import { AppPartialState } from '../../../../+state/app.reducer';

const NO_CONTEXT_TITLES = {
  '-2': 'Starke Ablehnung',
  '-1': 'Ablehnung',
  0: 'Enthaltung',
  1: 'Zustimmung',
  2: 'Starke Zustimmung',
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
    if (value == null) {
      this.vote = null;
    } else if (typeof value === 'number') {
      this.vote = value >= -2 && value <= 2 ? value : null;
    } else {
      this.vote = value.fav ? value.decision * 2 : value.decision;
    }
  }

  @Input('voteContext')
  set voteContextInput(value: VoteContext | null) {
    this.voteContext = VoteContext.NO_CONTEXT;
    this.titles = NO_CONTEXT_TITLES;
  }

  @Input('disagree')
  set disagreeInput(value: boolean | null) {
    this.theme = value ? 'outline' : 'twotone';
  }

  public accessibilityModes = this.store.pipe(select(AppSelectors.getAllAccessibilityModes));

  public vote: number = null;
  public voteContext: VoteContext = VoteContext.NO_CONTEXT;
  public titles = NO_CONTEXT_TITLES;
  public theme = 'twotone';

  constructor(private store: Store<AppPartialState>) {}
}
