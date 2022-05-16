'use strict';

export default (request, response, next) => {
  request.query = Object.entries(request.query).reduce(
    (memo, [key, _value]) => {
      const value = isNaN(Number(_value)) ? _value : Number(_value);

      return {
        ...memo,
        [key]: value
      };
    },
    {}
  );

  return next();
};
