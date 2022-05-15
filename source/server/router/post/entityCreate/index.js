'use strict';

import userAuthenticationValidate from 'server/router/fn/userAuthenticationValidate';
import bodyValidate from './fn/bodyValidate';
import entityCreate from 'server/router/post/fn/entityCreate';

const validateFn = async (headers, body, database) => {
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

const dataGet = (userId, body) => {
  return {
    userId,
    ...body
  };
};

export default async (headers, body, database) => {
  let user;

  try {
    ({ user } = await validateFn(headers, body, database));
  } catch (error) {
    return error;
  }

  const data = dataGet(user.id, body);

  const result = await entityCreate(data, database);

  return result;
};
