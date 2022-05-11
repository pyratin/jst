'use strict';

import assert from 'assert';

import __data from './data';
import databaseGet from 'server/fn/databaseGet';
import entityCreate, {
  validateFn,
  dataGet
} from 'server/router/user/entityCreate';
import entityDelete from 'server/router/user/entityDelete';
import objectFragmentGet from 'test/server/router/fn/objectFragmentGet';
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

      return validateFn(data.argument.body).catch((error) => {
        return assert.deepEqual(error, data.error);
      });
    });

    it(_data.it[1].text, () => {
      const data = _data.it[1];

      return validateFn(data.argument.body).catch((error) => {
        return assert.deepEqual(error, data.error);
      });
    });

    it(_data.it[2].text, () => {
      const data = _data.it[2];

      return validateFn(data.argument.body).catch((error) => {
        return assert.deepEqual(error, data.error);
      });
    });

    it(_data.it[3].text, () => {
      const data = _data.it[3];

      return validateFn(data.argument.body, database).catch((error) => {
        return assert.deepEqual(error, data.error);
      });
    });
  });

  describe(__data.describe[1].text, () => {
    const _data = __data.describe[1];

    it(_data.it[0].text, () => {
      const data = _data.it[0];

      const result = dataGet(data.argument.input);

      const schema = {
        type: 'object',
        properties: {
          ...objectFragmentGet(data.argument.input),
          password: {
            not: { const: data.argument.input.password }
          }
        },
        required: Object.keys(data.argument.input),
        additionalProperties: false
      };

      return assert.equal(ajvInstanceGet().compile(schema)(result), true);
    });
  });

  describe(__data.describe[2].text, () => {
    const _data = __data.describe[2];

    let entity01;

    after(() => {
      return (
        entity01 &&
        entityDelete(
          { id: entity01.id },
          { authorization: entity01.token.access },
          database
        )
      );
    });

    it(_data.it[0].text, () => {
      const data = _data.it[0];

      return entityCreate(data.argument.body, database)
        .then((result) => {
          entity01 = result;

          return result;
        })
        .then((result) => {
          const schema = {
            type: 'object',
            properties: {
              id: { type: 'string' },
              ...objectFragmentGet(data.argument.body),
              password: {
                not: { const: data.argument.body.password }
              },
              token: {
                type: 'object',
                properties: {
                  access: { type: 'string' },
                  refresh: { type: 'string' }
                },
                required: ['access', 'refresh'],
                additionalProperties: false
              }
            },
            required: ['id', ...Object.keys(data.argument.body), 'token'],
            additionalProperties: false
          };

          return assert.equal(ajvInstanceGet().compile(schema)(result), true);
        });
    });
  });
});
