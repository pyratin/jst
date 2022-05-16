'use strict';

import constant from 'server/fn/constant';

const hasMoreGet = async (id, userId, collectionName, database) => {
  if (!id) {
    return false;
  }

  const [[{ 'count(*)': count }]] = await database.execute(
    `
      select count(*) from ${collectionName} \
      where  id>? and \
      userId=? order by id asc
    `.trim(),
    [id, userId]
  );

  return !!count;
};

export default async (userId, limit, offset, database) => {
  const collectionName = constant.DATABASE.POST_COLLECTION_NAME;

  const [collection] = await database.execute(
    `
      select * from ${collectionName} \
      where userId=? \
      order by id asc \
      limit ${limit} \
      offset ${offset}
    `.trim(),
    [userId]
  );

  const result = {
    collection: collection,
    info: {
      userId,
      hasMore: await hasMoreGet(
        collection.at(-1)?.id,
        userId,
        collectionName,
        database
      )
    }
  };

  return result;
};
