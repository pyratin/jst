'use strict';

import { verify } from 'jsonwebtoken';

import entityByIdGet from 'server/router/user/fn/entityByIdGet';

export default async (input, database) => {
  let id;

  const error = {
    _error: [
      {
        source: 'authentication',
        message: 'failed'
      }
    ],
    status: 401
  };

  try {
    ({ id } = verify(input, process.env.JSONWEBTOKEN_SECRET));
  } catch {
    throw error;
  }

  const [[result]] = await entityByIdGet(id, database);

  if (!result) {
    throw error;
  }

  return result;
};
