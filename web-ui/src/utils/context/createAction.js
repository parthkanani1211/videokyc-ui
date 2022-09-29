/**
 * A utility function to create an action creator for the given action type
 * string. The action creator accepts a single argument, which will be included
 * in the action object as a field called payload. The action creator function
 * will also have its toString() overriden so that it returns the action type,
 * allowing it to be used in reducer logic that is looking for that action type.
 *
 * @param type The action type to use for created actions.
 */
export function createAction(type) {
  function actionCreator(payload) {
    return { type, payload };
  }

  actionCreator.toString = () => `${type}`;

  actionCreator.type = type;

  return actionCreator;
}

/**
 * Returns the action type of the actions created by the passed
 * `createAction()`-generated action creator (arbitrary action creators
 * are not supported).
 *
 * @param action The action creator whose action type to get.
 * @returns The action type used by the action creator.
 */
export function getType(actionCreator) {
  return `${actionCreator}`;
}

export function createAsyncActions(name) {
  const loading = createAction(`${name}_LOADING`);
  const success = createAction(`${name}_SUCCESS`);
  const failure = createAction(`${name}_FAILURE`);

  const actions = [loading, success, failure];

  actions.loading = loading;
  actions.success = success;
  actions.failure = failure;

  return actions;
}
