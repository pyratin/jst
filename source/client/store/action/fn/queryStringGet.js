'use strict';

export default (query) => {
  return Object.entries(query).reduce((memo, [key, value]) => {
    return `${memo}${memo ? '&' : '?'}${key}=${value}`;
  }, '');
};
