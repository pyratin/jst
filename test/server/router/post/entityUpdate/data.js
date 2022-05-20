'use strict';

export default {
  text: 'post: entityUpdate',
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
          text: 'userCreate',
          argument: {
            body: {
              email: 'user02@test.com',
              password: 'user02Test'
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
              id: 'b8ea0a3c-3337-42ef-9852-d6bffa8362bx'
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
              id: 'b8ea0a3c-3337-42ef-9852-d6bffa8362b3'
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
          text: 'authorization: failed',
          error: {
            _error: [
              {
                source: 'authorization',
                message: 'failed'
              }
            ],
            status: 403
          }
        },
        {
          text: 'text: must have required property',
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
            body: {
              text: ''
            }
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
          text: 'result: { ...entity, ...body }',
          argument: {
            body: {
              text: 'TEXT-UPDATED'
            }
          }
        }
      ]
    }
  ]
};
