import { BreakpointBooleanMap } from 'ng-zorro-antd/core/services';
import { Data } from '../definitions/models/data.model';

export interface State {
  menuOpen: boolean;
  activeBreakpoints: BreakpointBooleanMap;
  data?: Data;
  dataLoaded: boolean;
  usedCachedData: boolean;
}
