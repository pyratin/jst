'use strict';

export default {
  text: 'entityGet',
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
              id: '54445781-6a76-4a5d-a37b-42a81f0d8b2x'
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
              id: '54445781-6a76-4a5d-a37b-42a81f0d8b29'
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
          text: 'entity: not found',
          argument: {
            params: {
              id: '251c77d4-1a18-4594-833f-efc240504d41'
            }
          },
          error: {
            _error: [
              {
                source: 'entity',
                message: 'not found'
              }
            ],
            status: 404
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
          text: 'result: { ... }'
        }
      ]
    }
  ]
};
