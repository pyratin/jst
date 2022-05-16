'use strict';

export default {
  text: 'post: entityGet',
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
        },
        {
          text: 'entityCreate',
          argument: {
            body: {
              text: 'TEXT'
            }
          }
        }
      ],
      it: [
        {
          text: 'id: invalid',
          argument: {
            params: {
              id: '9882eb69-4380-417b-834e-89a91c1ab63x'
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
          text: 'entity: not found',
          argument: {
            params: {
              id: '9882eb69-4380-417b-834e-89a91c1ab63e'
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
        },
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
        },
        {
          text: 'entityCreate',
          argument: {
            body: {
              text: 'TEXT'
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
