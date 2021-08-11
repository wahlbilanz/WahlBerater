import { getAgreement } from './agreement.function';
import { AGREEMENT } from '../enums/agreement.enum';

describe('getAgreement', () => {
  it('test agreement enum', () => {
    // the values of the enum should be stable as follows. we use them in css..
    expect(AGREEMENT.NONE).toBe(0);
    expect(AGREEMENT.USER).toBe(1);
    expect(AGREEMENT.USER_FAV).toBe(2);
    expect(AGREEMENT.AGREE).toBe(3);
    expect(AGREEMENT.AGREE_AND_FAV).toBe(4);
    expect(AGREEMENT.DISAGREE).toBe(5);
  });
  it('test agreement calculator', () => {
    expect(getAgreement(undefined, { decision: 0, fav: true })).toBe(AGREEMENT.USER_FAV);
    expect(getAgreement(undefined, { decision: 1, fav: true })).toBe(AGREEMENT.USER_FAV);
    expect(getAgreement(undefined, { decision: -1, fav: true })).toBe(AGREEMENT.USER_FAV);
    expect(getAgreement(undefined, { decision: 0, fav: false })).toBe(AGREEMENT.USER);
    expect(getAgreement(undefined, { decision: 1, fav: false })).toBe(AGREEMENT.USER);
    expect(getAgreement(undefined, { decision: -1, fav: false })).toBe(AGREEMENT.USER);

    expect(getAgreement(undefined)).toBe(AGREEMENT.NONE);

    expect(getAgreement(0)).toBe(AGREEMENT.NONE);
    expect(getAgreement(-1)).toBe(AGREEMENT.NONE);
    expect(getAgreement(1)).toBe(AGREEMENT.NONE);
    expect(getAgreement(0.3)).toBe(AGREEMENT.NONE);
    expect(getAgreement(0.5)).toBe(AGREEMENT.NONE);
    expect(getAgreement(-0.3)).toBe(AGREEMENT.NONE);
    expect(getAgreement(-0.5)).toBe(AGREEMENT.NONE);

    expect(getAgreement(1, { decision: 0, fav: false })).toBe(AGREEMENT.NONE);
    expect(getAgreement(1, { decision: 0, fav: true })).toBe(AGREEMENT.NONE);
    expect(getAgreement(1, { decision: 1, fav: false })).toBe(AGREEMENT.AGREE);
    expect(getAgreement(1, { decision: 1, fav: true })).toBe(AGREEMENT.AGREE_AND_FAV);
    expect(getAgreement(1, { decision: -1, fav: false })).toBe(AGREEMENT.DISAGREE);
    expect(getAgreement(1, { decision: -1, fav: true })).toBe(AGREEMENT.DISAGREE);

    expect(getAgreement(0, { decision: 0, fav: false })).toBe(AGREEMENT.NONE);
    expect(getAgreement(0, { decision: 0, fav: true })).toBe(AGREEMENT.NONE);
    expect(getAgreement(0, { decision: 1, fav: false })).toBe(AGREEMENT.NONE);
    expect(getAgreement(0, { decision: 1, fav: true })).toBe(AGREEMENT.NONE);
    expect(getAgreement(0, { decision: -1, fav: false })).toBe(AGREEMENT.NONE);
    expect(getAgreement(0, { decision: -1, fav: true })).toBe(AGREEMENT.NONE);

    expect(getAgreement(-1, { decision: 0, fav: false })).toBe(AGREEMENT.NONE);
    expect(getAgreement(-1, { decision: 0, fav: true })).toBe(AGREEMENT.NONE);
    expect(getAgreement(-1, { decision: 1, fav: false })).toBe(AGREEMENT.DISAGREE);
    expect(getAgreement(-1, { decision: 1, fav: true })).toBe(AGREEMENT.DISAGREE);
    expect(getAgreement(-1, { decision: -1, fav: false })).toBe(AGREEMENT.AGREE);
    expect(getAgreement(-1, { decision: -1, fav: true })).toBe(AGREEMENT.AGREE_AND_FAV);
  });
});
