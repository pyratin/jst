'use strict';

export default {
  text: 'entityDelete',
  describe: [
    {
      text: 'validateFn',
      before: [
        {
          text: 'entityCreate',
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
          text: 'id: invalid',
          argument: {
            params: {
              id: '59010139-b8e0-4cd4-8927-ad42699c9c5x'
            }
          },
          error: {
            _error: [
              {
                source: 'id',
                message: 'invalid'
              }
            ],
            status: 400
          }
        },
        {
          text: 'authentication: failed',
          argument: {
            params: {
              id: '59010139-b8e0-4cd4-8927-ad42699c9c5d'
            },
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
          text: 'authorization: failed',
          argument: {
            params: {
              id: '59010139-b8e0-4cd4-8927-ad42699c9c5d'
            }
          },
          error: {
            _error: [
              {
                source: 'authorization',
                message: 'failed'
              }
            ],
            status: 403
          }
        }
      ]
    },
    {
      text: 'default',
      before: [
        {
          text: 'entityCreate',
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
          text: 'result: { id }'
        }
      ]
    }
  ]
};
