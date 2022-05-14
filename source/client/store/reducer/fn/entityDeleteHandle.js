'use strict';

export default (result, collection) => {
  return Object.entries(collection).reduce((memo, [key, value]) => {
    return key !== result.id
      ? {
          ...memo,
          [key]: value
        }
      : memo;
  }, {});
};
