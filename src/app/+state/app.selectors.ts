import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Candidate, CandidateWithID } from '../definitions/models/candidate.model';
import { QuizState, State } from './app.models';
import { STATE_FEATURE_KEY, AppPartialState } from './app.reducer';
import { Category } from '../definitions/models/category.model';
import { PoliticalData } from '../definitions/models/political.data.model';

const getAppState = createFeatureSelector<AppPartialState, State>(STATE_FEATURE_KEY);

export const isMenuOpen = createSelector(getAppState, (state: State) => state.menuOpen);
export const isBreakpointActive = createSelector(getAppState, (state: State, props) => !!state.activeBreakpoints[props.breakpoint]);

export const getPoliticalData = createSelector(getAppState, (state: State) => state.politicalData);
export const getPersonalData = createSelector(getAppState, (state: State) => state.personalData);

export const isDataLoaded = createSelector(getAppState, (state: State) => state.politicalDataLoaded && state.personalDataLoaded);

export const getVotes = createSelector(getAppState, (state: State) => state.votes);

export const isLocalDataStorageAllowed = createSelector(getAppState, (state: State) => state.allowLocalDataStorage);
export const getQuizState = createSelector(getAppState, (state: State) => QuizState.STARTED); // TODO

export const getParties = createSelector(getAppState, (state: State) => (state.politicalDataLoaded ? state.politicalData.parties : null));
export const getPartyIds = createSelector(getAppState, (state: State) =>
  state.politicalDataLoaded ? Object.getOwnPropertyNames(state.politicalData.parties) : null,
);
export const getCandidatePersonalDataById = createSelector(getPersonalData, (personalData, props: { id: string }) => {
  if (personalData && personalData.candidates[props.id]) {
    return personalData.candidates[props.id];
  }

  return {
    name: 'Unbekannt',
    picture: 'default.jpg',
    shortDescription: 'keine Angaben',
    description: 'keine Angaben',
  };
});

export const getPartyById = createSelector(getParties, (parties, props: { id: number }) => parties[props.id]);

export const getCategoryByClaimId = createSelector(
  getPoliticalData,
  (data, claim: { id: string }): Category => {
    if (data && claim.id) {
      const c = data.claims[claim.id];
      if (c && c.category) {
        return data.categories[c.category];
      }
    }
    return undefined;
  },
);

export const getClaimsByCategory = createSelector(getPoliticalData, (data, category: { id: string }) => {
  if (data) {
    console.log(category);
    console.log(data.claims);
    const keys = Object.keys(data.claims).filter((c) => data.claims[c].category === category.id);
    console.log(keys);
    const subset = {};
    for (let i = 0; i < keys.length; i++) {
      subset[keys[i]] = data.claims[keys[i]];
    }
    console.log(subset);
    return subset;
  }
});

export const getPrevQuestion = createSelector(getPoliticalData, (data, currentClaim: { id: string }): string => {
  if (data) {
    const categories = Object.keys(data.categories);

    if (!currentClaim.id || currentClaim.id === 'howto') {
      // no claimid yet? -> no back..
      return undefined;
    }

    let currentCategoryIdx = categories.indexOf(data.claims[currentClaim.id].category);
    let currentCategory = categories[currentCategoryIdx];
    let claims = Object.keys(data.claims).filter((c) => data.claims[c].category === currentCategory);

    const currentIdx = claims.indexOf(currentClaim.id);
    if (currentIdx < 0) {
      return undefined;
    }

    if (currentIdx > 0) {
      return claims[currentIdx - 1];
    }
    console.log(currentCategoryIdx);
    currentCategoryIdx -= 1;
    if (currentCategoryIdx >= 0) {
      currentCategory = categories[currentCategoryIdx];
      claims = Object.keys(data.claims).filter((c) => data.claims[c].category === currentCategory);
      if (claims.length > 0) {
        // console.log ('returning claims[claims.length - 1]');
        return claims[claims.length - 1];
      }
    }
  }
  return undefined;
});
export const getNextQuestion = createSelector(getPoliticalData, (data, currentClaim: { id: string }): string => {
  if (data) {
    const categories = Object.keys(data.categories);

    if (!currentClaim.id || currentClaim.id === 'howto') {
      // no claimid yet, return first claim
      return Object.keys(data.claims).filter((c) => data.claims[c].category === categories[0])[0];
    }

    let currentCategoryIdx = categories.indexOf(data.claims[currentClaim.id].category);
    let currentCategory = categories[currentCategoryIdx];
    let claims = Object.keys(data.claims).filter((c) => data.claims[c].category === currentCategory);
    const currentIdx = claims.indexOf(currentClaim.id);
    if (currentIdx < 0) {
      // not in? then return first question
      return Object.keys(data.claims).filter((c) => data.claims[c].category === categories[0])[0];
    }

    if (currentIdx < claims.length - 1) {
      return claims[currentIdx + 1];
    }
    currentCategoryIdx += 1;
    if (currentCategoryIdx < categories.length) {
      currentCategory = categories[currentCategoryIdx];
      claims = Object.keys(data.claims).filter((c) => data.claims[c].category === currentCategory);
      if (claims.length > 0) {
        return claims[0];
      }
    }
  }
  return undefined;
});

export const getCandidateIds = createSelector(getAppState, (state: State) =>
  !state.politicalDataLoaded || !state.personalDataLoaded ? null : Object.getOwnPropertyNames(state.politicalData.candidates),
);
export const getCandidateList = createSelector(getAppState, (state: State) =>
  !state.politicalDataLoaded || !state.personalDataLoaded
    ? null
    : Object.getOwnPropertyNames(state.politicalData.candidates).map((candidateId) => ({
        ...state.politicalData.candidates[candidateId],
        ...state.personalData[candidateId],
        candidateId,
        hasPersonalData: !!state.personalData[candidateId],
      })),
);
export const getCandidateListByPartyId = createSelector(getCandidateList, (state: Array<CandidateWithID>, props: { partyId: string }) =>
  !state ? null : state.filter((candidate) => candidate.party === props.partyId),
);
export const getCandidateById = createSelector(getAppState, (state: State, props: { id: string }) =>
  !state.politicalDataLoaded || !state.personalDataLoaded
    ? null
    : ({ ...state.politicalData.candidates[props.id], ...state.personalData[props.id] } as Candidate),
);
