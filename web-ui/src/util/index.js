/**
 * Utility method to create a reducer from a map,
 * with initial state
 * @param initialState
 * @param reducerMap
 * @returns {Function}
 */

export function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const { type, payload, ...rest } = action;

        const reducer = reducerMap[type];

        return reducer ? reducer(state, payload, rest) : state;
    };
}
