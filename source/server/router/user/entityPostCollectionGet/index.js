'use strict';

import idValidate from 'server/router/fn/idValidate';
import entityExistsValidate from 'server/router/user/fn/entityExistsValidate';
import userAuthenticationValidate from 'server/router/fn/userAuthenticationValidate';
import queryValidate from './fn/queryValidate';
import entityPostCollectionGet from 'server/router/user/fn/entityPostCollectionGet';

export const validateFn = async (params, headers, query, database) => {
  let entity;

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
    await userAuthenticationValidate(headers.authorization, database);
  } finally {
    // eslint-disable-next-line no-empty
  }

  try {
    queryValidate(query);
  } finally {
    // eslint-disable-next-line no-empty
  }

  return { entity };
};

export default async (params, headers, query, database) => {
  let entity;

  try {
    ({ entity } = await validateFn(params, headers, query, database));
  } catch (error) {
    return error;
  }

  const result = await entityPostCollectionGet(
    entity.id,
    query.limit,
    query.offset,
    database
  );

  return result;
};
