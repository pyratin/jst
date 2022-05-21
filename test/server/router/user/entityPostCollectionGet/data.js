'use strict';

export default {
  text: 'user: entityPostCollectionGet',
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
              id: '073bbad9-fcea-4c8c-b0a2-98099a95cc6x'
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
              id: 'b523438a-2bd4-4eb1-869e-0648971b2c0a'
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
        },
        {
          text: 'limit, offset: must have required property',
          argument: {
            query: {}
          },
          error: {
            _error: [
              {
                source: 'root',
                message: "must have required property 'limit'"
              },
              {
                source: 'root',
                message: "must have required property 'offset'"
              }
            ],
            status: 400
          }
        },
        {
          text: 'limit: must be >= 1',
          argument: {
            query: {
              limit: 0,
              offset: 0
            }
          },
          error: {
            _error: [
              {
                source: 'limit',
                message: 'must be >= 1'
              }
            ],
            status: 400
          }
        },
        {
          text: 'offset: must be >= 0',
          argument: {
            query: {
              limit: 1,
              offset: -1
            }
          },
          error: {
            _error: [
              {
                source: 'offset',
                message: 'must be >= 0'
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
          text: 'result: { collection: [ ... ], info: { hasMore } }'
        }
      ]
    }
  ]
};
