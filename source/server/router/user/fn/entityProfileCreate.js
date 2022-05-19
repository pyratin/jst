'use strict';

import jdenticon from 'jdenticon';

import constant from 'server/fn/constant';
import entityCreate from 'server/router/fn/entityCreate';

export default (userId, database) => {
  const collectionName = constant.DATABASE.PROFILE_COLLECTION_NAME;

  const input = {
    userId,
    text: `data:image/png;base64,${jdenticon
      .toPng(userId, 128)
      .toString('base64')}`
  };

  return entityCreate(input, collectionName, database);
};
