'use strict';

import assert from 'assert';

import __data from './data';
import databaseGet from 'server/fn/databaseGet';
import { validateFn } from 'server/router/post/entityDelete';

describe.only(__data.text, () => {
  let database;

  before(async () => {
    database = await databaseGet();
  });

  after(() => {
    return database.end();
  });

  describe(__data.describe[0].text, () => {
    const _data = __data.describe[0];

    it(_data.it[0].text, () => {
      const data = _data.it[0];

      return validateFn(data.argument.params).catch((error) => {
        return assert.deepEqual(error, data.error);
      });
    });

    it(_data.it[1].text, () => {
      const data = _data.it[1];

      return validateFn(data.argument.params, null, database).catch((error) => {
        return assert.deepEqual(error, data.error);
      });
    });
  });
});
