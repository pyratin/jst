'use strict';

import { compareSync } from 'bcryptjs';

export default (password, _password) => {
  const result = compareSync(password, _password);

  if (!result) {
    throw {
      _error: [
        {
          source: 'password',
          message: 'incorrect'
        }
      ],
      status: 400
    };
  }
};
