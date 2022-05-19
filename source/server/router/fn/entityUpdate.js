'use strict';

import sqlDateTimeGet from './sqlDateTimeGet';
import entityUpdateQueryGet from 'server/router/fn/entityUpdateQueryGet';
import javascriptDatetimeGet from './javascriptDatetimeGet';

export default (id, _input, collectionName, database) => {
  const input = {
    ..._input,
    updatedAt: sqlDateTimeGet(new Date())
  };

  const query = entityUpdateQueryGet(input, collectionName);

  return database.execute(query, [id]).then(() => {
    return {
      id,
      ...input,
      updatedAt: javascriptDatetimeGet(input.updatedAt)
    };
  });
};
