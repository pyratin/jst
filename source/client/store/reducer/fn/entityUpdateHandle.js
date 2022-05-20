'use strict';

export default (result, collection) => {
  const dictionary = Object.entries(collection.dictionary).reduce(
    (memo, [key, value]) => {
      return key === result.id
        ? {
            ...memo,
            [key]: {
              ...value,
              ...result
            }
          }
        : {
            ...memo,
            [key]: value
          };
    },
    {}
  );

  return {
    ...collection,
    dictionary
  };
};
