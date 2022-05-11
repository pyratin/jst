'use strict';

export default (id, _id) => {
  const result = id === _id;

  if (!result) {
    throw {
      _error: [
        {
          source: 'authorization',
          message: 'failed'
        }
      ],
      status: 403
    };
  }
};
