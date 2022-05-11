'use strict';

import { v4 as uuidV4 } from 'uuid';

import constant from 'server/fn/constant';
import entityCreateQueryGet from 'server/router/fn/entityCreateQueryGet';

export default (_input, database) => {
  const collectionName = constant.DATABASE.USER_COLLECTION_NAME;

  const input = {
    id: uuidV4(),
    ..._input
  };

  const query = entityCreateQueryGet(input, collectionName);

  return database.execute(query, Object.values(input)).then(() => {
    return input;
  });
};
