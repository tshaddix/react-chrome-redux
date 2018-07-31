/**
 * Simple middleware intercepts actions and replaces with
 * another by calling an alias function with the original action
 * @type {object} aliases an object that maps action types (keys) to alias functions (values) (e.g. { SOME_ACTION: newActionAliasFunc })
 */
export default aliases => () => next => action => {
  const alias = aliases[action.type];

  if (!alias) {
    return next(action);
  }
  const aliasResponse = alias(action);
  if (typeof aliasResponse.then === "function") {
    aliasResponse.then(result => next(result));
  } else {
    return next(aliasResponse);
  }

};
