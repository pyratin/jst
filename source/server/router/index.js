'use strict';

import { Router } from 'express';

import user from './user';
import post from './post';

export default (database) => {
  return Router({
    caseSensitive: true
  })
    .use('/user', user(database))
    .use('/post', post(database));
};
