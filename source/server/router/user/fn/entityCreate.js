'use strict';

import constant from 'server/fn/constant';
import entityCreate from 'server/router/fn/entityCreate';

export default (input, database) => {
  const collectionName = constant.DATABASE.USER_COLLECTION_NAME;

  return entityCreate(input, collectionName, database);
};
