'use strict';

import entityByEmailGet from 'server/router/user/fn/entityByEmailGet';

export default async (email, database) => {
  const [[result]] = await entityByEmailGet(email, database);

  if (!result) {
    throw {
      _error: [
        {
          source: 'email',
          message: 'incorrect'
        }
      ],
      status: 400
    };
  }

  return result;
};
