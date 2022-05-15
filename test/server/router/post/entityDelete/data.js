'use strict';

export default {
  text: 'entityDelete',
  describe: [
    {
      text: 'validateFn',
      before: [],
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
        }
      ]
    }
  ]
};
