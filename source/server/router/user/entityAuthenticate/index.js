'use strict';

import bodyValidate from './fn/bodyValidate';
import emailValidate from './fn/emailValidate';
import passwordValidate from './fn/passwordValidate';
import entityProfileGet from 'server/router/user/fn/entityProfileGet';
import tokenGet from 'server/router/user/fn/tokenGet';

export const validateFn = async (body, database) => {
  let entity;

  try {
    bodyValidate(body);
  } finally {
    // eslint-disable-next-line no-empty
  }

  try {
    entity = await emailValidate(body.email, database);
  } finally {
    // eslint-disable-next-line no-empty
  }

  try {
    passwordValidate(body.password, entity.password);
  } finally {
    // eslint-disable-next-line no-empty
  }

  return { entity };
};

export default async (body, database) => {
  let entity;

  try {
    ({ entity } = await validateFn(body, database));
  } catch (error) {
    return error;
  }

  const [[{ text: profile }]] = await entityProfileGet(entity.id, database);

  const result = {
    ...entity,
    profile,
    token: tokenGet(entity.id)
  };

  return result;
};
