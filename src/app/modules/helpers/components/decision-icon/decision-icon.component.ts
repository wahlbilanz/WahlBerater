import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { VoteContext } from '../../../../definitions/enums/vote-context.enum';
import { Vote } from '../../../../definitions/models/votes.mode';

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
    if (value === VoteContext.USER_VOTE) {
      this.voteContext = VoteContext.USER_VOTE;
      this.titles = USER_CONTEXT_TITLES;
    } else if (value === VoteContext.CANDIDATE_VOTE) {
      this.voteContext = VoteContext.CANDIDATE_VOTE;
      this.titles = CANDIDATE_CONTEXT_TITLES;
    } else {
      this.voteContext = VoteContext.NO_CONTEXT;
      this.titles = NO_CONTEXT_TITLES;
    }
  }

  public vote: number = null;
  public voteContext: VoteContext = VoteContext.NO_CONTEXT;
  public titles = NO_CONTEXT_TITLES;
}
