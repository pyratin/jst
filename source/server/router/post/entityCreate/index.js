'use strict';

import userAuthenticationValidate from 'server/router/fn/userAuthenticationValidate';
import bodyValidate from './fn/bodyValidate';
import entityCreate from 'server/router/post/fn/entityCreate';

export const validateFn = async (headers, body, database) => {
  let user;

  try {
    user = await userAuthenticationValidate(headers.authorization, database);
  } finally {
    // eslint-disable-next-line no-empty
  }

  try {
    bodyValidate(body);
  } finally {
    // eslint-disable-next-line no-empty
  }

  return { user };
};

export default async (headers, body, database) => {
  let user;

  try {
    ({ user } = await validateFn(headers, body, database));
  } catch (error) {
    return error;
  }

  const result = await entityCreate(
    {
      userId: user.id,
      ...body
    },
    database
  );

  return result;
};
