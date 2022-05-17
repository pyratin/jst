'use strict';

import constant from 'server/fn/constant';

export default (userId, database) => {
  const collectionName = constant.DATABASE.PROFILE_COLLECTION_NAME;

  return database.execute(
    `
      select * from ${collectionName} \
      where userId=?
    `.trim(),
    [userId]
  );
};
