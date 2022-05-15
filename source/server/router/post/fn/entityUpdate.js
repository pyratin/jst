'use strict';

import constant from 'server/fn/constant';
import entityUpdateQueryGet from 'server/router/fn/entityUpdateQueryGet';

export default (id, input, database) => {
  const collectionName = constant.DATABASE.POST_COLLECTION_NAME;

  const query = entityUpdateQueryGet(input, collectionName);

  return database.execute(query, [id]).then(() => {
    return {
      id,
      ...input
    };
  });
};
