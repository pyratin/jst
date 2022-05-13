'use strict';

import React, { createContext, useReducer, useCallback } from 'react';
import { EncryptStorage } from 'encrypt-storage';
import produce from 'immer';

import reducer from './reducer';

const Store = createContext(null);

const encryptStorage = new EncryptStorage(globalThis.ENCRYPT_STORAGE_SECRET, {
  storageType: 'sessionStorage',
  stateManagementUse: true
});

const _store = {
  user: {
    authorization: {}
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

  const dispatch = useCallback((_action) => {
    return _action(_dispatch);
  }, []);

  encryptStorage.setItem('store', JSON.stringify(store));

  return (
    <Store.Provider value={{ store, dispatch }}>{children}</Store.Provider>
  );
};

export { Store, StoreProvider };
