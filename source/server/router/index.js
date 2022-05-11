'use strict';

import { Router } from 'express';

import user from './user';

export default (database) => {
  return Router({
    caseSensitive: true
  })
    .use('/user', user(database));
};
