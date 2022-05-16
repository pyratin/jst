'use strict';

import { Router } from 'express';
import constant from 'server/fn/constant';
import entityCreate from './entityCreate';
import entityAuthenticate from './entityAuthenticate';
import entityDelete from './entityDelete';
import entityGet from './entityGet';
import entityTokenGet from './entityTokenGet';
import entityPostCollectionGet from './entityPostCollectionGet';

export default (database) => {
  return Router()
    .post('/', (request, response, next) => {
      return entityCreate(request.body, database)
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
    .post('/authenticate', (request, response, next) => {
      return entityAuthenticate(request.body, database)
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
    })
    .get('/token', (request, response, next) => {
      return entityTokenGet(request.headers, database)
        .then((result) => {
          return response.status(result?.status ?? 200).json(result);
        })
        .catch(next);
    })
    .get(`/:id(${constant.PATTERN.ID})/post`, (request, response, next) => {
      return entityPostCollectionGet(
        request.params,
        request.headers,
        request.query,
        database
      )
        .then((result) => {
          return response.status(result?.status ?? 200).json(result);
        })
        .catch(next);
    });
};
