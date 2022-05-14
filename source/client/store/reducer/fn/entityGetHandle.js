'use strict';

export default (result, collection) => {
  return {
    ...collection,
    [result.id]: result
  };
};
