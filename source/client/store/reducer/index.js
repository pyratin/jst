'use strict';

import produce from 'immer';

import { _store } from 'client/store';
import entityDeleteHandle from './fn/entityDeleteHandle';
import entityGetHandle from './fn/entityGetHandle';

export default (store, { type, result }) => {
  switch (type) {
    case 'USER_AUTENTICATE':
    case 'USER_CREATE':
    case 'USER_TOKEN_GET':
      return produce(store, (draft) => {
        draft.user.authorization = result;
      });

    case 'USER_DELETE':
      return produce(store, (draft) => {
        draft.user.authorization = _store.user.authorization;

        draft.user.collection = entityDeleteHandle(result, store.user.collection);
      });

    case 'USER_GET':
      return produce(store, (draft) => {
        draft.user.collection = entityGetHandle(result, store.user.collection);
      });

    default:
      return store;
  }
};

