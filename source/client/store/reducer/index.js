'use strict';

import produce from 'immer';

import { _store } from 'client/store';
import entityDeleteHandle from './fn/entityDeleteHandle';
import entityGetHandle from './fn/entityGetHandle';
import entityCollectionGetHandle from './fn/entityCollectionGetHandle';

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

        draft.user.collection = entityDeleteHandle(
          result,
          draft.user.collection
        );
      });

    case 'USER_GET':
      return produce(store, (draft) => {
        draft.user.collection = entityGetHandle(
          {
            ...result,
            post: {
              collection: {
                dictionary: {},
                info: {}
              }
            }
          },
          draft.user.collection
        );
      });

    case 'USER_POST_COLLECTION_GET':
      return produce(store, (draft) => {
        draft.user.collection.dictionary[result.info.userId].post.collection =
          entityCollectionGetHandle(
            result,
            draft.user.collection.dictionary[result.info.userId].post.collection
          );
      });

    default:
      return store;
  }
};
