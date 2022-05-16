'use strict';

export default (result, collection) => {
  const dictionary = {
    ...collection.dictionary,
    ...result.collection.reduce((memo, _collection) => {
      return {
        ...memo,
        [_collection.id]: _collection
      };
    }, {})
  };

  return {
    ...collection,
    dictionary,
    info: result.info
  };
};
