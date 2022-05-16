'use strict';

import queryStringGet from 'client/store/action/fn/queryStringGet';

export default (id, query) => {
  return (_dispatch, Authorization) => {
    return window
      .fetch(`/user/${id}/post${queryStringGet(query)}`, {
        method: 'GET',
        headers: { Authorization }
      })
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        if (result._error) {
          throw result;
        }

        _dispatch({
          type: 'USER_POST_COLLECTION_GET',
          result
        });

        return result;
      });
  };
};
