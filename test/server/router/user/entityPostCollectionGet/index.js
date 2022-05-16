'use strict';

import assert from 'assert';

import __data from './data';
import databaseGet from 'server/fn/databaseGet';
import entityCreate from 'server/router/user/entityCreate';
import entityDelete from 'server/router/user/entityDelete';
import entityPostCollectionGet, {
  validateFn
} from 'server/router/user/entityPostCollectionGet';
import ajvInstanceGet from 'server/router/fn/ajvInstanceGet';

describe(__data.text, () => {
  let database;

  before(async () => {
    database = await databaseGet();
  });

  after(() => {
    return database.end();
  });

  describe(__data.describe[0].text, () => {
    const _data = __data.describe[0];

    let entity01;

    before(() => {
      return entityCreate(_data.before[0].argument.body, database).then(
        (result) => {
          entity01 = result;
        }
      );
    });

    after(() => {
      return entityDelete(
        { id: entity01.id },
        { authorization: entity01.token.access },
        database
      );
    });

    it(_data.it[0].text, () => {
      const data = _data.it[0];

      return validateFn(data.argument.params).catch((error) => {
        return assert.deepEqual(error, data.error);
      });
    });

    it(_data.it[1].text, () => {
      const data = _data.it[1];

      return validateFn(
        data.argument.params,
        data.argument.headers,
        database
      ).catch((error) => {
        return assert.deepEqual(error, data.error);
      });
    });

    it(_data.it[2].text, () => {
      const data = _data.it[2];

      return validateFn(
        { id: entity01.id },
        { authorization: entity01.token.access },
        data.argument.query,
        database
      ).catch((error) => {
        return assert.deepEqual(error, data.error);
      });
    });

    it(_data.it[3].text, () => {
      const data = _data.it[3];

      return validateFn(
        { id: entity01.id },
        { authorization: entity01.token.access },
        data.argument.query,
        database
      ).catch((error) => {
        return assert.deepEqual(error, data.error);
      });
    });

    it(_data.it[4].text, () => {
      const data = _data.it[4];

      return validateFn(
        { id: entity01.id },
        { authorization: entity01.token.access },
        data.argument.query,
        database
      ).catch((error) => {
        return assert.deepEqual(error, data.error);
      });
    });
  });

  describe(__data.describe[1].text, () => {
    const _data = __data.describe[1];

    let entity01;

    before(() => {
      return entityCreate(_data.before[0].argument.body, database).then(
        (result) => {
          entity01 = result;
        }
      );
    });

    after(() => {
      return entityDelete(
        { id: entity01.id },
        { authorization: entity01.token.access },
        database
      );
    });

    it(_data.it[0].text, () => {
      return entityPostCollectionGet(
        { id: entity01.id },
        { authorization: entity01.token.access },
        { limit: 1, offset: 0 },
        database
      ).then((result) => {
        const schema = {
          type: 'object',
          properties: {
            collection: { type: 'array' },
            info: {
              type: 'object',
              properties: {
                hasMore: { type: 'boolean' }
              }
            }
          }
        };

        return assert.deepEqual(ajvInstanceGet().compile(schema)(result), true);
      });
    });
  });
});
