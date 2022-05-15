'use strict';

export default {
  DATABASE: {
    USER_COLLECTION_NAME: 'user',
    POST_COLLECTION_NAME: 'post'
  },
  JSONWEBTOKEN: {
    EXPIRES_IN: {
      ACCESS: '1h',
      REFRESH: '1d'
    }
  }
};
