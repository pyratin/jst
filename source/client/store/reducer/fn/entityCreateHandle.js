'use strict';

export default (result, collection) => {
  const dictionary = {
    [result.id]: result,
    ...collection.dictionary
  };

  return {
    ...collection,
    dictionary
  };
};
