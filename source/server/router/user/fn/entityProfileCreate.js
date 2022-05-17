'use strict';

import { v4 as uuidV4 } from 'uuid';
import jdenticon from 'jdenticon';

import constant from 'server/fn/constant';
import entityCreateQueryGet from 'server/router/fn/entityCreateQueryGet';

export default (userId, database) => {
  const collectionName = constant.DATABASE.PROFILE_COLLECTION_NAME;

  const input = {
    id: uuidV4(),
    userId,
    text: `data:image/png;base64,${jdenticon
      .toPng(userId, 128)
      .toString('base64')}`
  };

  const query = entityCreateQueryGet(input, collectionName);

  return database.execute(query, Object.values(input)).then(() => {
    return input;
  });
};
