import { Reducer } from "react";

import { Action, AnyAction, PayloadAction } from "./createAction";

/**
 * A utility function that allows defining a reducer as a mapping from action
 * type to *case reducer* functions that handle these action types. The
 * reducer's initial state is passed as the first argument.
 *
 * @param actionsMap A mapping from action types to action-type-specific
 *   case redeucers.
 */
export function createReducer(actionsMap) {
  return function reducer(state, action) {
    const caseReducer = actionsMap[action.type];

    return caseReducer ? caseReducer(state, action) : state;
  };
}
