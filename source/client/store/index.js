'use strict';

import React, { createContext, useReducer, useCallback } from 'react';
import { EncryptStorage } from 'encrypt-storage';
import produce from 'immer';

import reducer from './reducer';
import entityTokenGetAction from './action/user/entityTokenGet';

const Store = createContext(null);

const encryptStorage = new EncryptStorage(globalThis.ENCRYPT_STORAGE_SECRET, {
  storageType: 'sessionStorage',
  stateManagementUse: true
});

const _store = {
  user: {
    authorization: {},
    collection: {
      dictionary: {},
      info: {}
    }
  }
};

const StoreProvider = ({ children }) => {
  const [store, _dispatch] = useReducer(
    reducer,
    produce(_store, (draft) => {
      let store;

      // eslint-disable-next-line no-cond-assign
      draft.user.authorization = (store = encryptStorage.getItem('store'))
        ? JSON.parse(store).user.authorization
        : _store.user.authorization;
    })
  );

  const onAuthenticationErrorHandle = useCallback(
    (_action) => {
      return entityTokenGetAction()(
        _dispatch,
        store.user.authorization.token?.refresh
      )
        .then((result) => {
          return _action(_dispatch, result.token.access);
        })
        .catch(() => {
          return window.location.assign('/User/Authenticate');
        });
    },
    [store.user.authorization.token?.refresh]
  );

  const dispatch = useCallback(
    (_action) => {
      return _action(_dispatch, store.user.authorization.token?.access).catch(
        (error) => {
          if (error.status === 401) {
            return onAuthenticationErrorHandle(_action);
          }

          throw error;
        }
      );
    },
    [store.user.authorization.token?.access, onAuthenticationErrorHandle]
  );

  encryptStorage.setItem('store', JSON.stringify(store));

  if (window['Cypress']) {
    window['store'] = store;
  }

  return (
    <Store.Provider value={{ store, dispatch }}>{children}</Store.Provider>
  );
};

export { Store, StoreProvider, _store };
