'use strict';

export default {
  DATABASE: {
    USER_COLLECTION_NAME: 'user',
    POST_COLLECTION_NAME: 'post',
    PROFILE_COLLECTION_NAME: 'profile'
  },
  JSONWEBTOKEN: {
    EXPIRES_IN: {
      ACCESS: '1h',
      REFRESH: '1d'
    }
  },
  PATTERN: {
    ID: '\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12}'
  }
};
