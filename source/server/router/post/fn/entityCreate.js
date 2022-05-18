'use strict';

import { v4 as uuidV4 } from 'uuid';
import { DateTime } from 'luxon';

import constant from 'server/fn/constant';
import entityCreateQueryGet from 'server/router/fn/entityCreateQueryGet';

export default (_input, database) => {
  const collectionName = constant.DATABASE.POST_COLLECTION_NAME;

  const createdAt = DateTime.now()
    .set({ millisecond: 0 })
    .toSQL({ includeOffset: false });

  const input = {
    id: uuidV4(),
    ..._input,
    createdAt
  };

  const query = entityCreateQueryGet(input, collectionName);

  return database.execute(query, Object.values(input)).then(() => {
    return {
      ...input,
      createdAt: DateTime.fromSQL(createdAt).toJSDate()
    };
  });
};
