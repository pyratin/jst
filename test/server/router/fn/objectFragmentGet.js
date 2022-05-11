'use strict';

export default (input) => {
  const result = Object.entries(input).reduce(
    (memo, [key, value]) => {
      return {
        ...memo,
        [key]: {
          const: value
        }
      };
    },
    []
  );

  return result;
};

