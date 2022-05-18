'use strict';

import constant from 'server/fn/constant';

const hasMoreGet = async (id, userId, orderBy, collectionName, database) => {
  if (!id) {
    return false;
  }

  const [[{ 'count(*)': count }]] = await database.execute(
    `
      select count(*) from ${collectionName} \
      where  id>? and \
      userId=? order by ${orderBy.key} ${orderBy.direction}
    `.trim(),
    [id, userId]
  );

  return !!count;
};

export default async (userId, limit, offset, database) => {
  const collectionName = constant.DATABASE.POST_COLLECTION_NAME;

  const orderBy = {
    key: 'createdAt',
    direction: 'desc'
  };

  const [collection] = await database.execute(
    `
      select * from ${collectionName} \
      where userId=? \
      order by ${orderBy.key} ${orderBy.direction} \
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
        orderBy,
        collectionName,
        database
      )
    }
  };

  return result;
};
