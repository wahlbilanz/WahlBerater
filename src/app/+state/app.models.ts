import { BreakpointBooleanMap } from 'ng-zorro-antd/core/services';
import { PersonalCandidateMap } from '../definitions/models/candidate.model';
import { PoliticalData } from '../definitions/models/political.data.model';
import { Votes } from '../definitions/models/votes.mode';
import { PartyScoreResult } from '../definitions/models/results.model';

export enum QuizState {
  NOT_STARTED,
  STARTED,
  CONCLUDED,
}

export const ResultUrl = 'result';
export const AccessibleUrl = 'accessible';
export const AccessibleUrlFragment = 'accessible-';
export const QuizFirstPage = 'howto';

export const QuizAnimationDelay = 300;
export const QuizAnimationDurationIn = 500;
export const QuizAnimationDurationOut = 500;

export const PartyDecisionThreshold = 0.5;

export const IncludeCandidates = true;

export const RenderingDelay = 70;

export interface AccessibilityModes {
  accessibilityMode: boolean;
  reducedMotionMode: boolean;
}

export interface State {
  /** Top menu open state */
  menuOpen: boolean;
  activeBreakpoints: BreakpointBooleanMap;
  politicalData?: PoliticalData;
  personalData?: PersonalCandidateMap;
  /** True, if the political data is finished loading */
  politicalDataLoaded: boolean;
  /** True, if the personal data is finished loading */
  personalDataLoaded: boolean;
  /** Indicates, if the source data was loaded from the cache and might not be up-to-date */
  usedCachedPoliticalData: boolean;
  usedCachedPersonalData: boolean;
  /** The decisions of the user on the claims */
  votes: Votes;
  /** True if the browser supports local storage, otherwise not ¯\_(ツ)_/¯ */
  localStorageSupported: boolean;
  /** Indicates, if the user opted in to store data on the local device */
  allowLocalDataStorage: boolean;
  /** Which was the last page in the quiz? */
  quizLastPage: string;
  /** True, when the accessibility mode is active. Tri-State - null indicating that user did not make a choice yet or was not restored */
  accessibilityMode: boolean;
  /** True, when the reduced motion mode (no animations) is active. Tri-State - null indicating that user did not make a choice yet or was not restored */
  reducedMotionMode: boolean;
  /** the resulting score of the lists and candidates */
  partyScoreResult: PartyScoreResult;
}
