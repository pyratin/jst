'use strict';

import { Router } from 'express';

import constant from 'server/fn/constant';
import entityCreate from './entityCreate';
import entityUpdate from './entityUpdate';
import entityDelete from './entityDelete';
import entityGet from './entityGet';

export default (database) => {
  return Router()
    .post('/', (request, response, next) => {
      return entityCreate(request.headers, request.body, database)
        .then((result) => {
          return response.status(result?.status ?? 200).json(result);
        })
        .catch(next);
    })
    .put(`/:id(${constant.PATTERN.ID})`, (request, response, next) => {
      return entityUpdate(
        request.params,
        request.headers,
        request.body,
        database
      )
        .then((result) => {
          return response.status(result?.status ?? 200).json(result);
        })
        .catch(next);
    })
    .delete(`/:id(${constant.PATTERN.ID})`, (request, response, next) => {
      return entityDelete(request.params, request.headers, database)
        .then((result) => {
          return response.status(result?.status ?? 200).json(result);
        })
        .catch(next);
    })
    .get(`/:id(${constant.PATTERN.ID})`, (request, response, next) => {
      return entityGet(request.params, request.headers, database)
        .then((result) => {
          return response.status(result?.status ?? 200).json(result);
        })
        .catch(next);
    });
};
