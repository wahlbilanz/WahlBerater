/** Enum listing the possible contexts in which a vote can be visualized. Important for accessible vote icons. */
export enum VoteContext {
  /** Context not specified */
  NO_CONTEXT = 'NO_CONTEXT',
  /** This is a user's own vote, represented to the user itself */
  USER_VOTE = 'USER',
  /** This is a candidate's vot, represented to the user of the app */
  CANDIDATE_VOTE = 'CANDIDATE',
}
