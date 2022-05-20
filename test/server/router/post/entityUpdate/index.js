'use strict';

import assert from 'assert';

import __data from './data';
import databaseGet from 'server/fn/databaseGet';
import userCreate from 'server/router/user/entityCreate';
import userDelete from 'server/router/user/entityDelete';
import entityCreate from 'server/router/post/entityCreate';
import entityUpdate, { validateFn } from 'server/router/post/entityUpdate';
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

    let user01;

    let user02;

    let entity01;

    before(() => {
      return userCreate(_data.before[0].argument.body, database).then(
        (result) => {
          user01 = result;
        }
      );
    });

    before(() => {
      return userCreate(_data.before[1].argument.body, database).then(
        (result) => {
          user02 = result;
        }
      );
    });

    before(() => {
      return entityCreate(
        { authorization: user01.token.access },
        _data.before[2].argument.body,
        database
      ).then((result) => {
        entity01 = result;
      });
    });

    after(() => {
      return userDelete(
        { id: user01.id },
        { authorization: user01.token.access },
        database
      );
    });

    after(() => {
      return userDelete(
        { id: user02.id },
        { authorization: user02.token.access },
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

      return validateFn(data.argument.params, null, null, database).catch(
        (error) => {
          return assert.deepEqual(error, data.error);
        }
      );
    });

    it(_data.it[2].text, () => {
      const data = _data.it[2];

      return validateFn(
        { id: entity01.id },
        data.argument.headers,
        null,
        database
      ).catch((error) => {
        return assert.deepEqual(error, data.error);
      });
    });

    it(_data.it[3].text, () => {
      const data = _data.it[3];

      return validateFn(
        { id: entity01.id },
        { authorization: user02.token.access },
        null,
        database
      ).catch((error) => {
        return assert.deepEqual(error, data.error);
      });
    });

    it(_data.it[4].text, () => {
      const data = _data.it[4];

      return validateFn(
        { id: entity01.id },
        { authorization: user01.token.access },
        data.argument.body,
        database
      ).catch((error) => {
        return assert.deepEqual(error, data.error);
      });
    });

    it(_data.it[5].text, () => {
      const data = _data.it[5];

      return validateFn(
        { id: entity01.id },
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

    let entity01;

    before(() => {
      return userCreate(_data.before[0].argument.body, database).then(
        (result) => {
          user01 = result;
        }
      );
    });

    before(() => {
      return entityCreate(
        { authorization: user01.token.access },
        _data.before[1].argument.body,
        database
      ).then((result) => {
        entity01 = result;
      });
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

      return entityUpdate(
        { id: entity01.id },
        { authorization: user01.token.access },
        data.argument.body,
        database
      ).then((result) => {
        const schema = {
          type: 'object',
          properties: {
            id: { const: entity01.id },
            ...objectFragmentGet(entity01),
            ...objectFragmentGet(data.argument.body),
            updatedAt: { type: 'object' }
          },
          required: ['id', ...Object.keys(data.argument.body), 'updatedAt'],
          additionalProperties: false
        };

        return assert.equal(ajvInstanceGet().compile(schema)(result), true);
      });
    });
  });
});
