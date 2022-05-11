'use strict';

export default (input, collectionName) => {
  const [keyCollection, valueCollection] = Object.entries(input).reduce(
    (memo, [key, value]) => {
      return [
        [...memo[0], key],
        [...memo[1], value]
      ];
    },
    [[], []]
  );

  const keyString = keyCollection.toString();

  const valueString = valueCollection
    .map((value) => {
      return `'${value}'`;
    })
    .toString();

  const query = `
      insert into ${collectionName} (${keyString}) values (${valueString})
    `.trim();

  return query;
};
