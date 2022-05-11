'use strict';

import constant from 'server/fn/constant';

export default (id, database) => {
  const collectionName = constant.DATABASE.USER_COLLECTION_NAME;

  return database.execute(
    `
      select * from ${collectionName} where id=?
    `.trim(),
    [id]
  );
};
