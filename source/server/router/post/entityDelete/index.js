'use strict';

import idValidate from 'server/router/fn/idValidate';
import entityExistsValidate from 'server/router/post/fn/entityExistsValidate';
import userAuthenticationValidate from 'server/router/fn/userAuthenticationValidate';
import userAuthorizationValidate from 'server/router/fn/userAuthorizationValidate';
import entityDelete from 'server/router/post/fn/entityDelete';

export const validateFn = async (params, headers, database) => {
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

  return { entity };
};

export default async (params, headers, database) => {
  let entity;

  try {
    ({ entity } = await validateFn(params, headers, database));
  } catch (error) {
    return error;
  }

  const result = await entityDelete(params.id, database);

  return {
    ...entity,
    ...result
  };
};
