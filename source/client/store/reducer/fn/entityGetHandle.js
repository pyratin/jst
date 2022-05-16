'use strict';

export default (result, collection, extend = {}) => {
  const dictionary = {
    ...collection.dictionary,
    [result.id]: {
      ...result,
      ...extend
    }
  };

  return {
    ...collection,
    dictionary
  };
};
