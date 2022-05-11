'use strict';

import produce from 'immer';

export default (store, { type, result }) => {
  switch (type) {
    case 'USER_AUTENTICATE':
      return produce(store, (draft) => {
        draft.user.authorization = result;
      });

    default:
      return store;
  }
};

