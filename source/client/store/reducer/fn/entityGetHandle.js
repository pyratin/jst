'use strict';

export default (result, collection) => {
  const dictionary = {
    ...collection.dictionary,
    [result.id]: result
  };

  return {
    ...collection,
    dictionary
  };
};
