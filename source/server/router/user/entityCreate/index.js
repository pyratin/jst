'use strict';

import bodyValidate from './fn/bodyValidate';
import emailUnregisteredValidate from 'server/router/user/fn/emailUnregisteredValidate';
import passwordHashGet from 'server/router/user/fn/passwordHashGet';
import entityCreate from 'server/router/user/fn/entityCreate';
import entityProfileCreate from 'server/router/user/fn/entityProfileCreate';
import tokenGet from 'server/router/user/fn/tokenGet';

export const validateFn = async (body, database) => {
  try {
    bodyValidate(body);
  } finally {
    // eslint-disable-next-line no-empty
  }

  try {
    await emailUnregisteredValidate(null, body.email, database);
  } finally {
    // eslint-disable-next-line no-empty
  }
};

export const dataGet = (input) => {
  return {
    ...input,
    password: passwordHashGet(input.password)
  };
};

export default async (body, database) => {
  try {
    await validateFn(body, database);
  } catch (error) {
    return error;
  }

  const data = dataGet(body);

  const result = await entityCreate(data, database);

  const profile = (await entityProfileCreate(result.id, database))?.text;

  return {
    ...result,
    profile,
    token: tokenGet(result.id)
  };
};
