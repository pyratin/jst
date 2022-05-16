'use strict';

export default (input, collectionName) => {
  const string = Object.entries(input).reduce((memo, [key, value]) => {
    return `${memo}${memo ? ', ' : ''}${key}='${value}'`;
  }, '');

  const query = `
      update ${collectionName} \
      set ${string} \
      where id=?
    `.trim();

  return query;
};
