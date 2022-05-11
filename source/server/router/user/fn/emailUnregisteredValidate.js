'use strict';

import entityByEmailGet from './entityByEmailGet';

export default async (id, email, database) => {
  const [[result]] = await entityByEmailGet(email, database);

  switch (true) {
    case !id && !!result:
    case !!id && !!result && result.id !== id:
      throw {
        _error: [
          {
            source: 'email',
            message: 'registered'
          }
        ],
        status: 400
      };
  }
};
