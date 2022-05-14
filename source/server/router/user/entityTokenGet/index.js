'use strict';

import userAuthenticationValidate from 'server/router/fn/userAuthenticationValidate';
import tokenGet from 'server/router/user/fn/tokenGet';

const validateFn = async (headers, database) => {
  let entity;

  try {
    entity = await userAuthenticationValidate(headers.authorization, database);
  } finally {
    // eslint-disable-next-line no-empty
  }

  return { entity };
};

export default async (headers, database) => {
  let entity;

  try {
    ({ entity } = await validateFn(headers, database));
  } catch (error) {
    return error;
  }

  return {
    ...entity,
    token: tokenGet(entity.id)
  };
};
