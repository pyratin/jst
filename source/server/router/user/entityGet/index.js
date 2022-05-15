'use strict';

import idValidate from 'server/router/fn/idValidate';
import userAuthenticationValidate from 'server/router/fn/userAuthenticationValidate';
import entityExistsValidate from 'server/router/user/fn/entityExistsValidate';

export const validateFn = async (params, headers, database) => {
  let entity;

  try {
    idValidate(params.id);
  } finally {
    // eslint-disable-next-line no-empty
  }

  try {
    await userAuthenticationValidate(headers.authorization, database);
  } finally {
    // eslint-disable-next-line no-empty
  }

  try {
    entity = await entityExistsValidate(params.id, database);
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

  return entity;
};
