'use strict';

export default {
  text: 'entityCreate',
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
          text: 'email, password: must have required property',
          argument: {
            body: {}
          },
          error: {
            _error: [
              {
                source: 'root',
                message: "must have required property 'email'"
              },
              {
                source: 'root',
                message: "must have required property 'password'"
              }
            ],
            status: 400
          }
        },
        {
          text: 'email: must match format',
          argument: {
            body: {
              email: 'x',
              password: 'user01Test'
            }
          },
          error: {
            _error: [
              {
                source: 'email',
                message: 'must match format "email"'
              }
            ],
            status: 400
          }
        },
        {
          text: 'password: must have length > 7 ( 1 upper-case + 1 digit )',
          argument: {
            body: {
              email: 'user01@test.com',
              password: 'x'
            }
          },
          error: {
            _error: [
              {
                source: 'password',
                message: 'must have length > 7 ( 1 upper-case + 1 digit )'
              }
            ],
            status: 400
          }
        },
        {
          text: 'email: registered',
          argument: {
            body: {
              email: 'user01@test.com',
              password: 'user01Test'
            }
          },
          error: {
            _error: [
              {
                source: 'email',
                message: 'registered'
              }
            ],
            status: 400
          }
        }
      ]
    },
    {
      text: 'dataGet',
      before: [],
      it: [
        {
          text: 'result: { ..., password: hash }',
          argument: {
            input: {
              email: 'user@test.com',
              password: 'user01Test'
            }
          }
        }
      ]
    },
    {
      text: 'default',
      before: [],
      it: [
        {
          text: 'result: { ..., password: hash, token: { ... } }',
          argument: {
            body: {
              email: 'user01@test.com',
              password: 'user01Test'
            }
          }
        }
      ]
    }
  ]
};
