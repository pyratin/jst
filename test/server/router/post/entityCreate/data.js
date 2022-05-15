'use strict';

export default {
  text: 'entityCreate',
  describe: [
    {
      text: 'validateFn',
      before: [
        {
          text: 'userCreate',
          argument: {
            body: {
              email: 'user01@test.com',
              password: 'user01Test'
            }
          }
        }
      ],
      it: [
        {
          text: 'authentication: failed',
          argument: {
            headers: {
              authorization: 'x'
            }
          },
          error: {
            _error: [
              {
                source: 'authentication',
                message: 'failed'
              }
            ],
            status: 401
          }
        },
        {
          text: 'text: must have required propery',
          argument: {
            body: {}
          },
          error: {
            _error: [
              {
                source: 'root',
                message: "must have required property 'text'"
              }
            ],
            status: 400
          }
        },
        {
          text: 'text: must NOT have fewer than 1 characters',
          argument: {
            body: { text: '' }
          },
          error: {
            _error: [
              {
                source: 'text',
                message: 'must NOT have fewer than 1 characters'
              }
            ],
            status: 400
          }
        }
      ]
    },
    {
      text: 'default',
      before: [
        {
          text: 'userCreate',
          argument: {
            body: {
              email: 'user01@test.com',
              password: 'user01Test'
            }
          }
        }
      ],
      it: [
        {
          text: 'result: { id, userId, ...body }',
          argument: {
            body: {
              text: 'TEXT'
            }
          }
        }
      ]
    }
  ]
};
