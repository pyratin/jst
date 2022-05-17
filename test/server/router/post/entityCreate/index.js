'use strict';

import assert from 'assert';

import __data from './data';
import databaseGet from 'server/fn/databaseGet';
import userCreate from 'server/router/user/entityCreate';
import userDelete from 'server/router/user/entityDelete';
import entityCreate, { validateFn } from 'server/router/post/entityCreate';
import objectFragmentGet from 'test/server/router/fn/objectFragmentGet';
import constant from 'server/fn/constant';
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

    let user01;

    before(() => {
      return userCreate(_data.before[0].argument.body, database).then(
        (result) => {
          user01 = result;
        }
      );
    });

    after(() => {
      return userDelete(
        { id: user01.id },
        { authorization: user01.token.access },
        database
      );
    });

    it(_data.it[0].text, () => {
      const data = _data.it[0];

      return validateFn(data.argument.headers).catch((error) => {
        return assert.deepEqual(error, data.error);
      });
    });

    it(_data.it[1].text, () => {
      const data = _data.it[1];

      return validateFn(
        { authorization: user01.token.access },
        data.argument.body,
        database
      ).catch((error) => {
        return assert.deepEqual(error, data.error);
      });
    });

    it(_data.it[2].text, () => {
      const data = _data.it[2];

      return validateFn(
        { authorization: user01.token.access },
        data.argument.body,
        database
      ).catch((error) => {
        return assert.deepEqual(error, data.error);
      });
    });
  });

  describe(__data.describe[1].text, () => {
    const _data = __data.describe[1];

    let user01;

    before(() => {
      return userCreate(_data.before[0].argument.body, database).then(
        (result) => {
          user01 = result;
        }
      );
    });

    after(() => {
      return userDelete(
        { id: user01.id },
        { authorization: user01.token.access },
        database
      );
    });

    it(_data.it[0].text, () => {
      const data = _data.it[0];

      return entityCreate(
        { authorization: user01.token.access },
        data.argument.body,
        database
      )
        .then((result) => {
          const schema = {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                pattern: constant.PATTERN.ID
              },
              userId: { const: user01.id },
              ...objectFragmentGet(data.argument.body)
            },
            required: ['id', 'userId', ...Object.keys(data.argument.body)],
            additionalProperties: false
          };

          return assert.equal(ajvInstanceGet().compile(schema)(result), true);
        });
    });
  });
});
