'use strict';

import React from 'react';
import { createContext, useReducer, useCallback } from 'react';

import reducer from './reducer';

const Store = createContext(null);

const _store = {
  user: {
    authorization: {}
  }
};

const StoreProvider = ({ children }) => {
  const [store, _dispatch] = useReducer(reducer, _store);

  const dispatch = useCallback((_action) => {
    return _action(_dispatch);
  }, []);

  if (/** @type {any} */ (window).Cypress) {
    /** @type {any} */ (window).store = store;
  }

  return (
    <Store.Provider value={{ store, dispatch }}>{children}</Store.Provider>
  );
};

export {
  Store,
  StoreProvider
};
