'use strict';

export default (id) => {
  return (_dispatch, Authorization) => {
    return window
      .fetch(`/user/${id}`, {
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
          type: 'USER_GET',
          result
        });

        return result;
      });
  };
};
