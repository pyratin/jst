'use strict';

import { v4 as uuidV4 } from 'uuid';

import sqlDateTimeGet from './sqlDateTimeGet';
import entityCreateQueryGet from './entityCreateQueryGet';
import javascriptDateTimeGet from './javascriptDatetimeGet';

export default (_input, collectionName, database) => {
  const date = new Date();

  const input = {
    id: uuidV4(),
    ..._input,
    createdAt: sqlDateTimeGet(date),
    updatedAt: sqlDateTimeGet(date)
  };

  const query = entityCreateQueryGet(input, collectionName);

  return database.execute(query, Object.values(input)).then(() => {
    return {
      ...input,
      createdAt: javascriptDateTimeGet(input.createdAt),
      updatedAt: javascriptDateTimeGet(input.updatedAt)
    };
  });
};
