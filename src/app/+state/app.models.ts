import { BreakpointBooleanMap } from 'ng-zorro-antd/core/services';
import { Daten } from '../definitions/models/daten.model';

export interface State {
  menuOpen: boolean;
  activeBreakpoints: BreakpointBooleanMap;
  data?: Daten;
  dataLoaded: boolean;
  usedCachedData: boolean;
}
