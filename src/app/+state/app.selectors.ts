import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getCandidatePersonalInfo } from '../definitions/functions/getCandidatePersonalInfo';
import { PersonalCandidateMap } from '../definitions/models/candidate.model';
import { Category } from '../definitions/models/category.model';
import { PoliticalData } from '../definitions/models/political.data.model';
import { Votes } from '../definitions/models/votes.mode';
import { QuizFirstPage, QuizState, State } from './app.models';
import { AppPartialState, STATE_FEATURE_KEY } from './app.reducer';

const getAppState = createFeatureSelector<AppPartialState, State>(STATE_FEATURE_KEY);

export const isMenuOpen = createSelector(getAppState, (state: State) => state.menuOpen);
export const isBreakpointActive = createSelector(getAppState, (state: State, props) => !!state.activeBreakpoints[props.breakpoint]);

export const getPoliticalData = createSelector(getAppState, (state: State): PoliticalData => state.politicalData);
export const getPersonalData = createSelector(getAppState, (state: State): PersonalCandidateMap => state.personalData);

export const isDataLoaded = createSelector(getAppState, (state: State) => state.politicalDataLoaded && state.personalDataLoaded);

export const getVotes = createSelector(getAppState, (state: State): Votes => state.votes);

export const isLocalDataStorageAllowed = createSelector(getAppState, (state: State) => state.allowLocalDataStorage);

// TODO kann weg?  -- ne, das sollst du nutzen!
export const getQuizState = createSelector(getAppState, (state: State) => QuizState.STARTED); // TODO

export const getParties = createSelector(getAppState, (state: State) => (state.politicalDataLoaded ? state.politicalData.parties : null));
export const getPartyIds = createSelector(getAppState, (state: State) =>
  state.politicalDataLoaded ? Object.getOwnPropertyNames(state.politicalData.parties) : null,
);
export const getCandidatePersonalDataById = createSelector(getPersonalData, (personalData, props: { id: string }) =>
  getCandidatePersonalInfo(personalData, props.id),
);

export const getPartyById = createSelector(getParties, (parties, props: { id: string }) => (parties ? parties[props.id] : null));

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
    const keys = Object.keys(data.claims).filter((c) => data.claims[c].category === category.id);
    const subset = {};
    for (const key of keys) {
      subset[key] = data.claims[key];
    }
    return subset;
  }
});

export const getPrevQuestion = createSelector(getPoliticalData, (data, currentClaim: { id: string }): string => {
  if (data) {
    const categories = Object.keys(data.categories);

    if (!currentClaim.id || currentClaim.id === QuizFirstPage) {
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

    if (!currentClaim.id || currentClaim.id === QuizFirstPage) {
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

export const getLastQuizPage = createSelector(getAppState, (state: State) => state.quizLastPage);
export const getCandidateIds = createSelector(getAppState, (state: State): string[] =>
  !state.politicalDataLoaded || !state.personalDataLoaded ? null : Object.getOwnPropertyNames(state.politicalData.candidates),
);
/*export const getCandidateList = createSelector(getAppState, (state: State) =>
  !state.politicalDataLoaded || !state.personalDataLoaded
    ? null
    : Object.getOwnPropertyNames(state.politicalData.candidates).map((candidateId) => ({
        ...state.politicalData.candidates[candidateId],
        ...state.personalData[candidateId],
        candidateId,
        hasPersonalData: !!state.personalData[candidateId],
      })),
);*/
export const getCandidateListByPartyId = createSelector(
  getAppState,
  (state: State, props: { partyId: string }): string[] =>
    !state.politicalDataLoaded || !state.personalDataLoaded
      ? null
      : Object.keys(state.politicalData.candidates)
          .filter((candidate) => state.politicalData.candidates[candidate].party === props.partyId)
          .sort((a, b) => (state.politicalData.candidates[a].listOrder > state.politicalData.candidates[b].listOrder ? 1 : -1)),
  // !state ? null : state.filter((candidate) => candidate.party === props.partyId),
);
/*export const getCandidateById = createSelector(getAppState, (state: State, props: { id: string }) =>
  !state.politicalDataLoaded || !state.personalDataLoaded
    ? null
    : ({
        ...state.politicalData.candidates[props.id],
        ...state.personalData[props.id],
        candidateId: props.id,
        hasPersonalData: !!state.personalData[props.id],
      } as CandidateWithID),
);*/

export const isAccessibilityModeActive = createSelector(getAppState, (state: State) => state.accessibilityMode);
