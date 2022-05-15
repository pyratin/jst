'use strict';

import entityByIdGet from './entityByIdGet';

export default async (id, database) => {
  const [[result]] = await entityByIdGet(id, database);

  if (!result) {
    throw {
      _error: [
        {
          source: 'entity',
          message: 'not found'
        }
      ],
      status: 404
    };
  }

  return result;
};
