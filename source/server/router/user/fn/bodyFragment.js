'use strict';

export default {
  email: {
    type: 'string',
    format: 'email'
  },
  password: {
    type: 'string',
    pattern: '(?=.*[A-Z])(?=.*\\d).{8,}'
  }
};
