'use strict';

import constant from 'server/fn/constant';
import entityUpdate from 'server/router/fn/entityUpdate';

export default (id, input, database) => {
  const collectionName = constant.DATABASE.POST_COLLECTION_NAME;

  return entityUpdate(id, input, collectionName, database);
};
