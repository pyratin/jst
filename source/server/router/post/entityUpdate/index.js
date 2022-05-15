'use strict';

import idValidate from 'server/router/fn/idValidate';
import entityExistsValidate from 'server/router/post/fn/entityExistsValidate';
import userAuthenticationValidate from 'server/router/fn/userAuthenticationValidate';
import userAuthorizationValidate from 'server/router/fn/userAuthorizationValidate';
import bodyValidate from './fn/bodyValidate';
import entityUpdate from 'server/router/post/fn/entityUpdate';

export const validateFn = async (params, headers, body, database) => {
  let entity;

  let user;

  try {
    idValidate(params.id);
  } finally {
    // eslint-disable-next-line no-empty
  }

  try {
    entity = await entityExistsValidate(params.id, database);
  } finally {
    // eslint-disable-next-line no-empty
  }

  try {
    user = await userAuthenticationValidate(headers.authorization, database);
  } finally {
    // eslint-disable-next-line no-empty
  }

  try {
    userAuthorizationValidate(entity.userId, user.id);
  } finally {
    // eslint-disable-next-line no-empty
  }

  try {
    bodyValidate(body);
  } finally {
    // eslint-disable-next-line no-empty
  }
};

export default async (params, headers, body, database) => {
  try {
    await validateFn(params, headers, body, database);
  } catch (error) {
    return error;
  }

  const result = await entityUpdate(params.id, body, database);

  return result;
};
