'use strict';

import { validate } from 'uuid';

export default (id) => {
  const result = validate(id);

  if (!result) {
    throw {
      _error: [
        {
          source: 'id',
          message: 'invalid'
        }
      ],
      status: 400
    };
  }
};
