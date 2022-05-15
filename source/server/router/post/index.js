'use strict';

import { Router } from 'express';

import entityCreate from './entityCreate';

export default (database) => {
  return Router()
    .post('/', (request, response, next) => {
      return entityCreate(request.headers, request.body, database)
        .then((result) => {
          return response.status(result?.status ?? 200).json(result);
        })
        .catch(next);
    });
};
