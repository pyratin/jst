'use strict';

import { sign } from 'jsonwebtoken';

import constant from 'server/fn/constant';

const _tokenGet = (id, expiresIn) => {
  return sign({ id }, process.env.JSONWEBTOKEN_SECRET, {
    expiresIn
  });
};

export default (id) => {
  return {
    access: _tokenGet(id, constant.JSONWEBTOKEN.EXPIRES_IN.ACCESS),
    refresh: _tokenGet(id, constant.JSONWEBTOKEN.EXPIRES_IN.REFRESH)
  };
};
