import { BreakpointBooleanMap } from 'ng-zorro-antd/core/services';
import { Data } from '../definitions/models/data.model';

export enum QuizState {
  NOT_STARTED,
  STARTED,
  CONCLUDED,
}

export interface State {
  /** Top menu open state */
  menuOpen: boolean;
  activeBreakpoints: BreakpointBooleanMap;
  data?: Data;
  /** True, if the data i finished loading */
  dataLoaded: boolean;
  /** Indicates, if the source data was loaded from the cache and might not be up-to-date */
  usedCachedData: boolean;
  /** The decisions of the user on the claims */
  votes: {};
  /** Indicates, if the user opted in to store data on the local device */
  allowLocalDataStorage: boolean;
}
