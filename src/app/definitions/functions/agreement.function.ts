import { Vote } from '../models/votes.mode';
import { PartyDecisionThreshold } from '../../+state/app.models';
import { AGREEMENT } from '../enums/agreement.enum';

export function getAgreement(party: number | undefined, user?: Vote): AGREEMENT {
  if (party !== null && party !== undefined) {
    if (user) {
      if (party > PartyDecisionThreshold && user.decision > 0) {
        return user.fav ? AGREEMENT.AGREE_AND_FAV : AGREEMENT.AGREE;
      }
      if (party < -PartyDecisionThreshold && user.decision < 0) {
        return user.fav ? AGREEMENT.AGREE_AND_FAV : AGREEMENT.AGREE;
      }
      if ((party < -PartyDecisionThreshold && user.decision > 0) || (party > PartyDecisionThreshold && user.decision < 0)) {
        return AGREEMENT.DISAGREE;
      }
    }
    return AGREEMENT.NONE;
  }
  if (user?.fav) {
    return AGREEMENT.USER_FAV;
  }
  if (user) {
    return AGREEMENT.USER;
  }
  return AGREEMENT.NONE;
}
