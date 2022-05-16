'use strict';

import constant from 'server/fn/constant';

export default (email, database) => {
  const collectionName = constant.DATABASE.USER_COLLECTION_NAME;

  return database.execute(
    `
      select * from ${collectionName} \
      where email=?
    `.trim(),
    [email]
  );
};
