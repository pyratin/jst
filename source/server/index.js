'use strict';

import dotenv from 'dotenv';
import path from 'path';
import express from 'express';

import databaseGet from './fn/databaseGet';
import queryParse from './fn/queryParse';
import router from './router';

(async () => {
  dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

  const port = process.env.PORT;

  const database = await databaseGet(true);

  return express()
    .set('view engine', 'ejs')
    .set('views', path.join(process.cwd(), 'source/server/view'))
    .use(express.static(path.join(process.cwd(), 'public/client')))
    .use(express.json())
    .use(queryParse)
    .use('/', router(database))
    .get('*', (request, response) => {
      return response.render('index', { title: process.env.npm_package_name });
    })
    .listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`${process.env.NODE_ENV}-server: http://localhost:${port}`);
    });
})();
