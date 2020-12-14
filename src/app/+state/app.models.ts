import { BreakpointBooleanMap } from 'ng-zorro-antd/core/services';
import { PoliticalData } from '../definitions/models/political.data.model';
import { PersonalData } from '../definitions/models/personal.data.model';

export enum QuizState {
  NOT_STARTED,
  STARTED,
  CONCLUDED,
}

export interface State {
  /** Top menu open state */
  menuOpen: boolean;
  activeBreakpoints: BreakpointBooleanMap;
  politicalData?: PoliticalData;
  personalData?: PersonalData;
  /** True, if the political data is finished loading */
  politicalDataLoaded: boolean;
  /** True, if the personal data is finished loading */
  personalDataLoaded: boolean;
  /** Indicates, if the source data was loaded from the cache and might not be up-to-date */
  usedCachedData: boolean;
  /** The decisions of the user on the claims */
  votes: {};
  /** Indicates, if the user opted in to store data on the local device */
  allowLocalDataStorage: boolean;
}
