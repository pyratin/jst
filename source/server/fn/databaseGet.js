'use strict';

import { createConnection } from 'mysql2/promise';

import constant from './constant';

const _databaseGet = (consoleLogFlag) => {
  const databaseUrl = process.env.DATABASE_URL;

  return createConnection(databaseUrl).then((result) => {
    consoleLogFlag &&
      // eslint-disable-next-line no-console
      console.log(`${process.env.NODE_ENV}-database: ${databaseUrl}`);

    return result;
  });
};

const userCollectionInitialize = (database) => {
  const collectionName = constant.DATABASE.USER_COLLECTION_NAME;

  return database.execute(
    `
      create table if not exists ${collectionName} (
        id varchar(100) primary key not null,
        email varchar(100) unique not null,
        password varchar(100) not null
      );
    `.trim()
  );
};

const profileCollectionInitialize = (database) => {
  const collectionName = constant.DATABASE.PROFILE_COLLECTION_NAME;

  return database.execute(
    `
      create table if not exists ${collectionName} (
        id varchar(100) primary key not null,
        userId varchar(100) not null,
        text text not null,
        constraint profileUserFk foreign key (userId) references user(id)
        on delete cascade
      );
    `.trim()
  );
};

const postCollectionInitialize = (database) => {
  const collectionName = constant.DATABASE.POST_COLLECTION_NAME;

  return database.execute(
    `
      create table if not exists ${collectionName} (
        id varchar(100) primary key not null,
        userId varchar(100) not null,
        text text not null,
        constraint postUserFk foreign key (userId) references user(id)
        on delete cascade
      );
    `.trim()
  );
};

export default async (consoleLogFlag) => {
  const database = await _databaseGet(consoleLogFlag);

  await userCollectionInitialize(database);

  await profileCollectionInitialize(database);

  await postCollectionInitialize(database);

  return database;
};
